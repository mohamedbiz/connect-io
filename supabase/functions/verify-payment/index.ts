
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY") ?? "";

    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable not set");
    }

    // Create Supabase admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    // Get the session ID from the request
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("No session ID provided");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Retrieve the Checkout Session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      throw new Error("Session not found");
    }

    // Check the payment status
    const paymentStatus = session.payment_status;
    let dbStatus = "pending";
    
    if (paymentStatus === "paid") {
      dbStatus = "completed";
    } else if (paymentStatus === "unpaid") {
      dbStatus = "pending";
    } else {
      dbStatus = "failed";
    }

    // Update the payment record in the database
    const { data, error } = await supabaseAdmin
      .from("payments")
      .update({ status: dbStatus, updated_at: new Date().toISOString() })
      .eq("payment_intent_id", sessionId);

    if (error) {
      throw new Error(`Failed to update payment record: ${error.message}`);
    }

    // If paid, update analytics
    if (dbStatus === "completed") {
      const { data: paymentData, error: paymentError } = await supabaseAdmin
        .from("payments")
        .select("*")
        .eq("payment_intent_id", sessionId)
        .single();

      if (paymentError || !paymentData) {
        console.error("Error fetching payment data:", paymentError);
      } else {
        // Update analytics
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        // Check if an analytics record exists for this month
        const { data: existingAnalytics, error: analyticsError } = await supabaseAdmin
          .from("payment_analytics")
          .select("*")
          .eq("user_id", paymentData.user_id)
          .gte("period_start", startOfMonth.toISOString())
          .lte("period_end", endOfMonth.toISOString())
          .maybeSingle();

        if (analyticsError) {
          console.error("Error checking analytics:", analyticsError);
        } else if (existingAnalytics) {
          // Update existing record
          await supabaseAdmin
            .from("payment_analytics")
            .update({
              total_revenue: existingAnalytics.total_revenue + paymentData.amount,
              total_fees: existingAnalytics.total_fees + paymentData.fee_amount,
              transaction_count: existingAnalytics.transaction_count + 1,
              updated_at: new Date().toISOString()
            })
            .eq("id", existingAnalytics.id);
        } else {
          // Create new record
          await supabaseAdmin
            .from("payment_analytics")
            .insert({
              user_id: paymentData.user_id,
              period_start: startOfMonth.toISOString(),
              period_end: endOfMonth.toISOString(),
              total_revenue: paymentData.amount,
              total_fees: paymentData.fee_amount,
              transaction_count: 1
            });
        }
      }
    }

    return new Response(JSON.stringify({ 
      status: dbStatus, 
      success: dbStatus === "completed" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

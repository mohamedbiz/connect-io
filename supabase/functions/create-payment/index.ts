
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
    const url = new URL(req.url);
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY") ?? "";

    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable not set");
    }

    // Create Supabase client
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    
    // Get the JWT from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }
    
    // Extract the token from the authorization header
    const token = authHeader.replace("Bearer ", "");
    
    // Verify the user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Parse request body
    const { amount, providerId, description } = await req.json();
    
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Create or get a Stripe customer
    let customerId;
    
    // Check if customer already exists
    const { data: customers, error: customerError } = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });
    
    if (customerError) {
      throw new Error("Error retrieving Stripe customer");
    }
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Create a new customer
      const newCustomer = await stripe.customers.create({
        email: user.email,
        name: user.user_metadata?.first_name ? 
          `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}` : 
          undefined,
        metadata: {
          userId: user.id,
        },
      });
      customerId = newCustomer.id;
    }

    // Calculate the fee
    const feeAmount = Math.floor(amount * 0.1); // 10% fee
    
    // Create a payment session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${url.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url.origin}/payment-canceled`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: description || "Service payment",
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        providerId: providerId || null,
        feeAmount: feeAmount,
      },
    });

    // Create a record in the payments table
    const supabaseAdminClient = createClient(
      supabaseUrl,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    await supabaseAdminClient.from("payments").insert({
      user_id: user.id,
      amount: amount,
      fee_amount: feeAmount,
      status: "pending",
      payment_method: "stripe",
      payment_intent_id: session.id,
      metadata: {
        provider_id: providerId || null,
        description: description || "Service payment",
      },
    });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});


import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailNotificationRequest {
  applicationId: string;
  status: 'submitted' | 'in_review' | 'approved' | 'rejected';
  applicantEmail: string;
  applicantName: string;
  reviewerNotes?: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const getEmailTemplate = (status: string, name: string, reviewerNotes?: string) => {
  const templates = {
    submitted: {
      subject: "Application Received - Next Steps",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2D82B7;">Application Received!</h1>
          <p>Dear ${name},</p>
          <p>Thank you for submitting your provider application. We've received your information and our team will review it within 2-3 business days.</p>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0A2342; margin-top: 0;">What happens next?</h3>
            <ul>
              <li>Our team will review your application and portfolio</li>
              <li>We'll verify your experience and case studies</li>
              <li>You'll receive an email with our decision</li>
            </ul>
          </div>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Best regards,<br>The Klaviyo Experts Team</p>
        </div>
      `
    },
    in_review: {
      subject: "Application Under Review",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2D82B7;">Application Under Review</h1>
          <p>Dear ${name},</p>
          <p>Your provider application is currently being reviewed by our team. We're carefully evaluating your experience and qualifications.</p>
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="margin: 0;"><strong>Status:</strong> In Review</p>
            <p style="margin: 10px 0 0 0;">We'll notify you as soon as we have an update.</p>
          </div>
          <p>Thank you for your patience.</p>
          <p>Best regards,<br>The Klaviyo Experts Team</p>
        </div>
      `
    },
    approved: {
      subject: "🎉 Congratulations! Application Approved",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #28a745;">Congratulations! You're Approved!</h1>
          <p>Dear ${name},</p>
          <p>We're excited to welcome you to our network of Klaviyo experts! Your application has been approved and you can now access your provider dashboard.</p>
          <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #155724; margin-top: 0;">Next Steps:</h3>
            <ul style="color: #155724;">
              <li>Complete your provider profile setup</li>
              <li>Add your portfolio and case studies</li>
              <li>Start receiving client matches</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://lhlxhnhbfgmrwfirihxg.supabase.co/provider-dashboard" 
               style="background-color: #2D82B7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Access Your Dashboard
            </a>
          </div>
          <p>Welcome to the team!</p>
          <p>Best regards,<br>The Klaviyo Experts Team</p>
        </div>
      `
    },
    rejected: {
      subject: "Application Update - Feedback Included",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc3545;">Application Update</h1>
          <p>Dear ${name},</p>
          <p>Thank you for your interest in joining our network of Klaviyo experts. After careful review, we've decided not to move forward with your application at this time.</p>
          ${reviewerNotes ? `
            <div style="background-color: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545;">
              <h3 style="color: #721c24; margin-top: 0;">Feedback:</h3>
              <p style="color: #721c24; margin: 0;">${reviewerNotes}</p>
            </div>
          ` : ''}
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0A2342; margin-top: 0;">We encourage you to:</h3>
            <ul>
              <li>Gain more experience with Klaviyo campaigns</li>
              <li>Build stronger case studies with measurable results</li>
              <li>Reapply in the future when you meet our criteria</li>
            </ul>
          </div>
          <p>We appreciate your interest and wish you success in your email marketing journey.</p>
          <p>Best regards,<br>The Klaviyo Experts Team</p>
        </div>
      `
    }
  };

  return templates[status as keyof typeof templates] || templates.submitted;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicationId, status, applicantEmail, applicantName, reviewerNotes }: EmailNotificationRequest = await req.json();

    console.log(`Sending notification for application ${applicationId} with status ${status} to ${applicantEmail}`);

    const template = getEmailTemplate(status, applicantName, reviewerNotes);

    const emailResponse = await resend.emails.send({
      from: "Klaviyo Experts <notifications@resend.dev>",
      to: [applicantEmail],
      subject: template.subject,
      html: template.html,
    });

    console.log("Email sent successfully:", emailResponse);

    // Update the application to mark notification as sent
    const { error: updateError } = await supabase
      .from('provider_applications')
      .update({ 
        notification_sent: true,
        notification_sent_at: new Date().toISOString()
      })
      .eq('id', applicationId);

    if (updateError) {
      console.error("Error updating notification status:", updateError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-application-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

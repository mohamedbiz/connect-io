
import { supabase } from "@/integrations/supabase/client";

/**
 * Create a test provider application for testing the onboarding flow
 * This is a utility function for development/testing purposes
 */
export const createTestProviderApplication = async (userId: string) => {
  try {
    console.log('Creating test provider application for user:', userId);
    
    // First, create or update the provider application
    const { data: application, error: appError } = await supabase
      .from('provider_applications')
      .upsert({
        user_id: userId,
        application_data: {
          years_experience: '5+',
          primary_esp: 'Klaviyo',
          industries_served: ['E-commerce', 'SaaS'],
          approach_description: 'Test provider with extensive experience',
          portfolio_url: 'https://example.com',
          case_studies: [
            {
              title: 'E-commerce Growth',
              description: 'Increased email revenue by 150%'
            }
          ]
        },
        status: 'approved',
        submitted_at: new Date().toISOString(),
        reviewed_at: new Date().toISOString(),
        accepted: true,
        automated_score: 95,
        auto_approved: true,
        approval_tier: 'premium'
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single();

    if (appError) {
      console.error('Error creating test application:', appError);
      throw appError;
    }

    console.log('Test application created:', application);

    // Update the profile to reflect the approved application
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        account_status: 'pending_application',
        approved: true
      })
      .eq('id', userId);

    if (profileError) {
      console.error('Error updating profile for test:', profileError);
      throw profileError;
    }

    console.log('Test provider application setup complete');
    return application;
  } catch (error) {
    console.error('Error in createTestProviderApplication:', error);
    throw error;
  }
};

/**
 * Reset a user's provider application status for testing
 */
export const resetProviderApplicationStatus = async (userId: string) => {
  try {
    // Delete existing application
    await supabase
      .from('provider_applications')
      .delete()
      .eq('user_id', userId);

    // Reset profile status
    await supabase
      .from('profiles')
      .update({
        account_status: 'pending_profile',
        approved: false,
        onboarding_complete: false
      })
      .eq('id', userId);

    console.log('Provider application status reset for user:', userId);
  } catch (error) {
    console.error('Error resetting provider application status:', error);
    throw error;
  }
};

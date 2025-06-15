
import { supabase } from "@/integrations/supabase/client";

/**
 * Complete onboarding for a user and update their account status
 * @param userId The user's ID
 * @param role The user's role ('founder' or 'provider')
 * @returns Promise<void>
 */
export const completeOnboarding = async (userId: string, role: 'founder' | 'provider'): Promise<void> => {
  try {
    console.log('completeOnboarding: Starting for user', { userId, role });
    
    if (role === 'provider') {
      // For providers, update to active status
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          account_status: 'active',
          onboarding_complete: true
        })
        .eq('id', userId);

      if (profileError) {
        console.error('completeOnboarding: Error updating profile:', profileError);
        throw profileError;
      }

      console.log('completeOnboarding: Provider profile updated to active');
    } else {
      // For founders, just update to active status
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          account_status: 'active',
          onboarding_complete: true
        })
        .eq('id', userId);

      if (profileError) {
        console.error('completeOnboarding: Error updating profile:', profileError);
        throw profileError;
      }

      console.log('completeOnboarding: Founder profile updated to active');
    }
  } catch (error) {
    console.error('completeOnboarding: Unexpected error:', error);
    throw error;
  }
};

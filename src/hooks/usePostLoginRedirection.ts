
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from '@/types/auth';
import { User } from '@supabase/supabase-js';

export const usePostLoginRedirection = () => {
  const navigate = useNavigate();

  const redirectAfterLogin = useCallback((user: User | null, profile: Profile | null) => {
    if (!user || !profile) {
      console.log('No user or profile found, staying on auth page');
      return;
    }

    console.log(`Redirecting user with role: ${profile.role}, onboarding: ${profile.onboarding_complete}, approved: ${profile.approved}`);

    switch (profile.role) {
      case 'founder':
        // Check if founder has completed onboarding
        if (!profile.onboarding_complete) {
          console.log('Founder needs to complete onboarding, redirecting to application');
          navigate('/founder-application', { replace: true });
        } else {
          console.log('Founder completed onboarding, redirecting to dashboard');
          navigate('/founder-dashboard', { replace: true });
        }
        break;

      case 'provider':
        // Check if provider is approved
        if (!profile.approved) {
          console.log('Provider not approved, redirecting to application');
          navigate('/provider-application', { replace: true });
        } else {
          console.log('Provider approved, redirecting to dashboard');
          navigate('/provider-dashboard', { replace: true });
        }
        break;

      case 'admin':
        console.log('Admin user, redirecting to admin panel');
        navigate('/admin/provider-applications', { replace: true });
        break;

      default:
        console.log('Unknown role, redirecting to home');
        navigate('/', { replace: true });
        break;
    }
  }, [navigate]);

  return { redirectAfterLogin };
};


import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from '@/types/auth';
import { User } from '@supabase/supabase-js';

export const usePostLoginRedirection = () => {
  const navigate = useNavigate();

  const redirectAfterLogin = useCallback((user: User | null, profile: Profile | null, fallbackUserType?: 'founder' | 'provider') => {
    if (!user) {
      console.log('No user found, staying on auth page');
      return;
    }

    console.log('=== REDIRECTION DEBUG ===');
    console.log('User metadata:', user.user_metadata);
    console.log('Profile:', profile);
    console.log('Fallback userType:', fallbackUserType);

    // First priority: Use fallbackUserType (from registration flow)
    if (fallbackUserType) {
      console.log(`Using fallback userType: ${fallbackUserType}`);
      if (fallbackUserType === 'provider') {
        console.log('Redirecting to provider application via fallback');
        navigate('/provider-application', { replace: true });
        return;
      } else if (fallbackUserType === 'founder') {
        console.log('Redirecting to founder application via fallback');
        navigate('/founder-application', { replace: true });
        return;
      }
    }

    // Second priority: Use user metadata role
    const userMetadataRole = user.user_metadata?.role;
    if (userMetadataRole && !profile) {
      console.log(`Using user metadata role: ${userMetadataRole}`);
      if (userMetadataRole === 'provider') {
        console.log('Redirecting to provider application via user metadata');
        navigate('/provider-application', { replace: true });
        return;
      } else if (userMetadataRole === 'founder') {
        console.log('Redirecting to founder application via user metadata');
        navigate('/founder-application', { replace: true });
        return;
      }
    }

    // Third priority: Use profile data
    if (profile) {
      console.log(`Using profile role: ${profile.role}, onboarding: ${profile.onboarding_complete}, approved: ${profile.approved}`);

      switch (profile.role) {
        case 'founder':
          if (!profile.onboarding_complete) {
            console.log('Founder needs to complete onboarding, redirecting to application');
            navigate('/founder-application', { replace: true });
          } else {
            console.log('Founder completed onboarding, redirecting to dashboard');
            navigate('/founder-dashboard', { replace: true });
          }
          break;

        case 'provider':
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
    } else {
      // Handle case where there's no profile yet - check user metadata for role
      const role = user.user_metadata?.role;
      if (role === 'provider') {
        console.log('No profile found but user metadata indicates provider, redirecting to application');
        navigate('/provider-application', { replace: true });
      } else if (role === 'founder') {
        console.log('No profile found but user metadata indicates founder, redirecting to application');
        navigate('/founder-application', { replace: true });
      } else {
        console.log('No profile or role information available, redirecting to home');
        navigate('/', { replace: true });
      }
    }
  }, [navigate]);

  return { redirectAfterLogin };
};

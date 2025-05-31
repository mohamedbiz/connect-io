
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from '@/types/auth';
import { User } from '@supabase/supabase-js';

export const usePostLoginRedirection = () => {
  const navigate = useNavigate();

  const redirectAfterLogin = useCallback((user: User | null, profile: Profile | null, fallbackUserType?: 'founder' | 'provider') => {
    if (!user) {
      console.log('No user found, staying on current page');
      return;
    }

    console.log('=== REDIRECTION DEBUG ===');
    console.log('Current path:', window.location.pathname);
    console.log('User metadata:', user.user_metadata);
    console.log('Profile:', profile);
    console.log('Fallback userType:', fallbackUserType);

    // Don't redirect if already on the correct page
    const currentPath = window.location.pathname;
    
    // First priority: Use fallbackUserType (from registration flow)
    if (fallbackUserType) {
      console.log(`Using fallback userType: ${fallbackUserType}`);
      if (fallbackUserType === 'provider') {
        if (currentPath !== '/provider-application') {
          console.log('Redirecting to provider application via fallback');
          navigate('/provider-application', { replace: true });
        }
        return;
      } else if (fallbackUserType === 'founder') {
        if (currentPath !== '/founder-application') {
          console.log('Redirecting to founder application via fallback');
          navigate('/founder-application', { replace: true });
        }
        return;
      }
    }

    // Second priority: Use user metadata role (for users without profiles yet)
    const userMetadataRole = user.user_metadata?.role;
    if (userMetadataRole && !profile) {
      console.log(`Using user metadata role: ${userMetadataRole}`);
      if (userMetadataRole === 'provider') {
        if (currentPath !== '/provider-application') {
          console.log('Redirecting to provider application via user metadata');
          navigate('/provider-application', { replace: true });
        }
        return;
      } else if (userMetadataRole === 'founder') {
        if (currentPath !== '/founder-application') {
          console.log('Redirecting to founder application via user metadata');
          navigate('/founder-application', { replace: true });
        }
        return;
      }
    }

    // Third priority: Use profile data if it exists
    if (profile) {
      console.log(`Using profile role: ${profile.role}, onboarding: ${profile.onboarding_complete}, approved: ${profile.approved}`);

      switch (profile.role) {
        case 'founder':
          if (!profile.onboarding_complete) {
            if (currentPath !== '/founder-application') {
              console.log('Founder needs to complete onboarding, redirecting to application');
              navigate('/founder-application', { replace: true });
            }
          } else {
            if (currentPath !== '/founder-dashboard') {
              console.log('Founder completed onboarding, redirecting to dashboard');
              navigate('/founder-dashboard', { replace: true });
            }
          }
          break;

        case 'provider':
          if (!profile.approved) {
            if (currentPath !== '/provider-application') {
              console.log('Provider not approved, redirecting to application');
              navigate('/provider-application', { replace: true });
            }
          } else {
            if (currentPath !== '/provider-dashboard') {
              console.log('Provider approved, redirecting to dashboard');
              navigate('/provider-dashboard', { replace: true });
            }
          }
          break;

        case 'admin':
          if (currentPath !== '/admin/provider-applications') {
            console.log('Admin user, redirecting to admin panel');
            navigate('/admin/provider-applications', { replace: true });
          }
          break;

        default:
          if (currentPath !== '/') {
            console.log('Unknown role, redirecting to home');
            navigate('/', { replace: true });
          }
          break;
      }
    } else {
      // Handle case where there's no profile yet - check user metadata for role
      const role = user.user_metadata?.role;
      if (role === 'provider') {
        if (currentPath !== '/provider-application') {
          console.log('No profile found but user metadata indicates provider, redirecting to application');
          navigate('/provider-application', { replace: true });
        }
      } else if (role === 'founder') {
        if (currentPath !== '/founder-application') {
          console.log('No profile found but user metadata indicates founder, redirecting to application');
          navigate('/founder-application', { replace: true });
        }
      } else {
        if (currentPath !== '/') {
          console.log('No profile or role information available, redirecting to home');
          navigate('/', { replace: true });
        }
      }
    }
  }, [navigate]);

  return { redirectAfterLogin };
};

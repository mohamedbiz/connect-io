
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from '@/types/auth';
import { User } from '@supabase/supabase-js';

export const useAuthRedirection = () => {
  const navigate = useNavigate();

  const redirectUser = useCallback((user: User | null, profile: Profile | null) => {
    if (!user) return;

    const currentPath = window.location.pathname;
    
    // Don't redirect if already on auth page
    if (currentPath === '/auth') {
      console.log('User authenticated, redirecting from auth page');
    }

    // Simple role-based redirection
    if (profile) {
      switch (profile.role) {
        case 'founder':
          if (!profile.onboarding_complete) {
            navigate('/founder-application', { replace: true });
          } else {
            navigate('/founder-dashboard', { replace: true });
          }
          break;
        case 'provider':
          if (!profile.approved) {
            navigate('/provider-application', { replace: true });
          } else {
            navigate('/provider-dashboard', { replace: true });
          }
          break;
        case 'admin':
          navigate('/admin/provider-applications', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
      }
    } else {
      // No profile - use user metadata or default to home
      const role = user.user_metadata?.role;
      if (role === 'founder') {
        navigate('/founder-application', { replace: true });
      } else if (role === 'provider') {
        navigate('/provider-application', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [navigate]);

  return { redirectUser };
};

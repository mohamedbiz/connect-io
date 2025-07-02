
import { useAuthWithRole } from '@/hooks/useAuthWithRole';
import { useNavigate } from 'react-router-dom';

export const useProviderNavigation = () => {
  const { user, role, status, isOnboardingComplete } = useAuthWithRole();
  const navigate = useNavigate();

  const navigateToProviderFlow = () => {
    console.log('useProviderNavigation: Starting provider flow navigation', {
      status,
      userRole: role,
      isOnboardingComplete,
      user: user ? 'authenticated' : 'not authenticated'
    });

    // If loading, wait for auth state to resolve
    if (status === 'loading') {
      console.log('useProviderNavigation: Auth state loading, waiting...');
      return;
    }

    // If not authenticated, go to quick registration
    if (status === 'unauthenticated' || !user) {
      console.log('useProviderNavigation: User not authenticated, redirecting to quick registration');
      navigate('/quick-register/provider');
      return;
    }

    // If not a provider, go to quick registration
    if (role !== 'provider') {
      console.log('useProviderNavigation: User is not a provider, redirecting to quick registration');
      navigate('/quick-register/provider');
      return;
    }

    // Simple MVP routing for providers
    if (!isOnboardingComplete) {
      console.log('useProviderNavigation: Provider needs to complete application');
      navigate('/provider/application-questions');
    } else {
      console.log('useProviderNavigation: Provider fully onboarded, redirecting to dashboard');
      navigate('/provider/dashboard');
    }
  };

  return { navigateToProviderFlow };
};


import { useAuthWithRole } from '@/hooks/useAuthWithRole';
import { useNavigate } from 'react-router-dom';

export const useProviderNavigation = () => {
  const { user, role, status, applicationStatus, isOnboardingComplete } = useAuthWithRole();
  const navigate = useNavigate();

  const navigateToProviderFlow = () => {
    console.log('useProviderNavigation: Starting provider flow navigation', {
      status,
      userRole: role,
      applicationStatus,
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

    // Route based on application status using dynamic routes
    console.log('useProviderNavigation: Routing based on application status:', applicationStatus);
    
    if (!applicationStatus) {
      console.log('useProviderNavigation: Provider needs to complete application');
      navigate('/provider/application-questions');
    } else if (applicationStatus === 'submitted' || applicationStatus === 'in_review') {
      console.log('useProviderNavigation: Application submitted, showing status page');
      navigate('/provider/application/submitted');
    } else if (applicationStatus === 'approved') {
      if (!isOnboardingComplete) {
        console.log('useProviderNavigation: Application approved, but profile not complete');
        navigate('/provider/application-questions');
      } else {
        console.log('useProviderNavigation: Provider fully onboarded, redirecting to dashboard');
        navigate('/provider/dashboard');
      }
    } else if (applicationStatus === 'rejected') {
      console.log('useProviderNavigation: Provider rejected, showing rejection page');
      navigate('/provider/application/rejected');
    } else {
      console.log('useProviderNavigation: Unknown status, redirecting to application');
      navigate('/provider/application-questions');
    }
  };

  return { navigateToProviderFlow };
};

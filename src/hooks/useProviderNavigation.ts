
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

    // If not authenticated, go to sign-in
    if (status === 'unauthenticated' || !user) {
      console.log('useProviderNavigation: User not authenticated, redirecting to sign-in');
      navigate('/provider/signin');
      return;
    }

    // If not a provider, go to sign-in
    if (role !== 'provider') {
      console.log('useProviderNavigation: User is not a provider, redirecting to sign-in');
      navigate('/provider/signin');
      return;
    }

    // Route based on application status
    console.log('useProviderNavigation: Routing based on application status:', applicationStatus);
    
    if (!applicationStatus) {
      // Provider needs to complete their application
      console.log('useProviderNavigation: Provider needs to complete application');
      navigate('/provider-application');
    } else if (applicationStatus === 'submitted' || applicationStatus === 'in_review') {
      // Application submitted, show status page
      console.log('useProviderNavigation: Application submitted, showing status page');
      navigate('/provider-application-submitted');
    } else if (applicationStatus === 'approved') {
      if (!isOnboardingComplete) {
        // Application approved but onboarding not complete
        console.log('useProviderNavigation: Application approved, redirecting to onboarding');
        navigate('/provider/onboarding');
      } else {
        // Provider is fully onboarded
        console.log('useProviderNavigation: Provider fully onboarded, redirecting to dashboard');
        navigate('/provider/dashboard');
      }
    } else if (applicationStatus === 'rejected') {
      // Provider was rejected, show rejection page
      console.log('useProviderNavigation: Provider rejected, showing rejection page');
      navigate('/provider-application-rejected');
    } else {
      // Fallback to application for unknown statuses
      console.log('useProviderNavigation: Unknown status, redirecting to application');
      navigate('/provider-application');
    }
  };

  return { navigateToProviderFlow };
};

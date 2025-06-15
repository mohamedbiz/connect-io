
import { useAuth } from '@/contexts/AuthContext';
import { useApplicationStatus } from '@/hooks/useApplicationStatus';
import { useNavigate } from 'react-router-dom';

export const useProviderNavigation = () => {
  const { isAuthenticated, profile } = useAuth();
  const { applicationStatus } = useApplicationStatus();
  const navigate = useNavigate();

  const navigateToProviderFlow = () => {
    console.log('useProviderNavigation: Starting provider flow navigation', {
      isAuthenticated,
      userRole: profile?.role,
      accountStatus: profile?.account_status,
      hasApplication: applicationStatus.hasApplication,
      applicationStatus: applicationStatus.status,
      isLoading: applicationStatus.isLoading
    });

    // If not authenticated, go to sign-in
    if (!isAuthenticated || !profile) {
      console.log('useProviderNavigation: User not authenticated, redirecting to sign-in');
      navigate('/provider/signin');
      return;
    }

    // If not a provider, go to sign-in
    if (profile.role !== 'provider') {
      console.log('useProviderNavigation: User is not a provider, redirecting to sign-in');
      navigate('/provider/signin');
      return;
    }

    // Wait for application status to load
    if (applicationStatus.isLoading) {
      console.log('useProviderNavigation: Application status still loading, waiting...');
      return;
    }

    // If provider is authenticated, route based on application status
    if (!applicationStatus.hasApplication) {
      // No application submitted yet
      console.log('useProviderNavigation: No application found, redirecting to application page');
      navigate('/provider-application');
      return;
    }

    // Route based on application status
    console.log('useProviderNavigation: Routing based on application status:', applicationStatus.status);
    switch (applicationStatus.status) {
      case 'submitted':
      case 'in_review':
        console.log('useProviderNavigation: Application in review, redirecting to submitted page');
        navigate('/provider-application-submitted');
        break;
      case 'approved':
        if (profile.account_status === 'pending_application') {
          console.log('useProviderNavigation: Application approved, redirecting to onboarding');
          navigate('/provider/onboarding');
        } else {
          console.log('useProviderNavigation: Provider active, redirecting to dashboard');
          navigate('/provider/dashboard');
        }
        break;
      case 'rejected':
        console.log('useProviderNavigation: Application rejected, redirecting to rejected page');
        navigate('/provider-application-rejected');
        break;
      default:
        console.log('useProviderNavigation: Unknown status, redirecting to application page');
        navigate('/provider-application');
    }
  };

  return { navigateToProviderFlow };
};

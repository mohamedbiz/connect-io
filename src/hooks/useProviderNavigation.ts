
import { useAuth } from '@/contexts/AuthContext';
import { useApplicationStatus } from '@/hooks/useApplicationStatus';
import { useNavigate } from 'react-router-dom';

export const useProviderNavigation = () => {
  const { isAuthenticated, profile } = useAuth();
  const { applicationStatus } = useApplicationStatus();
  const navigate = useNavigate();

  const navigateToProviderFlow = () => {
    // If not authenticated, go to sign-in
    if (!isAuthenticated || !profile) {
      navigate('/provider/signin');
      return;
    }

    // If not a provider, go to sign-in
    if (profile.role !== 'provider') {
      navigate('/provider/signin');
      return;
    }

    // If provider is authenticated, route based on application status
    if (!applicationStatus.hasApplication) {
      // No application submitted yet
      navigate('/provider-application');
      return;
    }

    // Route based on application status
    switch (applicationStatus.status) {
      case 'submitted':
      case 'in_review':
        navigate('/provider-application-submitted');
        break;
      case 'approved':
        if (profile.account_status === 'pending_application') {
          navigate('/provider/onboarding');
        } else {
          navigate('/provider/dashboard');
        }
        break;
      case 'rejected':
        navigate('/provider-application-rejected');
        break;
      default:
        navigate('/provider-application');
    }
  };

  return { navigateToProviderFlow };
};

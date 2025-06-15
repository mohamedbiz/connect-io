
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

    // Route based on account status
    console.log('useProviderNavigation: Routing based on account status:', profile.account_status);
    
    switch (profile.account_status) {
      case 'pending_profile':
        // Provider needs to complete their application
        console.log('useProviderNavigation: Provider needs to complete application');
        navigate('/provider/onboarding');
        break;
        
      case 'pending_application':
        // Application submitted, show dashboard with status
        console.log('useProviderNavigation: Application submitted, showing dashboard');
        navigate('/provider/dashboard');
        break;
        
      case 'active':
        // Provider is approved and active
        console.log('useProviderNavigation: Provider active, redirecting to dashboard');
        navigate('/provider/dashboard');
        break;
        
      case 'rejected':
        // Provider was rejected, show dashboard with reapplication option
        console.log('useProviderNavigation: Provider rejected, showing dashboard with reapplication');
        navigate('/provider/dashboard');
        break;
        
      default:
        // Fallback to onboarding for unknown statuses
        console.log('useProviderNavigation: Unknown status, redirecting to onboarding');
        navigate('/provider/onboarding');
    }
  };

  return { navigateToProviderFlow };
};


import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProviderApplications } from '@/hooks/useProviderApplications';
import { useNavigate } from 'react-router-dom';

export interface ApplicationStatus {
  hasApplication: boolean;
  status?: string;
  isLoading: boolean;
}

export const useApplicationStatus = () => {
  const { user, profile } = useAuth();
  const { myApplication, isLoadingMyApplication } = useProviderApplications();
  const navigate = useNavigate();
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus>({
    hasApplication: false,
    isLoading: true
  });

  useEffect(() => {
    if (!isLoadingMyApplication) {
      setApplicationStatus({
        hasApplication: !!myApplication,
        status: myApplication?.status,
        isLoading: false
      });
    }
  }, [myApplication, isLoadingMyApplication]);

  const navigateBasedOnStatus = () => {
    if (!user || !profile || profile.role !== 'provider') return;
    
    if (!myApplication) {
      // No application submitted yet
      navigate('/provider-application');
      return;
    }

    switch (myApplication.status) {
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

  return {
    applicationStatus,
    navigateBasedOnStatus
  };
};

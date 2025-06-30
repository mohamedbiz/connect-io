
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuthWithRole } from '@/hooks/useAuthWithRole';
import ApplicationSubmittedPage from './ApplicationSubmittedPage';
import ApplicationApprovedPage from './ApplicationApprovedPage';
import ApplicationRejectedPage from './ApplicationRejectedPage';
import ProviderApplicationPage from './ProviderApplicationPage';

const ProviderApplicationStatusPage = () => {
  const { status } = useParams<{ status?: string }>();
  const { applicationStatus } = useAuthWithRole();

  // Determine which page to render based on URL parameter or auth state
  const currentStatus = status || applicationStatus || 'new';

  switch (currentStatus) {
    case 'submitted':
    case 'in_review':
      return <ApplicationSubmittedPage />;
    case 'approved':
      return <ApplicationApprovedPage />;
    case 'rejected':
      return <ApplicationRejectedPage />;
    default:
      return <ProviderApplicationPage />;
  }
};

export default ProviderApplicationStatusPage;

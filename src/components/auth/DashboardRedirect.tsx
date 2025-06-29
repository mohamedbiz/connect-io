
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthWithRole } from '@/hooks/useAuthWithRole';
import { Loader2 } from 'lucide-react';

const DashboardRedirect: React.FC = () => {
  const { role, status, isOnboardingComplete, applicationStatus } = useAuthWithRole();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      navigate('/get-started');
      return;
    }

    if (!role) {
      navigate('/get-started');
      return;
    }

    // Provider-specific routing
    if (role === 'provider') {
      if (!applicationStatus) {
        navigate('/provider-application');
        return;
      }
      
      if (applicationStatus === 'submitted' || applicationStatus === 'in_review') {
        navigate('/provider-application-submitted');
        return;
      }
      
      if (applicationStatus === 'rejected') {
        navigate('/provider-application-rejected');
        return;
      }
      
      if (applicationStatus === 'approved') {
        if (!isOnboardingComplete) {
          navigate('/provider/onboarding');
          return;
        }
        navigate('/provider/dashboard');
        return;
      }
    }

    // Founder routing
    if (role === 'founder') {
      if (!isOnboardingComplete) {
        navigate('/founder/onboarding');
        return;
      }
      navigate('/founder/dashboard');
      return;
    }

    // Admin routing
    if (role === 'admin') {
      navigate('/admin/dashboard');
      return;
    }

    // Fallback
    navigate('/');
  }, [role, status, isOnboardingComplete, applicationStatus, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardRedirect;

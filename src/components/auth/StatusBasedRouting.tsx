
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const StatusBasedRouting = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading || !user || !profile) return;

    const currentPath = location.pathname;
    
    // Skip redirection for certain paths
    if (currentPath.includes('/login') || 
        currentPath.includes('/signup') || 
        currentPath === '/' ||
        currentPath.includes('/admin')) {
      return;
    }

    // Handle founder routing
    if (profile.role === 'founder') {
      if (profile.account_status === 'pending_profile') {
        if (!currentPath.includes('/founder/onboarding')) {
          navigate('/founder/onboarding');
        }
      } else if (profile.account_status === 'active') {
        if (currentPath.includes('/founder/onboarding')) {
          navigate('/founder/dashboard');
        }
      }
    }

    // Handle provider routing
    if (profile.role === 'provider') {
      if (profile.account_status === 'pending_application') {
        if (!currentPath.includes('/provider/onboarding') && 
            !currentPath.includes('/provider/dashboard')) {
          navigate('/provider/onboarding');
        }
      } else if (profile.account_status === 'active') {
        if (currentPath.includes('/provider/onboarding')) {
          navigate('/provider/dashboard');
        }
      }
    }
  }, [user, profile, loading, navigate, location.pathname]);

  return null;
};

export default StatusBasedRouting;

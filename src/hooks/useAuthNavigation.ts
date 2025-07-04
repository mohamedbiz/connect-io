import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthWithRole } from './useAuthWithRole';

export const useAuthNavigation = () => {
  const { user, role, status, isOnboardingComplete } = useAuthWithRole();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only navigate if auth state is fully loaded and we're not already loading
    if (status === 'loading') return;

    console.log('useAuthNavigation: Auth state changed', {
      hasUser: !!user,
      role,
      isOnboardingComplete,
      currentPath: location.pathname
    });

    // Don't redirect if user is on public pages
    const publicPaths = ['/', '/for-founders', '/for-providers', '/quick-register'];
    const isOnPublicPath = publicPaths.some(path => 
      location.pathname === path || location.pathname.startsWith('/quick-register')
    );

    // If user is authenticated and not on a public path, handle navigation
    if (user && !isOnPublicPath) {
      console.log('useAuthNavigation: User authenticated, checking navigation needs');
      
      if (role === 'provider') {
        if (!isOnboardingComplete && !location.pathname.includes('/provider/application-questions')) {
          console.log('useAuthNavigation: Provider needs onboarding, redirecting');
          navigate('/provider/application-questions', { replace: true });
          return;
        }
        
        if (isOnboardingComplete && !location.pathname.includes('/provider/dashboard')) {
          console.log('useAuthNavigation: Provider onboarding complete, redirecting to dashboard');
          navigate('/provider/dashboard', { replace: true });
          return;
        }
      }
      
      if (role === 'founder') {
        if (!isOnboardingComplete && !location.pathname.includes('/founder/profile-completion')) {
          console.log('useAuthNavigation: Founder needs onboarding, redirecting');
          navigate('/founder/profile-completion', { replace: true });
          return;
        }
        
        if (isOnboardingComplete && !location.pathname.includes('/founder/dashboard')) {
          console.log('useAuthNavigation: Founder onboarding complete, redirecting to dashboard');
          navigate('/founder/dashboard', { replace: true });
          return;
        }
      }
      
      if (role === 'admin' && !location.pathname.includes('/admin/dashboard')) {
        console.log('useAuthNavigation: Admin redirecting to dashboard');
        navigate('/admin/dashboard', { replace: true });
        return;
      }
    }
  }, [user, role, status, isOnboardingComplete, navigate, location.pathname]);

  return { user, role, status, isOnboardingComplete };
};
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
      
      // Simplified navigation logic
      if (!isOnboardingComplete) {
        const onboardingPath = `/${role}/profile-completion`;
        if (role === 'provider') {
          const providerOnboardingPath = '/provider/application-questions';
          if (!location.pathname.includes(providerOnboardingPath)) {
            console.log('useAuthNavigation: Provider needs onboarding, redirecting');
            navigate(providerOnboardingPath, { replace: true });
            return;
          }
        } else if (!location.pathname.includes(onboardingPath)) {
          console.log('useAuthNavigation: User needs onboarding, redirecting');
          navigate(onboardingPath, { replace: true });
          return;
        }
      } else {
        // User has completed onboarding, redirect to dashboard
        const dashboardPath = `/${role}/dashboard`;
        if (!location.pathname.includes(dashboardPath)) {
          console.log('useAuthNavigation: Onboarding complete, redirecting to dashboard');
          navigate(dashboardPath, { replace: true });
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
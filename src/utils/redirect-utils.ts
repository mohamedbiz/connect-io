
import { User } from "@supabase/supabase-js";
import { Profile } from "@/types/auth";

/**
 * Determines if a founder should be redirected to the acquisition page
 */
export const shouldRedirectToAcquisition = (
  currentPath: string,
  loading: boolean,
  user: User | null,
  profile: Profile | null
): boolean => {
  // If user is not authenticated or data is loading, no redirect
  if (loading || !user) {
    return false;
  }
  
  // If user is not a founder, no redirect
  if (!profile || profile.role !== 'founder') {
    return false;
  }
  
  // If already on the founder application page, no redirect
  if (currentPath.includes('/founder-application')) {
    return false;
  }
  
  // If the founder hasn't completed onboarding, redirect to acquisition
  return !profile.onboarding_complete;
};

/**
 * Determines if a route is protected and should enforce qualification checks
 */
export const isProtectedRoute = (path: string): boolean => {
  // Define routes that should check for founder qualification
  const founderRoutes = [
    '/founder-dashboard',
    '/payments',
    '/projects'
  ];
  
  return founderRoutes.some(route => path.includes(route));
};

/**
 * Determines if a founder should be redirected to the qualification page
 */
export const shouldRedirectToQualification = (
  currentPath: string,
  loading: boolean,
  user: User | null,
  profile: Profile | null,
  isQualified?: boolean
): boolean => {
  // If user is not authenticated or data is loading, no redirect
  if (loading || !user) {
    return false;
  }
  
  // If user is not a founder, no redirect
  if (!profile || profile.role !== 'founder') {
    return false;
  }
  
  // Don't redirect if already on the qualification page
  if (currentPath.includes('/founder-qualification')) {
    return false;
  }
  
  // Only redirect if we're on a protected founder route and user is not qualified
  if (isProtectedRoute(currentPath) && isQualified === false) {
    return true;
  }
  
  return false;
};


import { Profile, AcquisitionStatus } from "@/types/auth";

/**
 * Determines if a user should be redirected to the acquisition page
 */
export function shouldRedirectToAcquisition(
  currentPath: string, 
  loading: boolean, 
  user: any, 
  profile: Profile | null, 
  acquisitionStatus: AcquisitionStatus
): boolean {
  console.log("Checking redirect:", {
    currentPath,
    loading,
    hasUser: !!user,
    profile: profile?.role,
    acquisitionStatus
  });
  
  // Don't redirect if:
  // - We're loading
  // - We're not logged in
  // - User is not a founder (providers should never be redirected to acquisition)
  // - We're already on client acquisition related paths or auth paths
  // - We haven't checked the status yet
  
  if (
    loading || 
    !user || 
    !profile || 
    profile.role !== 'founder' ||  // Explicitly check that user is a founder
    currentPath.includes('/client-acquisition') || 
    currentPath === '/auth' || 
    currentPath === '/login' || 
    currentPath === '/register' || 
    currentPath === '/provider-apply' ||  // Added provider application path to prevent redirects
    currentPath === '/provider-dashboard' ||  // Never redirect from provider dashboard
    !acquisitionStatus.checked
  ) {
    return false;
  }
  
  // If we're headed to dashboard and haven't completed acquisition, redirect
  return !acquisitionStatus.completed && currentPath === '/founder-dashboard';
}

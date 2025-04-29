
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
  // Don't redirect if:
  // - We're loading
  // - We're not logged in
  // - User is not a founder
  // - We're already on client acquisition related paths
  // - We haven't checked the status yet
  
  if (
    loading || 
    !user || 
    !profile || 
    profile.role !== 'founder' ||
    currentPath.includes('/client-acquisition') || 
    currentPath === '/auth' || 
    !acquisitionStatus.checked
  ) {
    return false;
  }
  
  // If we're headed to dashboard and haven't completed acquisition, redirect
  return !acquisitionStatus.completed && currentPath === '/founder-dashboard';
}

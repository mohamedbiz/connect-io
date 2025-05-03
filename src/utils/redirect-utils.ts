
import { Profile } from "@/types/auth";

/**
 * Determines if a user should be redirected based on role and authentication
 */
export function shouldRedirectToAcquisition(
  currentPath: string, 
  loading: boolean, 
  user: any, 
  profile: Profile | null
): boolean {
  // Don't redirect while loading
  if (loading) {
    console.log("Not redirecting: still loading");
    return false;
  }

  // Not logged in - don't redirect
  if (!user) {
    console.log("Not redirecting: no user");
    return false;
  }

  // Profile doesn't exist - don't redirect
  if (!profile) {
    console.log("Not redirecting: no profile");
    return false;
  }

  // For debugging
  console.log("Redirect check:", { currentPath, userRole: profile.role });

  // Check if user is a founder and on a dashboard route but hasn't completed qualification
  if (
    profile.role === 'founder' && 
    (currentPath === '/founder-dashboard' || currentPath.startsWith('/founder-dashboard/')) &&
    !currentPath.includes('qualification') && 
    !currentPath.includes('onboarding')
  ) {
    // Here we would check if qualification is needed
    // For now, return false as we've already implemented the qualification route separately
    return false;
  }

  // Always return false for other cases
  return false;
}

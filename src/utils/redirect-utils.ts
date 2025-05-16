
import { Profile } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { logAuth } from "@/utils/auth/auth-logger";

/**
 * Determines if a user should be redirected based on qualification status
 */
export async function checkQualificationStatus(userId: string): Promise<boolean> {
  if (!userId) return false;

  try {
    const { data, error } = await supabase
      .from('founder_onboarding')
      .select('qualification_completed')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data?.qualification_completed || false;
  } catch (error) {
    console.error("Error checking qualification status:", error);
    return false;
  }
}

/**
 * Checks if the founder_onboarding record exists, creates it if not
 */
export async function ensureFounderOnboardingExists(userId: string): Promise<boolean> {
  if (!userId) return false;
  
  try {
    // Check if record exists
    const { data, error } = await supabase
      .from('founder_onboarding')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();
      
    if (error) throw error;
    
    // If record exists, return true
    if (data) return true;
    
    // Create new record
    const { error: insertError } = await supabase
      .from('founder_onboarding')
      .insert({ user_id: userId });
      
    if (insertError) throw insertError;
    
    return true;
  } catch (error) {
    console.error("Error ensuring founder_onboarding record:", error);
    return false;
  }
}

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
    logAuth("Not redirecting to acquisition: still loading");
    return false;
  }

  // Not logged in - don't redirect
  if (!user) {
    logAuth("Not redirecting to acquisition: no user");
    return false;
  }

  // Profile doesn't exist - don't redirect
  if (!profile) {
    logAuth("Not redirecting to acquisition: no profile");
    return false;
  }

  // For debugging
  logAuth("Acquisition redirect check:", { currentPath, userRole: profile.role });

  // Check if user is a founder and on a dashboard route but hasn't completed acquisition
  if (
    profile.role === 'founder' && 
    (currentPath === '/founder-dashboard' || currentPath.startsWith('/founder-dashboard/')) &&
    !currentPath.includes('qualification') && 
    !currentPath.includes('onboarding')
  ) {
    // Here we would check if acquisition is needed
    // For now, return false as we've already implemented the qualification route separately
    return false;
  }

  // Always return false for other cases
  return false;
}

/**
 * Checks if the user should be redirected to qualification page
 */
export function shouldRedirectToQualification(
  currentPath: string,
  loading: boolean,
  user: any,
  profile: Profile | null,
  isQualified: boolean
): boolean {
  // Don't redirect while loading
  if (loading) {
    logAuth("Not redirecting to qualification: still loading");
    return false;
  }

  // Not logged in - don't redirect
  if (!user) {
    logAuth("Not redirecting to qualification: no user");
    return false;
  }

  // Profile doesn't exist - don't redirect
  if (!profile) {
    logAuth("Not redirecting to qualification: no profile");
    return false;
  }

  // Only founders need to go through qualification
  if (profile.role !== 'founder') {
    logAuth("Not redirecting to qualification: not a founder");
    return false;
  }

  // If user is already on qualification page, don't redirect
  if (currentPath === '/founder-qualification') {
    logAuth("Already on qualification page");
    return false;
  }

  // If user is qualified, don't redirect
  if (isQualified) {
    logAuth("Not redirecting to qualification: already qualified");
    return false;
  }

  // If user is on a path that doesn't need qualification
  if (
    !currentPath.includes('founder-dashboard') && 
    !currentPath.includes('provider-matches')
  ) {
    logAuth("Not redirecting to qualification: not accessing protected route");
    return false;
  }

  // Else redirect to qualification
  logAuth("Should redirect to qualification");
  return true;
}

/**
 * Checks if the user is on a protected route that requires authentication
 */
export function isProtectedRoute(path: string): boolean {
  const protectedPaths = [
    '/founder-dashboard',
    '/provider-dashboard',
    '/profile',
    '/settings',
    '/messages',
    '/qualification',
    '/founder-qualification'
  ];
  
  return protectedPaths.some(protectedPath => 
    path === protectedPath || path.startsWith(`${protectedPath}/`)
  );
}

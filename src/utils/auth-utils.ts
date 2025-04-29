
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/auth";

export async function fetchProfile(userId: string): Promise<Profile | null> {
  console.log("Fetching profile for:", userId);
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    } else if (data) {
      console.log("Profile loaded:", data);
      return data;
    } else {
      console.log("No profile found for user");
      return null;
    }
  } catch (err) {
    console.error("Profile fetch exception:", err);
    return null;
  }
}

export async function checkAcquisitionStatus(userId: string): Promise<{completed: boolean, checked: boolean}> {
  try {
    // Use "founder_onboarding" table that we just created in the SQL migration
    const { data, error } = await supabase
      .from("founder_onboarding")
      .select("acquisition_completed")
      .eq("user_id", userId)
      .maybeSingle();
    
    if (error) {
      console.error("Error checking acquisition status:", error);
      return {completed: false, checked: true};
    } else {
      return {
        completed: Boolean(data?.acquisition_completed),
        checked: true
      };
    }
  } catch (err) {
    console.error("Error in acquisition status check:", err);
    return {completed: false, checked: true};
  }
}

export function shouldRedirectToAcquisition(
  currentPath: string, 
  loading: boolean, 
  user: any, 
  profile: Profile | null, 
  acquisitionStatus: {completed: boolean, checked: boolean}
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

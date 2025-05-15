
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/auth";
import { toast } from "sonner";
import { logProfile } from "./profile-logger";

/**
 * Fetch user profile from Supabase
 */
export async function fetchProfile(userId: string): Promise<Profile | null> {
  logProfile("Fetching profile for:", userId);
  
  if (!userId) {
    logProfile("fetchProfile called without a userId", null, false, true);
    return null;
  }
  
  try {
    // First attempt to get an existing profile
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    
    if (fetchError) {
      logProfile("Error fetching profile:", fetchError, false, true);
      throw fetchError;
    }
    
    if (existingProfile) {
      logProfile("Existing profile loaded:", existingProfile);
      return existingProfile as Profile;
    }
    
    logProfile("No profile found for user:", userId, true);
    
    // Get auth user data for profile creation
    const { data: { user: authUser }, error: authUserError } = await supabase.auth.getUser();
    
    if (authUserError) {
      logProfile("Error getting auth user data:", authUserError, false, true);
      return null;
    }
    
    if (!authUser) {
      logProfile("No authenticated user found but userId was provided", null, false, true);
      return null;
    }
    
    // Create a new profile with data from auth user
    return await createProfileFromAuthUser(authUser);
  } catch (err) {
    logProfile("Profile fetch exception:", err, false, true);
    throw err;
  }
}

/**
 * Create profile from authenticated user data
 */
async function createProfileFromAuthUser(authUser: any): Promise<Profile | null> {
  try {
    logProfile("Creating new profile for user:", authUser.id);
    
    // Extract user metadata - handle potential missing values safely
    const metadata = authUser.user_metadata || {};
    const email = authUser.email || "";
    const firstName = metadata.first_name || "";
    const lastName = metadata.last_name || "";
    const role = metadata.role || "founder";
    
    // Insert new profile
    const { data: newProfile, error: createError } = await supabase
      .from("profiles")
      .insert({
        id: authUser.id,
        email: email,
        first_name: firstName,
        last_name: lastName,
        avatar_url: metadata.avatar_url || "",
        role: role
      })
      .select("*")
      .maybeSingle();
    
    if (createError) {
      logProfile("Error creating profile:", createError, false, true);
      
      // One more attempt to get the profile in case it was created in another session
      const { data: retryProfile, error: retryError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();
      
      if (retryError || !retryProfile) {
        toast.error("Unable to create your user profile. Please refresh and try again.");
        return null;
      }
      
      logProfile("Found profile on retry:", retryProfile);
      return retryProfile as Profile;
    }
    
    if (!newProfile) {
      logProfile("No profile created or returned", null, false, true);
      return null;
    }
    
    logProfile("Created new profile:", newProfile);
    return newProfile as Profile;
  } catch (createErr) {
    logProfile("Exception creating profile:", createErr, false, true);
    toast.error("Profile creation failed. Please try again.");
    return null;
  }
}

/**
 * Helper function to manually create a profile if automatic creation failed
 */
export async function createProfileManually(
  userId: string, 
  email: string, 
  firstName: string = "", 
  lastName: string = "", 
  role: string = "founder"
): Promise<Profile | null> {
  try {
    logProfile("Manually creating profile for user:", userId);
    
    // Ensure role is valid
    const validRole = (role === "founder" || role === "provider" || role === "admin") ? role : "founder";
    
    const { data: newProfile, error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        email: email,
        first_name: firstName,
        last_name: lastName,
        role: validRole
      })
      .select("*")
      .maybeSingle();
    
    if (error) {
      logProfile("Error manually creating profile:", error, false, true);
      return null;
    }
    
    logProfile("Manually created profile:", newProfile);
    return newProfile as Profile;
  } catch (err) {
    logProfile("Manual profile creation exception:", err, false, true);
    return null;
  }
}

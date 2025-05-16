
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
export async function createProfileFromAuthUser(authUser: any): Promise<Profile | null> {
  try {
    logProfile("Creating new profile for user:", authUser.id);
    
    // Verify if profile exists before creating (additional safety check)
    const { data: existingProfile, error: checkError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .maybeSingle();
      
    if (checkError) {
      logProfile("Error checking for existing profile:", checkError, false, true);
    } else if (existingProfile) {
      logProfile("Profile already exists during creation check:", existingProfile);
      return existingProfile as Profile;
    }
    
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
      .single();
    
    if (createError) {
      logProfile("Error creating profile:", createError, false, true);
      
      // One more attempt to get the profile in case it was created in another session
      const { data: retryProfile, error: retryError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle();
      
      if (retryError || !retryProfile) {
        logProfile("Final attempt to find profile failed:", retryError, false, true);
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
    
    // Also create founder_onboarding record if user is a founder
    if (role === "founder") {
      try {
        await supabase.from("founder_onboarding").insert({
          user_id: authUser.id,
        });
        logProfile("Created founder_onboarding record");
      } catch (onboardingError) {
        logProfile("Error creating founder_onboarding record:", onboardingError, false, true);
        // Don't fail the whole operation if this secondary insert fails
      }
    }
    
    return newProfile as Profile;
  } catch (createErr) {
    logProfile("Exception creating profile:", createErr, false, true);
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
    
    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
      
    if (existingProfile) {
      logProfile("Profile already exists during manual creation:", existingProfile);
      return existingProfile as Profile;
    }
    
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
      .single();
    
    if (error) {
      logProfile("Error manually creating profile:", error, false, true);
      
      // One more attempt in case of race condition
      const { data: retryProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
        
      if (retryProfile) {
        logProfile("Found profile on retry after manual creation error:", retryProfile);
        return retryProfile as Profile;
      }
      
      return null;
    }
    
    logProfile("Manually created profile:", newProfile);
    
    // Also create founder_onboarding record if user is a founder
    if (validRole === "founder") {
      try {
        await supabase.from("founder_onboarding").insert({
          user_id: userId,
        });
        logProfile("Created founder_onboarding record during manual profile creation");
      } catch (onboardingError) {
        logProfile("Error creating founder_onboarding record during manual creation:", onboardingError, false, true);
        // Don't fail the whole operation if this secondary insert fails
      }
    }
    
    return newProfile as Profile;
  } catch (err) {
    logProfile("Manual profile creation exception:", err, false, true);
    return null;
  }
}

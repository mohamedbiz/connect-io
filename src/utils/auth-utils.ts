
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/auth";
import { toast } from "sonner";

export async function fetchProfile(userId: string): Promise<Profile | null> {
  console.log("Fetching profile for:", userId);
  
  if (!userId) {
    console.error("fetchProfile called without a userId");
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
      console.error("Error fetching profile:", fetchError);
      throw fetchError;
    }
    
    if (existingProfile) {
      console.log("Existing profile loaded:", existingProfile);
      return existingProfile as Profile;
    }
    
    console.log("No profile found for user:", userId);
    
    // Get auth user data for profile creation
    const { data: { user: authUser }, error: authUserError } = await supabase.auth.getUser();
    
    if (authUserError) {
      console.error("Error getting auth user data:", authUserError);
      return null;
    }
    
    if (!authUser) {
      console.error("No authenticated user found but userId was provided");
      return null;
    }
    
    // Create a new profile with data from auth user
    try {
      console.log("Creating new profile for user:", userId);
      
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
          id: userId,
          email: email,
          first_name: firstName,
          last_name: lastName,
          avatar_url: metadata.avatar_url || "",
          role: role
        })
        .select("*")
        .single();
      
      if (createError) {
        console.error("Error creating profile:", createError);
        
        // One more attempt to get the profile in case it was created in another session
        const { data: retryProfile, error: retryError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .maybeSingle();
        
        if (retryError || !retryProfile) {
          toast.error("Unable to create your user profile. Please refresh and try again.");
          return null;
        }
        
        console.log("Found profile on retry:", retryProfile);
        return retryProfile as Profile;
      }
      
      console.log("Created new profile:", newProfile);
      return newProfile as Profile;
    } catch (createErr) {
      console.error("Exception creating profile:", createErr);
      toast.error("Profile creation failed. Please try again.");
      return null;
    }
  } catch (err) {
    console.error("Profile fetch exception:", err);
    throw err;
  }
}

// Helper function to manually create a profile if automatic creation failed
export async function createProfileManually(userId: string, email: string, firstName: string = "", lastName: string = "", role: string = "founder"): Promise<Profile | null> {
  try {
    console.log("Manually creating profile for user:", userId);
    
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
      .single();
    
    if (error) {
      console.error("Error manually creating profile:", error);
      return null;
    }
    
    console.log("Manually created profile:", newProfile);
    return newProfile as Profile;
  } catch (err) {
    console.error("Manual profile creation exception:", err);
    return null;
  }
}


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
    // Add small delay to ensure DB operations have completed
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
    
    if (data) {
      console.log("Profile loaded:", data);
      return data as Profile;
    } else {
      console.log("No profile found for user:", userId);
      
      // Attempt to create a profile if none exists
      const authUserResponse = await supabase.auth.getUser();
      
      if (authUserResponse.error) {
        console.error("Error getting user data:", authUserResponse.error);
        return null;
      }
      
      const authUser = authUserResponse.data.user;
      
      if (!authUser) {
        console.error("No authenticated user found");
        return null;
      }
      
      // Create a new profile with basic information
      try {
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            id: userId,
            email: authUser.email || "",
            first_name: authUser.user_metadata?.first_name || "",
            last_name: authUser.user_metadata?.last_name || "",
            avatar_url: authUser.user_metadata?.avatar_url || "",
            role: authUser.user_metadata?.role || "founder"
          })
          .select("*")
          .single();
        
        if (createError) {
          console.error("Error creating profile:", createError);
          toast.error("Failed to create your user profile. Please refresh and try again.");
          return null;
        }
        
        console.log("Created new profile:", newProfile);
        return newProfile as Profile;
      } catch (createErr) {
        console.error("Exception creating profile:", createErr);
        return null;
      }
    }
  } catch (err) {
    console.error("Profile fetch exception:", err);
    throw err;
  }
}

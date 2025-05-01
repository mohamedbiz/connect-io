
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/auth";

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
      return null;
    }
    
    if (data) {
      console.log("Profile loaded:", data);
      return data as Profile;
    } else {
      console.log("No profile found for user:", userId);
      
      // Try once more after a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { data: retryData, error: retryError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      
      if (retryError) {
        console.error("Error on retry fetch profile:", retryError);
        return null;
      }
      
      if (retryData) {
        console.log("Profile loaded on retry:", retryData);
        return retryData as Profile;
      }
      
      return null;
    }
  } catch (err) {
    console.error("Profile fetch exception:", err);
    return null;
  }
}


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
      throw error;
    }
    
    if (data) {
      console.log("Profile loaded:", data);
      return data as Profile;
    } else {
      console.log("No profile found for user:", userId);
      return null;
    }
  } catch (err) {
    console.error("Profile fetch exception:", err);
    throw err;
  }
}

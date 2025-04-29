
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


import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/auth";

/**
 * Fetch a user's profile by their user ID
 * @param userId The user's ID
 * @returns The user's profile or null if not found
 */
export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data as Profile | null;
  } catch (error) {
    console.error("Unexpected error in fetchProfile:", error);
    return null;
  }
};

/**
 * Create a user profile manually
 * @param userId The user's ID
 * @param email The user's email
 * @param firstName The user's first name
 * @param lastName The user's last name
 * @param role The user's role
 * @returns The created profile or null if creation failed
 */
export const createProfileManually = async (
  userId: string,
  email: string,
  firstName: string,
  lastName: string,
  role: "founder" | "provider" | "admin" = "founder"
): Promise<Profile | null> => {
  try {
    // Check if profile already exists to avoid duplicate creation
    const existingProfile = await fetchProfile(userId);
    if (existingProfile) {
      return existingProfile;
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        email: email,
        first_name: firstName,
        last_name: lastName,
        role: role,
        onboarding_complete: false,
      })
      .select("*")
      .single();

    if (error) {
      console.error("Error creating profile:", error);
      return null;
    }

    return data as Profile;
  } catch (error) {
    console.error("Unexpected error in createProfileManually:", error);
    return null;
  }
};

/**
 * Updates a user profile
 * @param userId The user's ID
 * @param profileData The profile data to update
 * @returns The updated profile or null if update failed
 */
export const updateProfile = async (
  userId: string,
  profileData: Partial<Profile>
): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", userId)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      return null;
    }

    return data as Profile;
  } catch (error) {
    console.error("Unexpected error in updateProfile:", error);
    return null;
  }
};

/**
 * Mark a user's onboarding as complete
 * @param userId The user's ID
 * @returns The updated profile or null if update failed
 */
export const completeOnboarding = async (userId: string): Promise<Profile | null> => {
  return updateProfile(userId, {
    onboarding_complete: true
  });
};

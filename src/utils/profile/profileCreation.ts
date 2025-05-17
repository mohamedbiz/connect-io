
import { Profile } from "@/types/auth";
import { User } from "@supabase/supabase-js";
import { createProfileManually } from "@/utils/profile/profile-api";
import { logProfile } from "@/utils/profile/profile-logger";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const createUserProfile = async (
  userId: string,
  setProfile: (profile: Profile | null) => void,
  setProfileError: (error: string | null) => void,
  setProfileLoading: (loading: boolean) => void
): Promise<Profile | null> => {
  logProfile("Attempting to auto-create profile after fetch failures", null, true);
  
  try {
    // Fetch the current user to ensure we have the latest data
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.id === userId) {
      const createdProfile = await createProfileManually(
        user.id,
        user.email || '',
        user.user_metadata?.first_name || '',
        user.user_metadata?.last_name || '',
        user.user_metadata?.role || 'founder'
      );
      
      if (createdProfile) {
        setProfile(createdProfile);
        setProfileError(null);
        logProfile("Auto-created profile successfully", createdProfile);
        toast.success("Profile created automatically");
        setProfileLoading(false);
        return createdProfile;
      }
    }
  } catch (autoCreateError) {
    logProfile("Failed to auto-create profile:", autoCreateError, false, true);
  }
  
  // If auto-creation failed
  setProfileLoading(false);
  setProfileError("Unable to load or create user profile");
  return null;
};

export const ensureUserProfileExists = async (
  user: User | null,
  currentProfile: Profile | null,
  lastFetchTime: number,
  setProfileLoading: (loading: boolean) => void,
  setProfile: (profile: Profile | null) => void,
  setProfileError: (error: string | null) => void
): Promise<Profile | null> => {
  if (!user) {
    logProfile("No user provided to ensureProfile", null, true);
    return null;
  }
  
  if (currentProfile) return currentProfile;
  
  // Apply rate limiting
  if (shouldThrottleFetch(lastFetchTime)) {
    return null;
  }
  
  setProfileLoading(true);
  
  try {
    logProfile(`Manual profile creation initiated for user: ${user.id}`, { email: user.email });
    
    const newProfile = await createProfileManually(
      user.id, 
      user.email || '', 
      user.user_metadata?.first_name || '',
      user.user_metadata?.last_name || '',
      user.user_metadata?.role || 'founder'
    );
    
    if (newProfile) {
      setProfile(newProfile);
      setProfileError(null);
      toast.success("Profile created successfully");
      setProfileLoading(false);
      return newProfile;
    }
    
    setProfileError("Failed to create user profile");
    toast.error("Could not create your profile. Please try again.");
    setProfileLoading(false);
    return null;
  } catch (error) {
    logProfile("Failed to ensure profile exists:", error, false, true);
    setProfileError("Error creating user profile");
    toast.error("Error creating your profile. Please try again.");
    setProfileLoading(false);
    return null;
  }
};

// Import the utility function for rate limiting
import { shouldThrottleFetch } from "./profileFetching";

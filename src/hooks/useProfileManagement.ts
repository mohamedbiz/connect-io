
import { useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { fetchProfile, createProfileManually } from "@/utils/auth-utils";
import { Profile } from "@/types/auth";
import { toast } from "sonner";

export const useProfileManagement = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileAttempts, setProfileAttempts] = useState(0);

  // Fetch profile function with limited retries
  const fetchProfileAndSetState = useCallback(async (userId: string, retryCount = 0) => {
    if (!userId) return;
    
    setProfileLoading(true);
    setProfileAttempts(prev => prev + 1);
    
    try {
      console.log(`Fetching profile for user: ${userId} (attempt ${retryCount + 1})`);
      const profileData = await fetchProfile(userId);
      
      if (!profileData) {
        console.warn(`No profile found for user: ${userId} on attempt ${retryCount + 1}`);
        
        // Implement limited retries (max 1)
        if (retryCount < 1) {
          const delay = 800; // Single fixed retry delay
          console.log(`Retrying profile fetch in ${delay}ms...`);
          
          setTimeout(() => {
            if (userId) { // Double check userId is still valid
              fetchProfileAndSetState(userId, retryCount + 1);
            }
          }, delay);
          return;
        } else {
          // After final retry - set loading to false even if profile is null
          setProfileLoading(false);
          setProfileError("Unable to load user profile. Please try refreshing the page.");
        }
      } else {
        console.log("Profile data retrieved successfully:", profileData);
        setProfile(profileData);
        setProfileError(null);
        setProfileLoading(false);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      
      if (retryCount < 1) {
        const delay = 800; // Single fixed retry delay
        console.log(`Error occurred, retrying profile fetch in ${delay}ms...`);
        
        setTimeout(() => {
          if (userId) { // Double check userId is still valid
            fetchProfileAndSetState(userId, retryCount + 1);
          }
        }, delay);
        return;
      } else {
        // After final retry - set loading to false even with errors
        setProfileLoading(false);
        setProfileError("Error loading profile data. Please try refreshing the page.");
      }
    }
  }, []);

  // Function to manually attempt creating a profile
  const ensureProfile = async (user: User | null): Promise<Profile | null> => {
    if (!user) return null;
    
    if (profile) return profile;
    
    // Try to create profile manually if we have user but no profile
    try {
      setProfileLoading(true);
      const newProfile = await createProfileManually(
        user.id, 
        user.email || '', 
        user.user_metadata?.first_name || '',
        user.user_metadata?.last_name || '',
        user.user_metadata?.role || 'founder'
      );
      
      setProfileLoading(false);
      if (newProfile) {
        setProfile(newProfile);
        setProfileError(null);
        return newProfile;
      }
      
      setProfileError("Failed to create user profile");
      return null;
    } catch (error) {
      console.error("Failed to ensure profile exists:", error);
      setProfileLoading(false);
      setProfileError("Error creating user profile");
      return null;
    }
  };

  const resetProfileState = () => {
    setProfile(null);
    setProfileLoading(false);
    setProfileError(null);
    setProfileAttempts(0);
  };

  return {
    profile,
    profileLoading,
    profileError,
    profileAttempts,
    fetchProfileAndSetState,
    ensureProfile,
    resetProfileState,
    setProfile
  };
};


import { User } from '@supabase/supabase-js';
import { supabase, checkNetworkConnection } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { toast } from 'sonner';
import { logAuth } from '@/utils/auth/auth-logger';

// Fetch user profile
export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  try {
    logAuth(`Fetching profile for user: ${userId}`);
    
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected when fetching profile', null, true);
      toast.error('Network connection issue. Please check your internet connection.');
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      logAuth('Error fetching profile:', error, false, true);
      return null;
    }

    logAuth('Profile fetched successfully', data);
    return data as Profile;
  } catch (error) {
    logAuth('Exception fetching profile:', error, false, true);
    return null;
  }
};

// Create profile for new user
export const createProfile = async (
  userId: string,
  email: string,
  firstName: string,
  lastName: string,
  role: 'founder' | 'provider' = 'founder'
): Promise<Profile | null> => {
  try {
    // Set initial account_status based on role
    const accountStatus = role === 'provider' ? 'pending_application' : 'pending_profile';
    
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email,
        first_name: firstName,
        last_name: lastName,
        role,
        account_status: accountStatus,
        onboarding_complete: false,
        approved: role === 'founder' ? true : false // Founders auto-approved, providers need manual approval
      })
      .select()
      .single();
      
    if (error) {
      logAuth('Error creating profile:', error, false, true);
      return null;
    }
    
    logAuth(`Profile created with role: ${role}, status: ${accountStatus}`, data);
    return data as Profile;
  } catch (error) {
    logAuth('Error creating profile:', error, false, true);
    return null;
  }
};

// Update profile
export const updateProfile = async (userId: string, updates: Partial<Profile>): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
      
    if (error) {
      logAuth('Error updating profile:', error, false, true);
      return null;
    }
    
    return data as Profile;
  } catch (error) {
    logAuth('Error updating profile:', error, false, true);
    return null;
  }
};

// Ensure a profile exists or create one if it doesn't
export const ensureProfileExists = async (user: User | null): Promise<Profile | null> => {
  if (!user) return null;
  
  try {
    const isOnline = await checkNetworkConnection();
    if (!isOnline) {
      logAuth('Network connectivity issue detected when ensuring profile exists', null, true);
      toast.error('Network connection issue. Please check your internet and try again.');
      return null;
    }
    
    // First try to fetch existing profile
    let userProfile = await fetchProfile(user.id);
    
    // If no profile exists, create one
    if (!userProfile) {
      logAuth('No profile found, creating one', { userId: user.id, userMetadata: user.user_metadata });
      
      // Extract role from user metadata with proper fallback
      const roleFromMetadata = user.user_metadata?.role;
      let userRole: 'founder' | 'provider' = 'founder'; // default
      
      if (roleFromMetadata === 'provider') {
        userRole = 'provider';
      } else if (roleFromMetadata === 'founder') {
        userRole = 'founder';
      }
      
      logAuth(`Creating profile with role: ${userRole}`, { extractedRole: roleFromMetadata });
      
      userProfile = await createProfile(
        user.id,
        user.email || '',
        user.user_metadata?.first_name || '',
        user.user_metadata?.last_name || '',
        userRole
      );
      
      if (userProfile) {
        toast.success('Profile created successfully');
      } else {
        toast.error('Could not create user profile');
      }
    }
    
    return userProfile;
  } catch (error) {
    logAuth('Error ensuring profile exists:', error, false, true);
    toast.error('Profile error');
    return null;
  }
};


import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

// Extended profile type that includes joined data from Supabase query
interface ExtendedProfile extends Profile {
  provider_profiles?: any[];
  founder_profiles?: any[];
  provider_applications?: any[];
}

export interface UserWithRole {
  user: User | null;
  profile: ExtendedProfile | null;
  role: 'founder' | 'provider' | 'admin' | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  isOnboardingComplete: boolean;
  applicationStatus?: string;
}

export const useAuthWithRole = (): UserWithRole => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ExtendedProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Separate function to fetch profile data
  const fetchProfileData = async (userId: string) => {
    try {
      console.log('useAuthWithRole: Fetching profile data for user:', userId);
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select(`
          *,
          provider_profiles(*),
          founder_profiles(*),
          provider_applications(*)
        `)
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('useAuthWithRole: Error fetching profile:', error);
        return null;
      }
      
      console.log('useAuthWithRole: Profile data fetched:', profileData);
      return profileData;
    } catch (err) {
      console.error('useAuthWithRole: Exception fetching profile:', err);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('useAuthWithRole: Initializing auth state');
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (currentSession) {
          console.log('useAuthWithRole: Found existing session');
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Defer profile fetching to avoid blocking auth state resolution
          setTimeout(async () => {
            if (mounted) {
              const profileData = await fetchProfileData(currentSession.user.id);
              if (mounted) {
                setProfile(profileData);
              }
            }
          }, 0);
        } else {
          console.log('useAuthWithRole: No existing session found');
        }
      } catch (error) {
        console.error('useAuthWithRole: Error initializing auth:', error);
      } finally {
        if (mounted) {
          console.log('useAuthWithRole: Auth initialization complete, setting loading to false');
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Set up auth state change listener - NO ASYNC CALLS HERE
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!mounted) return;

      console.log('useAuthWithRole: Auth state changed:', event);
      
      // Synchronous state updates only
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false); // Always set loading to false when auth state changes
      
      // Defer any async operations
      if (newSession?.user) {
        console.log('useAuthWithRole: User authenticated, deferring profile fetch');
        setTimeout(async () => {
          if (mounted) {
            const profileData = await fetchProfileData(newSession.user.id);
            if (mounted) {
              setProfile(profileData);
            }
          }
        }, 0);
      } else {
        console.log('useAuthWithRole: User not authenticated, clearing profile');
        setProfile(null);
      }
    });

    return () => {
      console.log('useAuthWithRole: Cleaning up auth state listener');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const getOnboardingStatus = (profile: ExtendedProfile): boolean => {
    if (!profile) return false;
    
    if (profile.role === 'provider') {
      // Provider is onboarded if they have completed their application
      return profile.onboarding_complete === true;
    }
    
    if (profile.role === 'founder') {
      // Founder is onboarded if they have completed basic profile
      return profile.onboarding_complete === true;
    }
    
    return false;
  };

  const getApplicationStatus = (profile: ExtendedProfile): string | undefined => {
    if (profile?.role === 'provider' && profile.provider_applications?.length > 0) {
      return profile.provider_applications[0].status;
    }
    return undefined;
  };

  const status = loading ? 'loading' : (session ? 'authenticated' : 'unauthenticated');
  
  console.log('useAuthWithRole: Current state:', {
    loading,
    hasSession: !!session,
    hasUser: !!user,
    hasProfile: !!profile,
    status,
    role: profile?.role || null
  });

  return {
    user,
    profile,
    role: profile?.role || null,
    status,
    isOnboardingComplete: profile ? getOnboardingStatus(profile) : false,
    applicationStatus: profile ? getApplicationStatus(profile) : undefined
  };
};

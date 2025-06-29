
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

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Fetch complete profile with related data
          const { data: profileData } = await supabase
            .from('profiles')
            .select(`
              *,
              provider_profiles(*),
              founder_profiles(*),
              provider_applications(*)
            `)
            .eq('id', currentSession.user.id)
            .single();
          
          if (mounted && profileData) {
            setProfile(profileData);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!mounted) return;

      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      if (newSession?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select(`
            *,
            provider_profiles(*),
            founder_profiles(*),
            provider_applications(*)
          `)
          .eq('id', newSession.user.id)
          .single();
        
        if (mounted) {
          setProfile(profileData);
        }
      } else {
        setProfile(null);
      }
      
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
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

  return {
    user,
    profile,
    role: profile?.role || null,
    status: loading ? 'loading' : (session ? 'authenticated' : 'unauthenticated'),
    isOnboardingComplete: profile ? getOnboardingStatus(profile) : false,
    applicationStatus: profile ? getApplicationStatus(profile) : undefined
  };
};

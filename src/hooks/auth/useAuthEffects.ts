
import { useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';
import { usePostLoginRedirection } from '@/hooks/usePostLoginRedirection';

interface UseAuthEffectsProps {
  loading: boolean;
  hasRedirected: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setHasRedirected: (hasRedirected: boolean) => void;
  fetchProfile: (userId: string) => Promise<Profile | null>;
}

export const useAuthEffects = ({
  loading,
  hasRedirected,
  setSession,
  setUser,
  setProfile,
  setLoading,
  setError,
  setHasRedirected,
  fetchProfile,
}: UseAuthEffectsProps) => {
  const { redirectAfterLogin } = usePostLoginRedirection();

  // Loading timeout effect
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.log('Loading timeout reached, forcing loading to false');
        setLoading(false);
        setError('Authentication timeout - please refresh the page');
      }
    }, 10000);

    return () => clearTimeout(loadingTimeout);
  }, [loading, setLoading, setError]);

  // Main auth effect
  useEffect(() => {
    let mounted = true;
    
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (!mounted) return;

        setSession(session);
        if (session?.user) {
          console.log('Initial session found for user:', session.user.email);
          setUser(session.user);
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
          
          if (!hasRedirected) {
            console.log('Triggering initial redirection...');
            setHasRedirected(true);
            setTimeout(() => {
              if (mounted) {
                redirectAfterLogin(session.user, userProfile);
              }
            }, 100);
          }
        } else {
          console.log('No initial session found');
        }
      } catch (error: any) {
        console.error('Error getting session:', error);
        if (mounted) {
          setError('Authentication error');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (!mounted) return;
        
        setSession(session);
        if (session?.user) {
          setUser(session.user);
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
          
          if (event === 'SIGNED_IN' && !hasRedirected) {
            console.log('User signed in, triggering redirection');
            setHasRedirected(true);
            setTimeout(() => {
              if (mounted) {
                redirectAfterLogin(session.user, userProfile);
              }
            }, 100);
          }
        } else {
          setUser(null);
          setProfile(null);
          setHasRedirected(false);
        }
        
        setLoading(false);
        setError(null);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [
    hasRedirected,
    setSession,
    setUser,
    setProfile,
    setLoading,
    setError,
    setHasRedirected,
    fetchProfile,
    redirectAfterLogin,
  ]);
};

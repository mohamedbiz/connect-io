
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

  // Critical fix: Loading timeout to prevent infinite loading
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.warn('Authentication loading timeout reached');
        setLoading(false);
        setError('Authentication timeout - please refresh the page');
      }
    }, 8000); // Reduced from 10s to 8s

    return () => clearTimeout(loadingTimeout);
  }, [loading, setLoading, setError]);

  // Main auth effect - simplified to prevent loops
  useEffect(() => {
    let mounted = true;
    let redirectionTimeout: NodeJS.Timeout;
    
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (!mounted) return;

        setSession(session);
        setError(null);
        
        if (session?.user) {
          console.log('Initial session found for user:', session.user.email);
          setUser(session.user);
          
          try {
            const userProfile = await fetchProfile(session.user.id);
            setProfile(userProfile);
            
            // Fixed redirection logic - only redirect if not already redirected
            if (!hasRedirected) {
              console.log('Triggering initial redirection...');
              setHasRedirected(true);
              redirectionTimeout = setTimeout(() => {
                if (mounted) {
                  redirectAfterLogin(session.user, userProfile);
                }
              }, 500); // Increased delay to prevent race conditions
            }
          } catch (profileError) {
            console.error('Error fetching profile:', profileError);
            setProfile(null);
          }
        } else {
          console.log('No initial session found');
          setUser(null);
          setProfile(null);
        }
      } catch (error: any) {
        console.error('Error getting session:', error);
        if (mounted) {
          setError('Authentication error - please try again');
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
        setError(null);
        
        if (session?.user) {
          setUser(session.user);
          
          try {
            const userProfile = await fetchProfile(session.user.id);
            setProfile(userProfile);
            
            // Only redirect on SIGNED_IN event and if not already redirected
            if (event === 'SIGNED_IN' && !hasRedirected) {
              console.log('User signed in, triggering redirection');
              setHasRedirected(true);
              redirectionTimeout = setTimeout(() => {
                if (mounted) {
                  redirectAfterLogin(session.user, userProfile);
                }
              }, 500);
            }
          } catch (profileError) {
            console.error('Error fetching profile:', profileError);
            setProfile(null);
          }
        } else {
          setUser(null);
          setProfile(null);
          setHasRedirected(false);
        }
        
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      if (redirectionTimeout) {
        clearTimeout(redirectionTimeout);
      }
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

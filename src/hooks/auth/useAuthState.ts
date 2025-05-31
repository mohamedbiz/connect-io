
import { useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { Profile } from '@/types/auth';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);

  return {
    user,
    setUser,
    session,
    setSession,
    profile,
    setProfile,
    loading,
    setLoading,
    error,
    setError,
    hasRedirected,
    setHasRedirected,
  };
};

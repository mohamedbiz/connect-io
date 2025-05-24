
import { Session, User } from '@supabase/supabase-js';
import { Profile } from './auth';

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  register: (email: string, password: string, userData: { first_name: string; last_name: string; role: 'founder' | 'provider' }) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  ensureProfile: () => Promise<Profile | null>;
  retryAuth: () => void;
};

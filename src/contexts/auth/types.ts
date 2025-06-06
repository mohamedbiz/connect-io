
import { User, Session } from '@supabase/supabase-js';
import { Profile } from '@/types/auth';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  register: (email: string, password: string, userData: { first_name: string; last_name: string; role: 'founder' | 'provider' }) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<{ error: any | null }>;
  refreshProfile: () => Promise<void>;
  retryAuth: () => void;
}

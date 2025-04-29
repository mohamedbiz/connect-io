
import { Session, User } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  email: string;
  role: string;
  business_name?: string | null;
  expertise?: string | null;
  portfolio_url?: string | null;
  linkedin_url?: string | null;
  about?: string | null;
  created_at?: string;
};

export type AcquisitionStatus = {
  completed: boolean;
  checked: boolean;
};

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  logout: () => Promise<void>;
  shouldRedirectToAcquisition: (currentPath: string) => boolean;
};

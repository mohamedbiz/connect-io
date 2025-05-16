
export type UserRole = 'founder' | 'provider' | 'admin';

export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  email: string;
  role: UserRole;
  business_name?: string;
  expertise?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  about?: string;
  onboarding_complete?: boolean;
}

export interface AuthFormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

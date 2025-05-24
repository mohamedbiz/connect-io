
export type UserRole = 'founder' | 'provider' | 'admin';

export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  email: string;
  role: UserRole;
  onboarding_complete?: boolean;
  
  // Founder fields
  business_name?: string;
  business_website?: string;
  industry?: string;
  email_platform?: string;
  marketing_goal?: string;
  biggest_challenge?: string;
  monthly_revenue?: string;
  
  // Provider fields
  headline?: string;
  years_experience?: string;
  primary_esp?: string;
  industries_served?: string[];
  approach_description?: string;
  portfolio_url?: string;
  approved?: boolean;
  
  // Common
  profile_picture_url?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

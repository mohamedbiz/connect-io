
export interface Profile {
  id: string;
  role: 'founder' | 'provider' | 'admin';
  account_status?: 'pending_profile' | 'pending_application' | 'active' | 'rejected';
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  profile_picture_url?: string;
  business_name?: string;
  business_website?: string;
  industry?: string;
  onboarding_complete?: boolean;
  approved?: boolean;
  is_featured: boolean;
  created_at?: string;
  
  // Founder-specific fields
  email_platform?: string;
  marketing_goal?: string;
  biggest_challenge?: string;
  monthly_revenue?: string;
  
  // Provider-specific fields
  headline?: string;
  years_experience?: string;
  primary_esp?: string;
  industries_served?: string[];
  approach_description?: string;
  portfolio_url?: string;
}

export interface FounderProfile {
  id: string;
  user_id: string;
  business_website?: string;
  current_email_platform?: string;
  primary_goal?: string;
  biggest_challenge?: string;
  monthly_revenue_range?: string;
  profile_picture_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ProviderProfile {
  id: string;
  user_id: string;
  headline?: string;
  years_experience?: string;
  primary_esp?: string;
  industries_served?: string[];
  approach_description?: string;
  portfolio_url?: string;
  profile_picture_url?: string;
  created_at: string;
  updated_at: string;
}


export interface UserProfile {
  name: string;
  email: string;
  avatar_url?: string;
  business_name?: string;
  expertise?: string;
}

export interface ProviderProfile extends UserProfile {
  expertise: string;
}

export interface FounderProfile extends UserProfile {
  business_name: string;
}

export interface Match {
  id: string;
  founder_id: string;
  provider_id: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
  created_at: string;
  updated_at: string;
  // Extended provider data
  provider?: ProviderProfile;
  // Extended founder data
  founder?: FounderProfile;
}

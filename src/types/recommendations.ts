
export interface RecommendationReason {
  code: string;
  description: string;
  weight: number;
}

export interface ProviderRecommendation {
  id: string;
  founder_id: string;
  provider_id: string;
  match_score: number;
  reason_codes: string[];
  created_at: string;
  updated_at: string;
  provider?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    headline: string;
    years_experience: string;
    primary_esp: string;
    industries_served: string[];
    approach_description: string;
    portfolio_url: string;
    avatar_url?: string;
    is_featured: boolean;
  };
}

export interface RecommendationEngineConfig {
  industryMatchWeight: number;
  platformMatchWeight: number;
  experienceWeight: number;
  revenueMatchWeight: number;
  goalMatchWeight: number;
}

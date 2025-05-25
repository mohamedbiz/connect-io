
export interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  description: string;
  rating: number;
  projectsCompleted: number;
  specialties: string[];
  averageOrderValue?: number;
  expertise: ExpertiseArea[];
  successMetrics: SuccessMetric[];
  platformExperience: string[];
  featured?: boolean;
}

export interface ExpertiseArea {
  category: string;
  skills: string[];
}

export interface SuccessMetric {
  category: string;
  value: string;
  timeframe: string;
}

export interface Match {
  id: string;
  founder_id: string;
  provider_id: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
  created_at: string;
  provider?: ServiceProvider;
}

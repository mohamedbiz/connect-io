
export interface ServiceProvider {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  title?: string;
  description?: string;
  rating: number;
  projectsCompleted: number;
  specialties: string[];
  averageOrderValue?: number;
  expertise?: {
    category: string;
    skills: string[];
  }[];
  successMetrics?: {
    category: string;
    value: string;
    timeframe: string;
  }[];
  platformExperience?: string[];
}

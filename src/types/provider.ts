
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
  expertise?: {
    category: string;
    skills: string[];
  }[];
}

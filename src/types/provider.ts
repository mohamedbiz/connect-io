
export interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  title: string;
  specialties: string[];
  rating: number;
  projectsCompleted: number;
  averageOrderValue: number;
  description: string;
  expertise: {
    category: string;
    skills: string[];
  }[];
}

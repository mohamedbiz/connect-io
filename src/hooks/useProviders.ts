
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ServiceProvider } from '@/types/provider';

export const useProviders = () => {
  return useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching providers:', error);
        throw error;
      }
      
      // Transform Supabase data to match the ServiceProvider type
      const providers: ServiceProvider[] = data?.map(p => ({
        id: p.id,
        name: p.name,
        email: p.email,
        avatar: p.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(p.name) + '&background=0D8ABC&color=fff',
        title: p.title || 'Email Marketing Specialist',
        description: p.description || 'Experienced email marketing specialist focused on improving conversion rates and customer retention.',
        rating: p.rating || 4.5,
        projectsCompleted: p.projects_completed || 0,
        specialties: p.specialties || ['Email Marketing'],
        averageOrderValue: p.average_order_value || 2000,
        expertise: p.expertise || [],
        successMetrics: p.success_metrics || [],
        platformExperience: p.platform_experience || []
      })) || [];
      
      return providers;
    }
  });
};

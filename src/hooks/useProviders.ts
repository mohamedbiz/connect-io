
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
      
      // Transform Supabase data to match the ServiceProvider type with proper type checking
      const providers: ServiceProvider[] = data?.map(p => {
        // Handle expertise array - ensure it matches the expected format
        const expertiseArray = Array.isArray(p.expertise) 
          ? p.expertise.map((item: any) => ({
              category: item.category || '',
              skills: Array.isArray(item.skills) ? item.skills : []
            }))
          : typeof p.expertise === 'object' && p.expertise !== null 
            ? Object.values(p.expertise).map((item: any) => ({
                category: item.category || '',
                skills: Array.isArray(item.skills) ? item.skills : []
              }))
            : [];

        // Handle success metrics array - ensure it matches the expected format
        const successMetricsArray = Array.isArray(p.success_metrics) 
          ? p.success_metrics.map((item: any) => ({
              category: item.category || '',
              value: item.value || '',
              timeframe: item.timeframe || ''
            }))
          : typeof p.success_metrics === 'object' && p.success_metrics !== null
            ? Object.values(p.success_metrics).map((item: any) => ({
                category: item.category || '',
                value: item.value || '',
                timeframe: item.timeframe || ''
              }))
            : [];

        return {
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
          expertise: expertiseArray,
          successMetrics: successMetricsArray,
          platformExperience: p.platform_experience || [],
          featured: p.is_featured || false
        };
      }) || [];
      
      // Sort providers with featured ones first
      return providers.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }
  });
};

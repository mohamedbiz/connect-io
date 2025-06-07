
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ProviderRecommendation } from '@/types/recommendations';
import { Profile } from '@/types/auth';
import { recommendationEngine } from '@/services/recommendationEngine';

export const useRecommendations = () => {
  const { profile } = useAuth();
  const [recommendations, setRecommendations] = useState<ProviderRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecommendations = async () => {
    if (!profile || profile.role !== 'founder') return;

    setLoading(true);
    setError(null);

    try {
      // Fetch all approved providers
      const { data: providers, error: providersError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'provider')
        .eq('approved', true)
        .eq('onboarding_complete', true);

      if (providersError) throw providersError;

      // Generate recommendations
      const recommendationsData: ProviderRecommendation[] = [];

      for (const provider of providers || []) {
        const matchScore = recommendationEngine.calculateMatchScore(profile, provider);
        
        // Only include providers with a reasonable match score
        if (matchScore >= 30) {
          const reasonCodes = recommendationEngine.generateReasonCodes(profile, provider);
          
          recommendationsData.push({
            id: `${profile.id}_${provider.id}`,
            founder_id: profile.id,
            provider_id: provider.id,
            match_score: matchScore,
            reason_codes: reasonCodes,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            provider: {
              id: provider.id,
              first_name: provider.first_name || '',
              last_name: provider.last_name || '',
              email: provider.email,
              headline: provider.headline || '',
              years_experience: provider.years_experience || '',
              primary_esp: provider.primary_esp || '',
              industries_served: provider.industries_served || [],
              approach_description: provider.approach_description || '',
              portfolio_url: provider.portfolio_url || '',
              avatar_url: provider.avatar_url,
              is_featured: provider.is_featured,
            },
          });
        }
      }

      // Sort by match score (highest first)
      recommendationsData.sort((a, b) => b.match_score - a.match_score);

      // Take top 5 recommendations
      setRecommendations(recommendationsData.slice(0, 5));
    } catch (err: any) {
      console.error('Error generating recommendations:', err);
      setError(err.message || 'Failed to generate recommendations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile?.role === 'founder' && profile.onboarding_complete) {
      generateRecommendations();
    }
  }, [profile]);

  return {
    recommendations,
    loading,
    error,
    refreshRecommendations: generateRecommendations,
  };
};

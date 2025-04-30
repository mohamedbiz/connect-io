
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PostPurchaseDiagnostic, SequenceStep } from '@/types/post-purchase-diagnostics';
import { toast } from 'sonner';

// Hook to fetch post-purchase diagnostics
export const usePostPurchaseDiagnostics = (userId?: string) => {
  const queryClient = useQueryClient();

  const fetchPostPurchaseDiagnostics = async (): Promise<PostPurchaseDiagnostic | null> => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from('post_purchase_diagnostics')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching post-purchase diagnostics:', error);
      return null;
    }

    if (!data) return null;

    // Properly type-cast the sequences field from JSON data to our typed model
    const typedSequences: SequenceStep[] = Array.isArray(data.sequences) 
      ? data.sequences.map((sequence: any) => ({
          id: sequence.id || '',
          name: sequence.name || '',
          status: sequence.status || 'missing',
          impact: sequence.impact || 'medium',
          description: sequence.description || '',
          expectedLift: sequence.expectedLift || '',
          recommendations: Array.isArray(sequence.recommendations) ? sequence.recommendations : []
        }))
      : [];

    return {
      overallScore: data.overall_score,
      currentRepeatRate: data.current_repeat_rate || 0,
      industryAverage: data.industry_average || 0,
      potentialRepeatRate: data.potential_repeat_rate || 0,
      estimatedRevenueLift: data.estimated_revenue_lift || 0,
      sequences: typedSequences
    };
  };

  const savePostPurchaseDiagnostics = async (diagnosticData: Partial<PostPurchaseDiagnostic>) => {
    if (!userId) throw new Error('User not authenticated');

    // Convert the strongly typed sequences to a JSON structure for Supabase
    const jsonSequences = diagnosticData.sequences ? JSON.parse(JSON.stringify(diagnosticData.sequences)) : [];

    const { data, error } = await supabase
      .from('post_purchase_diagnostics')
      .insert({
        user_id: userId,
        overall_score: diagnosticData.overallScore || 0,
        current_repeat_rate: diagnosticData.currentRepeatRate || 0,
        industry_average: diagnosticData.industryAverage || 0,
        potential_repeat_rate: diagnosticData.potentialRepeatRate || 0,
        estimated_revenue_lift: diagnosticData.estimatedRevenueLift || 0,
        sequences: jsonSequences
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving post-purchase diagnostics:', error);
      throw error;
    }

    return data;
  };

  const query = useQuery({
    queryKey: ['postPurchaseDiagnostics', userId],
    queryFn: fetchPostPurchaseDiagnostics,
    enabled: !!userId
  });

  const mutation = useMutation({
    mutationFn: savePostPurchaseDiagnostics,
    onSuccess: () => {
      toast.success('Post-purchase diagnostics saved successfully');
      queryClient.invalidateQueries({ queryKey: ['postPurchaseDiagnostics', userId] });
    },
    onError: (error) => {
      toast.error(`Failed to save diagnostics: ${error.message}`);
    }
  });

  return {
    ...query,
    saveDiagnostics: mutation.mutate,
    isSaving: mutation.isPending
  };
};

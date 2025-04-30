
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EmailListGrowthData } from '@/types/email-diagnostics';
import { PostPurchaseDiagnostic } from '@/types/post-purchase-diagnostics';
import { toast } from 'sonner';

// Hook to fetch email marketing diagnostics
export const useEmailDiagnostics = (userId?: string) => {
  const queryClient = useQueryClient();

  const fetchEmailDiagnostics = async (): Promise<EmailListGrowthData | null> => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from('email_diagnostics')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching email diagnostics:', error);
      return null;
    }

    if (!data) return null;

    return {
      overallScore: data.overall_score,
      currentConversionRate: data.current_conversion_rate || 0,
      industryAverage: data.industry_average || 0,
      potentialConversionRate: data.potential_conversion_rate || 0,
      estimatedListGrowth: data.estimated_list_growth || 0,
      forms: data.forms || []
    };
  };

  const saveEmailDiagnostics = async (diagnosticData: Partial<EmailListGrowthData>) => {
    if (!userId) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('email_diagnostics')
      .insert({
        user_id: userId,
        overall_score: diagnosticData.overallScore || 0,
        current_conversion_rate: diagnosticData.currentConversionRate || 0,
        industry_average: diagnosticData.industryAverage || 0,
        potential_conversion_rate: diagnosticData.potentialConversionRate || 0,
        estimated_list_growth: diagnosticData.estimatedListGrowth || 0,
        forms: diagnosticData.forms || []
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving email diagnostics:', error);
      throw error;
    }

    return data;
  };

  const query = useQuery({
    queryKey: ['emailDiagnostics', userId],
    queryFn: fetchEmailDiagnostics,
    enabled: !!userId
  });

  const mutation = useMutation({
    mutationFn: saveEmailDiagnostics,
    onSuccess: () => {
      toast.success('Email diagnostics saved successfully');
      queryClient.invalidateQueries({ queryKey: ['emailDiagnostics', userId] });
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

    return {
      overallScore: data.overall_score,
      currentRepeatRate: data.current_repeat_rate || 0,
      industryAverage: data.industry_average || 0,
      potentialRepeatRate: data.potential_repeat_rate || 0,
      estimatedRevenueLift: data.estimated_revenue_lift || 0,
      sequences: data.sequences || []
    };
  };

  const savePostPurchaseDiagnostics = async (diagnosticData: Partial<PostPurchaseDiagnostic>) => {
    if (!userId) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('post_purchase_diagnostics')
      .insert({
        user_id: userId,
        overall_score: diagnosticData.overallScore || 0,
        current_repeat_rate: diagnosticData.currentRepeatRate || 0,
        industry_average: diagnosticData.industryAverage || 0,
        potential_repeat_rate: diagnosticData.potentialRepeatRate || 0,
        estimated_revenue_lift: diagnosticData.estimatedRevenueLift || 0,
        sequences: diagnosticData.sequences || []
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

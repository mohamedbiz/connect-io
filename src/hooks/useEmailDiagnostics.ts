
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EmailListGrowthData, SignupFormMetric } from '@/types/email-diagnostics';
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

    // Properly type-cast the forms field from JSON data to our typed model
    const typedForms: SignupFormMetric[] = Array.isArray(data.forms) 
      ? data.forms.map((form: any) => ({
          id: form.id || '',
          name: form.name || '',
          score: form.score || 0,
          currentRate: form.currentRate || 0,
          industryAverage: form.industryAverage || 0,
          potentialRate: form.potentialRate || 0,
          description: form.description || '',
          improvementTips: Array.isArray(form.improvementTips) ? form.improvementTips : []
        }))
      : [];

    return {
      overallScore: data.overall_score,
      currentConversionRate: data.current_conversion_rate || 0,
      industryAverage: data.industry_average || 0,
      potentialConversionRate: data.potential_conversion_rate || 0,
      estimatedListGrowth: data.estimated_list_growth || 0,
      forms: typedForms
    };
  };

  const saveEmailDiagnostics = async (diagnosticData: Partial<EmailListGrowthData>) => {
    if (!userId) throw new Error('User not authenticated');

    // Convert the strongly typed forms to a JSON structure for Supabase
    const jsonForms = diagnosticData.forms ? JSON.parse(JSON.stringify(diagnosticData.forms)) : [];

    const { data, error } = await supabase
      .from('email_diagnostics')
      .insert({
        user_id: userId,
        overall_score: diagnosticData.overallScore || 0,
        current_conversion_rate: diagnosticData.currentConversionRate || 0,
        industry_average: diagnosticData.industryAverage || 0,
        potential_conversion_rate: diagnosticData.potentialConversionRate || 0,
        estimated_list_growth: diagnosticData.estimatedListGrowth || 0,
        forms: jsonForms
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

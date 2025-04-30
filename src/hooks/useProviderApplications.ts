
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProviderApplication } from '@/types/supabase-custom-types';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useProviderApplications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get application for current user
  const fetchMyApplication = async () => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('provider_applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching provider application:', error);
      return null;
    }

    return data;
  };

  // For admin - fetch all provider applications
  const fetchAllApplications = async () => {
    const { data, error } = await supabase
      .from('provider_applications')
      .select(`
        *,
        profiles:user_id(first_name, last_name, email, avatar_url)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching provider applications:', error);
      return [];
    }

    return data || [];
  };

  // For admin - update application status
  const updateApplicationStatus = async ({ 
    applicationId, 
    status, 
    reviewerNotes,
    technicalScore 
  }: { 
    applicationId: string; 
    status: 'submitted' | 'in_review' | 'approved' | 'rejected'; 
    reviewerNotes?: string;
    technicalScore?: number;
  }) => {
    const { data, error } = await supabase
      .from('provider_applications')
      .update({ 
        status,
        reviewer_notes: reviewerNotes,
        technical_assessment_score: technicalScore,
        reviewed_at: new Date().toISOString(),
        accepted: status === 'approved'
      })
      .eq('id', applicationId)
      .select()
      .single();

    if (error) {
      console.error('Error updating provider application:', error);
      throw error;
    }

    return data;
  };

  // Query for my application
  const myApplicationQuery = useQuery({
    queryKey: ['myProviderApplication', user?.id],
    queryFn: fetchMyApplication,
    enabled: !!user
  });

  // Query for all applications (admin)
  const allApplicationsQuery = useQuery({
    queryKey: ['allProviderApplications'],
    queryFn: fetchAllApplications,
    enabled: false // Only load when explicitly requested
  });

  // Mutation for updating application status
  const updateStatusMutation = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: () => {
      toast.success('Application status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['allProviderApplications'] });
      queryClient.invalidateQueries({ queryKey: ['myProviderApplication', user?.id] });
    },
    onError: (error) => {
      toast.error(`Failed to update application: ${error.message}`);
    }
  });

  return {
    myApplication: myApplicationQuery.data,
    isLoadingMyApplication: myApplicationQuery.isLoading,
    
    allApplications: allApplicationsQuery.data || [],
    isLoadingAllApplications: allApplicationsQuery.isLoading,
    loadAllApplications: () => allApplicationsQuery.refetch(),
    
    updateApplicationStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending
  };
};

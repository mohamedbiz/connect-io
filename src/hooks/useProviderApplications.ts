
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProviderApplication } from '@/types/supabase-custom-types';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { emailNotificationService } from '@/services/emailNotificationService';

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

  // For admin - update application status with email notification
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
      .select(`
        *,
        profiles:user_id(first_name, last_name, email)
      `)
      .single();

    if (error) {
      console.error('Error updating provider application:', error);
      throw error;
    }

    // Send email notification
    if (data && data.profiles) {
      const profile = data.profiles;
      const applicantName = `${profile.first_name} ${profile.last_name}`;
      const applicantEmail = profile.email;

      // Send notification in the background
      emailNotificationService.sendStatusUpdateEmail(
        applicationId,
        status,
        applicantEmail,
        applicantName,
        reviewerNotes
      ).catch(error => {
        console.error('Failed to send email notification:', error);
        // Don't throw error - email failure shouldn't break the status update
      });
    }

    return data;
  };

  // Submit new application with email notification
  const submitApplication = async (applicationData: any) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('provider_applications')
      .insert({
        user_id: user.id,
        application_data: applicationData,
        status: 'submitted',
        submitted_at: new Date().toISOString()
      })
      .select(`
        *,
        profiles:user_id(first_name, last_name, email)
      `)
      .single();

    if (error) {
      console.error('Error submitting application:', error);
      throw error;
    }

    // Send submission confirmation email
    if (data && data.profiles) {
      const profile = data.profiles;
      const applicantName = `${profile.first_name} ${profile.last_name}`;
      const applicantEmail = profile.email;

      emailNotificationService.sendStatusUpdateEmail(
        data.id,
        'submitted',
        applicantEmail,
        applicantName
      ).catch(error => {
        console.error('Failed to send submission confirmation email:', error);
      });
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
      toast.success('Application status updated and notification sent');
      queryClient.invalidateQueries({ queryKey: ['allProviderApplications'] });
      queryClient.invalidateQueries({ queryKey: ['myProviderApplication', user?.id] });
    },
    onError: (error) => {
      toast.error(`Failed to update application: ${error.message}`);
    }
  });

  // Mutation for submitting application
  const submitApplicationMutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      toast.success('Application submitted successfully! Confirmation email sent.');
      queryClient.invalidateQueries({ queryKey: ['myProviderApplication', user?.id] });
    },
    onError: (error) => {
      toast.error(`Failed to submit application: ${error.message}`);
    }
  });

  return {
    myApplication: myApplicationQuery.data,
    isLoadingMyApplication: myApplicationQuery.isLoading,
    
    allApplications: allApplicationsQuery.data || [],
    isLoadingAllApplications: allApplicationsQuery.isLoading,
    loadAllApplications: () => allApplicationsQuery.refetch(),
    refetch: () => allApplicationsQuery.refetch(),
    
    updateApplicationStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
    
    submitApplication: submitApplicationMutation.mutate,
    isSubmitting: submitApplicationMutation.isPending
  };
};

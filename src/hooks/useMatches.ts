
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Match } from '@/types/matches';

export { Match };

interface CreateMatchParams {
  providerId: string;
  message?: string;
}

interface UpdateMatchStatusParams {
  matchId: string;
  status: 'accepted' | 'declined';
}

export const useMatches = () => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch matches depending on user role
  const fetchMatches = async (): Promise<Match[]> => {
    if (!user || !profile) return [];

    try {
      let query;
      
      if (profile.role === 'founder') {
        query = supabase
          .from('matches')
          .select(`
            *,
            provider:provider_id(
              name:profiles(first_name, last_name, email, avatar_url),
              expertise:profiles(expertise)
            )
          `)
          .eq('founder_id', user.id);
      } else if (profile.role === 'provider') {
        query = supabase
          .from('matches')
          .select(`
            *,
            founder:founder_id(
              name:profiles(first_name, last_name, email, avatar_url, business_name)
            )
          `)
          .eq('provider_id', user.id);
      } else {
        return [];
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching matches:', error);
        toast.error('Failed to load matches');
        return [];
      }

      return data as Match[] || [];
    } catch (error) {
      console.error('Error in fetchMatches:', error);
      toast.error('An unexpected error occurred while loading matches');
      return [];
    }
  };

  // Create a match request as a founder
  const createMatch = async ({ providerId, message }: CreateMatchParams) => {
    if (!user || !profile || profile.role !== 'founder') {
      throw new Error('Only founders can create match requests');
    }

    try {
      const { data, error } = await supabase
        .from('matches')
        .insert({
          founder_id: user.id,
          provider_id: providerId,
          message,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating match:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in createMatch:', error);
      throw error;
    }
  };

  // Update match status (accept/decline)
  const updateMatchStatus = async ({ matchId, status }: UpdateMatchStatusParams) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('matches')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', matchId)
        .select()
        .single();

      if (error) {
        console.error('Error updating match status:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in updateMatchStatus:', error);
      throw error;
    }
  };

  // Query for fetching matches
  const matchesQuery = useQuery({
    queryKey: ['matches', user?.id],
    queryFn: fetchMatches,
    enabled: !!user,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation for creating matches
  const createMatchMutation = useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      toast.success('Match request sent successfully');
      queryClient.invalidateQueries({ queryKey: ['matches', user?.id] });
    },
    onError: (error: any) => {
      toast.error(`Failed to send match request: ${error.message || 'Unknown error'}`);
    }
  });

  // Mutation for updating match status
  const updateMatchMutation = useMutation({
    mutationFn: updateMatchStatus,
    onSuccess: (data) => {
      const action = data.status === 'accepted' ? 'accepted' : 'declined';
      toast.success(`Match request ${action} successfully`);
      queryClient.invalidateQueries({ queryKey: ['matches', user?.id] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update match: ${error.message || 'Unknown error'}`);
    }
  });

  return {
    matches: matchesQuery.data || [],
    isLoading: matchesQuery.isLoading,
    isError: matchesQuery.isError,
    error: matchesQuery.error,
    createMatch: createMatchMutation.mutate,
    isCreating: createMatchMutation.isPending,
    updateMatchStatus: updateMatchMutation.mutate,
    isUpdating: updateMatchMutation.isPending,
    refetch: matchesQuery.refetch
  };
};

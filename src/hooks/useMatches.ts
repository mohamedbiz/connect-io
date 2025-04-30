
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Type for a match between founder and provider
export interface Match {
  id: string;
  founder_id: string;
  provider_id: string;
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
  created_at: string;
  updated_at: string;
  // Extended provider data when joined
  provider?: {
    name: string;
    email: string;
    avatar_url?: string;
    expertise?: string;
  };
  // Extended founder data when joined
  founder?: {
    name: string;
    email: string;
    avatar_url?: string;
    business_name?: string;
  };
}

export const useMatches = () => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch matches depending on user role
  const fetchMatches = async (): Promise<Match[]> => {
    if (!user || !profile) return [];

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
      return [];
    }

    return data || [];
  };

  // Create a match request as a founder
  const createMatch = async ({ providerId, message }: { providerId: string; message?: string }) => {
    if (!user || !profile || profile.role !== 'founder') {
      throw new Error('Only founders can create match requests');
    }

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
  };

  // Update match status (accept/decline)
  const updateMatchStatus = async ({ matchId, status }: { matchId: string; status: 'accepted' | 'declined' }) => {
    if (!user) throw new Error('User not authenticated');

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
  };

  // Query for fetching matches
  const matchesQuery = useQuery({
    queryKey: ['matches', user?.id],
    queryFn: fetchMatches,
    enabled: !!user,
  });

  // Mutation for creating matches
  const createMatchMutation = useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      toast.success('Match request sent successfully');
      queryClient.invalidateQueries({ queryKey: ['matches', user?.id] });
    },
    onError: (error) => {
      toast.error(`Failed to send match request: ${error.message}`);
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
    onError: (error) => {
      toast.error(`Failed to update match: ${error.message}`);
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
    isUpdating: updateMatchMutation.isPending
  };
};

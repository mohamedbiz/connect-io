
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export const useMessages = (matchId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch messages for a specific match
  const fetchMessages = async (): Promise<Message[]> => {
    if (!user || !matchId) return [];

    const { data, error } = await supabase
      .from('direct_messages')
      .select('*')
      .eq('match_id', matchId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    // Mark messages as read if user is the receiver
    const unreadMessages = data?.filter(
      msg => msg.receiver_id === user.id && !msg.read
    );

    if (unreadMessages && unreadMessages.length > 0) {
      markMessagesAsRead(unreadMessages.map(msg => msg.id));
    }

    return data || [];
  };

  // Send a new message
  const sendMessage = async ({ receiverId, content }: { receiverId: string, content: string }) => {
    if (!user || !matchId) {
      throw new Error('User not authenticated or match not specified');
    }

    const { data, error } = await supabase
      .from('direct_messages')
      .insert({
        match_id: matchId,
        sender_id: user.id,
        receiver_id: receiverId,
        content
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }

    return data;
  };

  // Mark messages as read
  const markMessagesAsRead = async (messageIds: string[]) => {
    if (!user || messageIds.length === 0) return;

    const { error } = await supabase
      .from('direct_messages')
      .update({ read: true })
      .in('id', messageIds)
      .eq('receiver_id', user.id);

    if (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Get unread messages count
  const fetchUnreadCount = async (): Promise<number> => {
    if (!user) return 0;

    const { count, error } = await supabase
      .rpc('get_unread_messages_count', { user_id: user.id });

    if (error) {
      console.error('Error getting unread count:', error);
      return 0;
    }

    return count || 0;
  };

  // Queries and mutations
  const messagesQuery = useQuery({
    queryKey: ['messages', matchId],
    queryFn: fetchMessages,
    enabled: !!user && !!matchId,
  });

  const unreadCountQuery = useQuery({
    queryKey: ['unreadMessagesCount', user?.id],
    queryFn: fetchUnreadCount,
    enabled: !!user,
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', matchId] });
    },
    onError: (error) => {
      toast.error(`Failed to send message: ${error.message}`);
    }
  });

  return {
    messages: messagesQuery.data || [],
    isLoading: messagesQuery.isLoading,
    isError: messagesQuery.isError,
    error: messagesQuery.error,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
    unreadCount: unreadCountQuery.data || 0,
    refetch: messagesQuery.refetch
  };
};

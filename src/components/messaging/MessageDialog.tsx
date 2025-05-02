
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConversationView from './ConversationView';
import { useMessages } from '@/hooks/useMessages';
import { Match } from '@/hooks/useMatches';
import { useAuth } from '@/contexts/AuthContext';
import { X } from 'lucide-react';

interface MessageDialogProps {
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MessageDialog = ({ match, open, onOpenChange }: MessageDialogProps) => {
  const { user } = useAuth();
  const {
    messages,
    isLoading,
    sendMessage,
    isSending,
    refetch
  } = useMessages(match?.id);

  // Refresh messages when dialog opens
  useEffect(() => {
    if (open && match) {
      refetch();
    }
  }, [open, match, refetch]);

  const handleSendMessage = (content: string) => {
    if (!match || !user) return;
    
    const receiverId = user.id === match.founder_id 
      ? match.provider_id 
      : match.founder_id;
    
    sendMessage({ receiverId, content });
  };

  // Get other party name for the dialog title
  const getDialogTitle = () => {
    if (!match || !user) return 'Conversation';
    
    const otherParty = user.id === match.founder_id 
      ? match.provider 
      : match.founder;
    
    return `Chat with ${otherParty?.name || 'User'}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="bg-[#2D82B7]/10 p-4 border-b flex items-center justify-between">
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <button 
            onClick={() => onOpenChange(false)} 
            className="rounded-full p-1 hover:bg-gray-200 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </DialogHeader>
        
        {match && (
          <ConversationView
            match={match}
            messages={messages}
            isLoading={isLoading}
            isSending={isSending}
            onSendMessage={handleSendMessage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;


import React from 'react';
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
  } = useMessages(match?.id);

  const handleSendMessage = (content: string) => {
    if (!match || !user) return;
    
    const receiverId = user.id === match.founder_id 
      ? match.provider_id 
      : match.founder_id;
    
    sendMessage({ receiverId, content });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Conversation</DialogTitle>
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


import React, { useEffect, useRef } from 'react';
import { Message } from "@/hooks/useMessages";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { Match } from "@/hooks/useMatches";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ConversationViewProps {
  match: Match;
  messages: Message[];
  isLoading: boolean;
  isSending: boolean;
  onSendMessage: (content: string) => void;
}

const ConversationView = ({
  match,
  messages,
  isLoading,
  isSending,
  onSendMessage
}: ConversationViewProps) => {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Get other party profile (founder or provider)
  const otherParty = user?.id === match.founder_id
    ? match.provider
    : match.founder;

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Group messages by date for better visual separation
  const getMessageDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Get unique dates from messages
  const messageDates = [...new Set(messages.map(m => getMessageDate(m.created_at)))];

  return (
    <div className="flex flex-col h-[600px] max-h-[70vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef}>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 text-[#2D82B7] animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-gray-500">No messages yet</p>
            <p className="text-sm text-gray-400">
              Send a message to start the conversation
            </p>
          </div>
        ) : (
          <>
            {messageDates.map(date => (
              <div key={date} className="space-y-4">
                <div className="flex justify-center">
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                    {date}
                  </span>
                </div>
                
                {messages
                  .filter(message => getMessageDate(message.created_at) === date)
                  .map((message) => (
                    <MessageBubble
                      key={message.id}
                      content={message.content}
                      timestamp={message.created_at}
                      isSender={user?.id === message.sender_id}
                    />
                  ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="border-t p-3">
        <MessageInput 
          onSend={onSendMessage} 
          disabled={isSending}
          placeholder={`Message to ${otherParty?.name}...`}
        />
      </div>
    </div>
  );
};

export default ConversationView;

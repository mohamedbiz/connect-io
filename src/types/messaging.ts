
export interface Conversation {
  id: string;
  founder_id: string;
  provider_id: string;
  created_at: string;
  updated_at: string;
  founder?: Profile;
  provider?: Profile;
  last_message?: Message;
  unread_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read: boolean;
  created_at: string;
  sender?: Profile;
}

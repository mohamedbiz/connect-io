
import React from 'react';
import { cn } from "@/lib/utils";
import { format } from 'date-fns';

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isSender: boolean;
}

const MessageBubble = ({ content, timestamp, isSender }: MessageBubbleProps) => {
  return (
    <div className={cn(
      "flex flex-col max-w-[80%]",
      isSender ? "ml-auto items-end" : "mr-auto items-start"
    )}>
      <div className={cn(
        "rounded-lg px-4 py-2 shadow-sm",
        isSender 
          ? "bg-[#2D82B7] text-white rounded-br-none" 
          : "bg-gray-100 text-[#0E3366] rounded-bl-none"
      )}>
        <p className="whitespace-pre-wrap break-words">{content}</p>
      </div>
      <time className="text-xs text-gray-500 mt-1">
        {format(new Date(timestamp), 'MMM d, h:mm a')}
      </time>
    </div>
  );
};

export default MessageBubble;

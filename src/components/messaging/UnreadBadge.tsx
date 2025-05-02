
import React from 'react';
import { useMessages } from '@/hooks/useMessages';
import { cn } from '@/lib/utils';

interface UnreadBadgeProps {
  count?: number;
  className?: string;
}

const UnreadBadge = ({ count, className }: UnreadBadgeProps) => {
  const { unreadCount } = useMessages();
  const displayCount = count ?? unreadCount;
  
  if (!displayCount) return null;
  
  return (
    <span 
      className={cn(
        "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center",
        className
      )}
    >
      {displayCount > 9 ? '9+' : displayCount}
    </span>
  );
};

export default UnreadBadge;

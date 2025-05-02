
import React from 'react';
import { useMessages } from '@/hooks/useMessages';
import { cn } from '@/lib/utils';

interface UnreadBadgeProps {
  count?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg'; 
  showZero?: boolean;
  maxCount?: number;
}

const UnreadBadge = ({ 
  count, 
  className,
  size = 'md',
  showZero = false,
  maxCount = 9
}: UnreadBadgeProps) => {
  const { unreadCount } = useMessages();
  const displayCount = count ?? unreadCount;
  
  if (!showZero && !displayCount) return null;
  
  const sizeClasses = {
    sm: "h-4 w-4 text-[10px]",
    md: "h-5 w-5 text-xs",
    lg: "h-6 w-6 text-sm"
  };
  
  return (
    <span 
      className={cn(
        "absolute -top-1 -right-1 bg-red-500 text-white rounded-full flex items-center justify-center",
        sizeClasses[size],
        className
      )}
      aria-label={`${displayCount} unread messages`}
    >
      {displayCount > maxCount ? `${maxCount}+` : displayCount}
    </span>
  );
};

export default UnreadBadge;

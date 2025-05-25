
import React from 'react';
import { Badge } from './badge';
import { Star } from 'lucide-react';

interface FeaturedBadgeProps {
  className?: string;
  size?: 'sm' | 'md';
}

const FeaturedBadge = ({ className, size = 'sm' }: FeaturedBadgeProps) => {
  return (
    <Badge 
      variant="featured" 
      className={`${className} ${size === 'sm' ? 'text-xs' : 'text-sm'} font-bold`}
    >
      <Star className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} mr-1 fill-current`} />
      Featured
    </Badge>
  );
};

export default FeaturedBadge;

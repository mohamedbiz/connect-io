
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted shimmer",
  {
    variants: {
      variant: {
        default: "",
        text: "h-4",
        heading: "h-6",
        button: "h-10",
        card: "h-32",
        avatar: "rounded-full",
        image: "aspect-video",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function LoadingSkeleton({
  className,
  variant,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  )
}

// Predefined skeleton components
function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <LoadingSkeleton 
          key={i} 
          variant="text" 
          className={i === lines - 1 ? "w-3/4" : "w-full"} 
        />
      ))}
    </div>
  )
}

function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 space-y-4", className)}>
      <LoadingSkeleton variant="heading" className="w-3/4" />
      <TextSkeleton lines={2} />
      <LoadingSkeleton variant="button" className="w-32" />
    </div>
  )
}

function AvatarSkeleton({ size = "default", className }: { size?: "sm" | "default" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    default: "w-10 h-10",
    lg: "w-16 h-16"
  }
  
  return (
    <LoadingSkeleton 
      variant="avatar" 
      className={cn(sizeClasses[size], className)} 
    />
  )
}

function ListSkeleton({ items = 3, className }: { items?: number; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <AvatarSkeleton />
          <div className="flex-1 space-y-2">
            <LoadingSkeleton variant="text" className="w-1/4" />
            <LoadingSkeleton variant="text" className="w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export { 
  LoadingSkeleton, 
  TextSkeleton, 
  CardSkeleton, 
  AvatarSkeleton, 
  ListSkeleton,
  skeletonVariants 
}

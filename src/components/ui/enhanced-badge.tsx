
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const enhancedBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-current",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
        warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        info: "border-transparent bg-info text-info-foreground hover:bg-info/80",
        featured: "border-transparent bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-lg",
        glass: "border-white/20 bg-white/10 backdrop-blur-md text-foreground hover:bg-white/20",
        priority: "border-transparent text-white font-bold shadow-sm",
        status: "border-transparent text-white font-medium",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      priority: {
        high: "bg-red-500 hover:bg-red-600",
        medium: "bg-warning hover:bg-warning/80", 
        low: "bg-success hover:bg-success/80",
      },
      status: {
        online: "bg-success",
        offline: "bg-gray-500",
        busy: "bg-warning",
        away: "bg-yellow-500",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface EnhancedBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof enhancedBadgeVariants> {
  pulse?: boolean
  icon?: React.ReactNode
}

function EnhancedBadge({ 
  className, 
  variant, 
  size, 
  priority, 
  status, 
  pulse, 
  icon, 
  children, 
  ...props 
}: EnhancedBadgeProps) {
  return (
    <div 
      className={cn(
        enhancedBadgeVariants({ variant, size, priority, status }), 
        pulse && "animate-pulse-soft",
        className
      )} 
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
      {pulse && variant === "status" && (
        <span className="ml-1 flex h-2 w-2">
          <span className={cn(
            "animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75",
            status === "online" && "bg-success",
            status === "busy" && "bg-warning",
            status === "away" && "bg-yellow-500"
          )} />
          <span className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            status === "online" && "bg-success",
            status === "busy" && "bg-warning", 
            status === "away" && "bg-yellow-500"
          )} />
        </span>
      )}
    </div>
  )
}

export { EnhancedBadge, enhancedBadgeVariants }

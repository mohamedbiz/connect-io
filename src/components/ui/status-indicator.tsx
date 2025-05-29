
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2",
  {
    variants: {
      variant: {
        dot: "",
        badge: "px-2 py-1 rounded-full text-xs font-medium",
        pill: "px-3 py-1 rounded-full text-sm font-medium",
      },
      status: {
        online: "",
        offline: "",
        busy: "",
        away: "",
        success: "",
        warning: "",
        error: "",
        pending: "",
      }
    },
    defaultVariants: {
      variant: "dot",
      status: "online",
    },
  }
)

const dotVariants = cva(
  "rounded-full",
  {
    variants: {
      size: {
        sm: "w-2 h-2",
        default: "w-3 h-3",
        lg: "w-4 h-4",
      },
      status: {
        online: "bg-success-500",
        offline: "bg-gray-400",
        busy: "bg-red-500",
        away: "bg-warning-500",
        success: "bg-success-500",
        warning: "bg-warning-500",
        error: "bg-red-500",
        pending: "bg-blue-500",
      },
      pulse: {
        true: "animate-pulse-soft",
        false: "",
      }
    },
    defaultVariants: {
      size: "default",
      status: "online",
      pulse: false,
    },
  }
)

const badgeVariants = cva(
  "",
  {
    variants: {
      status: {
        online: "bg-success-50 text-success-700 border border-success-200",
        offline: "bg-gray-50 text-gray-700 border border-gray-200",
        busy: "bg-red-50 text-red-700 border border-red-200",
        away: "bg-warning-50 text-warning-700 border border-warning-200",
        success: "bg-success-50 text-success-700 border border-success-200",
        warning: "bg-warning-50 text-warning-700 border border-warning-200",
        error: "bg-red-50 text-red-700 border border-red-200",
        pending: "bg-blue-50 text-blue-700 border border-blue-200",
      }
    },
    defaultVariants: {
      status: "online",
    },
  }
)

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> {
  size?: "sm" | "default" | "lg"
  pulse?: boolean
  label?: string
}

function StatusIndicator({ 
  className, 
  variant, 
  status, 
  size = "default",
  pulse = false,
  label,
  ...props 
}: StatusIndicatorProps) {
  if (variant === "dot") {
    return (
      <div className={cn(statusIndicatorVariants({ variant }), className)} {...props}>
        <div className={cn(dotVariants({ size, status, pulse }))} />
        {label && <span className="text-sm text-muted-foreground">{label}</span>}
      </div>
    )
  }

  return (
    <div 
      className={cn(
        statusIndicatorVariants({ variant }), 
        badgeVariants({ status }),
        className
      )} 
      {...props}
    >
      {variant !== "dot" && (
        <div className={cn(dotVariants({ size: "sm", status }))} />
      )}
      {label}
    </div>
  )
}

// Predefined status components
function OnlineStatus({ pulse = true }: { pulse?: boolean }) {
  return <StatusIndicator status="online" pulse={pulse} label="Online" />
}

function OfflineStatus() {
  return <StatusIndicator status="offline" label="Offline" />
}

function BusyStatus({ pulse = true }: { pulse?: boolean }) {
  return <StatusIndicator status="busy" pulse={pulse} label="Busy" />
}

function AwayStatus() {
  return <StatusIndicator status="away" label="Away" />
}

export { 
  StatusIndicator, 
  OnlineStatus, 
  OfflineStatus, 
  BusyStatus, 
  AwayStatus,
  statusIndicatorVariants 
}

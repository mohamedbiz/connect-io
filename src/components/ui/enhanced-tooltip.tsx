
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-md",
        dark: "bg-gray-900 text-white border border-gray-700 shadow-lg",
        light: "bg-white text-gray-900 border border-gray-200 shadow-lg",
        success: "bg-success text-success-foreground shadow-md",
        warning: "bg-warning text-warning-foreground shadow-md",
        destructive: "bg-destructive text-destructive-foreground shadow-md",
        glass: "bg-white/90 backdrop-blur-md border border-white/20 text-gray-900 shadow-glass",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & 
  VariantProps<typeof tooltipContentVariants>
>(({ className, variant, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentVariants({ variant }), className)}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Enhanced Tooltip component with better defaults
interface EnhancedTooltipProps {
  content: React.ReactNode
  variant?: VariantProps<typeof tooltipContentVariants>["variant"]
  side?: "top" | "right" | "bottom" | "left"
  delayDuration?: number
  children: React.ReactNode
  className?: string
}

function EnhancedTooltip({ 
  content, 
  variant = "default", 
  side = "top", 
  delayDuration = 200,
  children,
  className
}: EnhancedTooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent variant={variant} side={side} className={className}>
          {content}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}

export { 
  TooltipProvider, 
  TooltipRoot as Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  EnhancedTooltip,
  tooltipContentVariants 
}

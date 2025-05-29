
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader } from "lucide-react"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      variant: {
        default: "text-primary",
        muted: "text-muted-foreground",
        white: "text-white",
        success: "text-success",
        warning: "text-warning",
        destructive: "text-destructive",
      },
      size: {
        sm: "h-4 w-4",
        default: "h-6 w-6", 
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LoadingSpinnerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  text?: string
}

function LoadingSpinner({ 
  className, 
  variant, 
  size, 
  text,
  ...props 
}: LoadingSpinnerProps) {
  return (
    <div 
      className={cn("flex items-center justify-center gap-2", className)} 
      {...props}
    >
      <Loader className={cn(spinnerVariants({ variant, size }))} />
      {text && (
        <span className={cn(
          "text-sm",
          variant === "white" ? "text-white" : "text-muted-foreground"
        )}>
          {text}
        </span>
      )}
    </div>
  )
}

// Predefined loading states
function FullPageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <LoadingSpinner size="xl" text={text} />
    </div>
  )
}

function InlineLoader({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner text={text} />
    </div>
  )
}

function ButtonLoader() {
  return <LoadingSpinner size="sm" variant="white" />
}

export { 
  LoadingSpinner, 
  FullPageLoader, 
  InlineLoader, 
  ButtonLoader,
  spinnerVariants 
}

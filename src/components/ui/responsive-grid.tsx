
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const gridVariants = cva(
  "grid gap-6",
  {
    variants: {
      variant: {
        responsive: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        auto: "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]",
        fixed: "grid-cols-4",
        masonry: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4",
      },
      gap: {
        sm: "gap-4",
        default: "gap-6",
        lg: "gap-8",
        xl: "gap-12",
      }
    },
    defaultVariants: {
      variant: "responsive",
      gap: "default",
    },
  }
)

export interface ResponsiveGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  minItemWidth?: string
}

const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  ({ className, variant, gap, minItemWidth, style, ...props }, ref) => {
    const gridStyle = variant === "auto" && minItemWidth 
      ? { 
          ...style,
          gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
        }
      : style

    return (
      <div
        ref={ref}
        className={cn(gridVariants({ variant, gap }), className)}
        style={gridStyle}
        {...props}
      />
    )
  }
)
ResponsiveGrid.displayName = "ResponsiveGrid"

// Predefined grid layouts
function CardGrid({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ResponsiveGrid 
      variant="responsive" 
      gap="lg" 
      className={cn("", className)} 
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}

function AutoGrid({ 
  children, 
  minItemWidth = "300px", 
  className, 
  ...props 
}: ResponsiveGridProps) {
  return (
    <ResponsiveGrid 
      variant="auto" 
      minItemWidth={minItemWidth}
      className={className} 
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}

function MasonryGrid({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6", className)} 
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="break-inside-avoid mb-6">
          {child}
        </div>
      ))}
    </div>
  )
}

export { ResponsiveGrid, CardGrid, AutoGrid, MasonryGrid, gridVariants }


import * as React from "react"
import { cn } from "@/lib/utils"

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className, 
  delay = 0, 
  staggerDelay = 100 
}: StaggerContainerProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={containerRef} className={cn("", className)}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={cn(
            "opacity-0 translate-y-4 transition-all duration-600 ease-out",
            isVisible && "opacity-100 translate-y-0"
          )}
          style={{
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : '0ms'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Predefined stagger animations
export function StaggerList({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <StaggerContainer className={cn("space-y-4", className)}>
      {children}
    </StaggerContainer>
  )
}

export function StaggerGrid({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <StaggerContainer className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {children}
    </StaggerContainer>
  )
}


import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface QualificationPageLoaderProps {
  message?: string;
}

const QualificationPageLoader = ({ message = "Loading qualification..." }: QualificationPageLoaderProps) => {
  const [progress, setProgress] = useState(10);
  
  useEffect(() => {
    // Create a loading animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <Loader2 className="h-12 w-12 animate-spin text-[#2D82B7] mx-auto mb-4" />
      <h3 className="text-xl font-medium text-[#0A2342] mb-4">{message}</h3>
      <div className="w-full h-2 mb-6">
        <Progress value={progress} className="w-full h-2" />
      </div>
      <p className="text-sm text-[#0E3366]/70">
        This should only take a moment...
      </p>
    </div>
  );
};

export default QualificationPageLoader;

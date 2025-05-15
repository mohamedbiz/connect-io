
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface WelcomeBannerProps {
  firstName?: string;
  isDismissible?: boolean;
  onGetStarted?: () => void;
}

const WelcomeBanner = ({
  firstName = "",
  isDismissible = true,
  onGetStarted
}: WelcomeBannerProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-[#2D82B7] to-[#1E5F8B] text-white p-6 rounded-lg mb-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
      
      {isDismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          {firstName ? `Welcome, ${firstName}!` : 'Welcome to Connect!'}
        </h2>
        
        <p className="text-white/90 max-w-2xl mb-4">
          You're now part of a community connecting e-commerce businesses with top email marketing experts. 
          Let's get you started on the right path to grow your business.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={onGetStarted}
            className="bg-white text-[#2D82B7] hover:bg-white/90"
          >
            Get Started
          </Button>
          
          <Button
            variant="outline"
            className="text-white border-white/30 hover:bg-white/10 hover:text-white"
          >
            Take a Tour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;

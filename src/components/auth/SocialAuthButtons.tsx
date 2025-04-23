
import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type SocialAuthButtonsProps = {
  handleOAuth: (provider: "google" | "github" | "twitter") => Promise<void>;
  loading: boolean;
};

const SocialAuthButtons = ({ handleOAuth, loading }: SocialAuthButtonsProps) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isTwitterLoading, setIsTwitterLoading] = useState(false);
  
  const handleSocialAuth = async (provider: "google" | "github" | "twitter") => {
    try {
      // Set the specific provider loading state
      if (provider === "google") setIsGoogleLoading(true);
      if (provider === "github") setIsGithubLoading(true);
      if (provider === "twitter") setIsTwitterLoading(true);
      
      // Call the OAuth handler
      await handleOAuth(provider);
    } catch (error) {
      console.error(`Error with ${provider} auth:`, error);
      toast.error(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      // Reset loading state
      if (provider === "google") setIsGoogleLoading(false);
      if (provider === "github") setIsGithubLoading(false);
      if (provider === "twitter") setIsTwitterLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialAuth("google")} 
        type="button" 
        disabled={loading || isGoogleLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 488 512">
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
        </svg>
        {isGoogleLoading ? "Connecting..." : "Continue with Google"}
      </Button>
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialAuth("github")} 
        type="button" 
        disabled={loading || isGithubLoading}
      >
        <Github className="mr-2 h-4 w-4" /> 
        {isGithubLoading ? "Connecting..." : "Continue with GitHub"}
      </Button>
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialAuth("twitter")} 
        type="button" 
        disabled={loading || isTwitterLoading}
      >
        <Twitter className="mr-2 h-4 w-4" /> 
        {isTwitterLoading ? "Connecting..." : "Continue with Twitter"}
      </Button>
    </div>
  );
};

export default SocialAuthButtons;

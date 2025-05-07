
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProfileCreationSectionProps {
  handleManualProfileCreation: () => Promise<void>;
  creatingProfile: boolean;
}

const ProfileCreationSection = ({ 
  handleManualProfileCreation,
  creatingProfile
}: ProfileCreationSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-[60vh] flex-col max-w-lg mx-auto">
      <Alert className="bg-amber-50 border-amber-300 mb-4">
        <AlertCircle className="h-5 w-5 text-amber-800" />
        <AlertTitle className="text-amber-800">Profile Loading Issue</AlertTitle>
        <AlertDescription className="text-amber-700">
          We're having trouble loading your profile. This is needed to continue with qualification.
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col gap-3">
        <Button 
          onClick={handleManualProfileCreation}
          className="bg-[#2D82B7] hover:bg-[#3D9AD1] w-full"
          disabled={creatingProfile}
        >
          {creatingProfile ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating Profile...
            </>
          ) : (
            "Create Profile Now"
          )}
        </Button>
        
        <Button 
          onClick={() => {
            toast.info("Reloading page to retrieve your profile...");
            setTimeout(() => window.location.reload(), 500);
          }}
          variant="outline"
          className="w-full"
          disabled={creatingProfile}
        >
          Retry Loading Profile
        </Button>
        
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="text-[#0E3366]/70 w-full"
          disabled={creatingProfile}
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default ProfileCreationSection;

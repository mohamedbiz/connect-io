
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Alert variant="warning" className="mb-6 bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-800">Profile Setup Required</AlertTitle>
        <AlertDescription className="text-amber-700">
          We need to create your profile before continuing with the qualification process.
        </AlertDescription>
      </Alert>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
        <h2 className="text-xl font-semibold text-[#0A2342] mb-4">Let's Set Up Your Profile</h2>
        <p className="text-[#0E3366] mb-6">
          We need to create a profile for you before you can complete the qualification process.
          This will only take a moment.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={handleManualProfileCreation}
            disabled={creatingProfile}
            className="bg-[#2D82B7] hover:bg-[#3D9AD1]"
          >
            {creatingProfile ? "Creating Profile..." : "Create My Profile"}
          </Button>
          
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationSection;

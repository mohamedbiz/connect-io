
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
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
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleCreateProfile = async () => {
    try {
      await handleManualProfileCreation();
      setIsSuccess(true);
      
      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate("/founder-qualification");
      }, 2000);
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {isSuccess ? (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-800">Profile Created Successfully!</AlertTitle>
          <AlertDescription className="text-green-700">
            Your profile has been created. You'll be redirected to the qualification page shortly.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="warning" className="mb-6 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-800">Profile Setup Required</AlertTitle>
          <AlertDescription className="text-amber-700">
            We need to create your profile before continuing with the qualification process.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-[#0A2342] mb-4">Let's Set Up Your Profile</h2>
        
        <div className="space-y-4 mb-6">
          <p className="text-[#0E3366]">
            Welcome to Connect! We need to create a profile for you before you can complete the qualification process.
            This will only take a moment.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <p className="text-sm text-blue-800">
              <strong>Why this matters:</strong> Your profile helps us match you with the right email marketing providers 
              based on your business needs and goals.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={handleCreateProfile}
            disabled={creatingProfile || isSuccess}
            className="bg-[#2D82B7] hover:bg-[#3D9AD1] flex items-center gap-2"
          >
            {creatingProfile ? "Creating Profile..." : "Create My Profile"}
            {!creatingProfile && <ArrowRight className="h-4 w-4" />}
          </Button>
          
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            disabled={creatingProfile || isSuccess}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationSection;

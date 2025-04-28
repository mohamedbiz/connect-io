
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AcquisitionProvider } from "./acquisition/AcquisitionContext";
import { AcquisitionProgress } from "./acquisition/AcquisitionProgress";
import { AcquisitionStep } from "./acquisition/AcquisitionStep";
import { AcquisitionNavigation } from "./acquisition/AcquisitionNavigation";
import { LoginAlert } from "./acquisition/LoginAlert";
import { useAuth } from "@/contexts/AuthContext";

const ClientAcquisitionForm = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(!user);

  const handleSubmit = async () => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    
    try {
      // Here you would handle the submission of the form data
      // For now, we'll just show a success toast
      toast({
        title: "Success!",
        description: "Your client acquisition package has been created.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem generating your client package. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg border">
      <AcquisitionProvider>
        {showLoginAlert && <LoginAlert onClose={() => setShowLoginAlert(false)} />}
        <AcquisitionProgress />
        <AcquisitionStep />
        <AcquisitionNavigation handleSubmit={handleSubmit} />
      </AcquisitionProvider>
    </div>
  );
};

export default ClientAcquisitionForm;

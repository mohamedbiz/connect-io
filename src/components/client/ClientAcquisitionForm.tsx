
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AcquisitionProvider } from "./acquisition/AcquisitionContext";
import { MatchingProgress } from "./matching/MatchingProgress";
import { MatchingStep } from "./matching/MatchingStep";
import { MatchingNavigation } from "./matching/MatchingNavigation";
import { LoginAlert } from "./acquisition/LoginAlert";
import { useAuth } from "@/contexts/AuthContext";

interface ClientAcquisitionFormProps {
  onComplete: () => Promise<void>;
}

const ClientAcquisitionForm = ({ onComplete }: ClientAcquisitionFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(!user);

  const handleSubmit = async () => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    
    try {
      // Call the onComplete callback passed from parent
      await onComplete();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem processing your assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg border">
      <AcquisitionProvider>
        {showLoginAlert && <LoginAlert onClose={() => setShowLoginAlert(false)} />}
        <MatchingProgress />
        <MatchingStep />
        <MatchingNavigation handleSubmit={handleSubmit} />
      </AcquisitionProvider>
    </div>
  );
};

export default ClientAcquisitionForm;

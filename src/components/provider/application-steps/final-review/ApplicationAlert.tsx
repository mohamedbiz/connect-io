
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";
import { isSectionComplete } from "./reviewUtils";

interface ApplicationAlertProps {
  formData: ProviderApplicationFormData;
}

export const ApplicationAlert = ({ formData }: ApplicationAlertProps) => {
  const hasIncompleteSection = 
    !isSectionComplete("personal", formData) || 
    !isSectionComplete("professional", formData) || 
    !isSectionComplete("expertise", formData) || 
    !isSectionComplete("caseStudies", formData) || 
    !isSectionComplete("workApproach", formData);
  
  if (!hasIncompleteSection) return null;
  
  return (
    <Alert variant="destructive" className="mt-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Incomplete Application</AlertTitle>
      <AlertDescription>
        Please go back and complete all required fields before submitting your application.
      </AlertDescription>
    </Alert>
  );
};

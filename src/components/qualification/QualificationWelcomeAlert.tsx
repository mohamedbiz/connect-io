
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const QualificationWelcomeAlert = () => {
  return (
    <Alert className="mb-6 bg-blue-50 border-blue-200">
      <AlertCircle className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-800">Welcome to Qualification</AlertTitle>
      <AlertDescription className="text-blue-700">
        This quick questionnaire helps us match you with the right service providers. 
        Your answers will be used to find providers who can best meet your specific needs.
      </AlertDescription>
    </Alert>
  );
};

export default QualificationWelcomeAlert;

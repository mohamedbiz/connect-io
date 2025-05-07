
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const QualificationWelcomeAlert = () => {
  return (
    <Alert className="max-w-3xl mx-auto mb-6 bg-blue-50 border-blue-200">
      <Info className="h-5 w-5 text-blue-500" />
      <AlertTitle className="text-blue-800">Welcome to Connect!</AlertTitle>
      <AlertDescription className="text-blue-700">
        Before you can access your dashboard, please complete this qualification process. 
        This helps us better understand your business and match you with the most suitable providers.
      </AlertDescription>
    </Alert>
  );
};

export default QualificationWelcomeAlert;

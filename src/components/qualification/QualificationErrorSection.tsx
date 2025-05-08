
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const QualificationErrorSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Loading Qualification</AlertTitle>
        <AlertDescription>
          There was a problem loading your qualification data. Please try again later.
        </AlertDescription>
      </Alert>
      
      <div className="text-center mt-8">
        <Button 
          onClick={() => navigate("/founder-dashboard")}
          variant="outline"
          className="mr-4"
        >
          Return to Dashboard
        </Button>
        
        <Button 
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default QualificationErrorSection;

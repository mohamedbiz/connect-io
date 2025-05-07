
import { Alert, AlertCircle, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const QualificationErrorSection = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] flex-col max-w-lg mx-auto">
      <Alert className="bg-red-50 border-red-300 mb-4">
        <AlertCircle className="h-5 w-5 text-red-800" />
        <AlertTitle className="text-red-800">Qualification Check Error</AlertTitle>
        <AlertDescription className="text-red-700">
          We encountered an error checking your qualification status. Please try again.
        </AlertDescription>
      </Alert>
      
      <Button 
        onClick={() => window.location.reload()}
        className="bg-[#2D82B7] hover:bg-[#3D9AD1] w-full"
      >
        Retry
      </Button>
    </div>
  );
};

export default QualificationErrorSection;

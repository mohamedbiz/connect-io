
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QualificationBannerProps {
  isQualified: boolean;
  isLoading: boolean;
}

const QualificationBanner = ({ isQualified, isLoading }: QualificationBannerProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <Loader2 className="h-5 w-5 text-blue-500 animate-spin mr-2" />
        <AlertTitle className="text-blue-800">Checking qualification status...</AlertTitle>
      </Alert>
    );
  }

  if (isQualified) {
    return (
      <Alert className="mb-6 bg-green-50 border-green-200">
        <CheckCircle2 className="h-5 w-5 text-green-500" />
        <AlertTitle className="text-green-800">Qualification Complete</AlertTitle>
        <AlertDescription className="text-green-700">
          Your business has been qualified. You'll receive better provider matches.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-6 bg-amber-50 border-amber-200">
      <AlertCircle className="h-5 w-5 text-amber-500" />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
        <div>
          <AlertTitle className="text-amber-800">Qualification Required</AlertTitle>
          <AlertDescription className="text-amber-700">
            Please complete your business qualification to fully access your dashboard and get matched with suitable providers.
          </AlertDescription>
        </div>
        <Button 
          onClick={() => navigate("/founder-qualification")}
          className="mt-3 md:mt-0 bg-amber-500 hover:bg-amber-600 text-white"
        >
          Complete Qualification
        </Button>
      </div>
    </Alert>
  );
};

export default QualificationBanner;

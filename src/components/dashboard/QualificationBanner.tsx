
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QualificationBannerProps {
  isQualified: boolean;
  isLoading: boolean;
}

const QualificationBanner = ({ isQualified, isLoading }: QualificationBannerProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return null;
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
          <AlertTitle className="text-amber-800">Qualification Recommended</AlertTitle>
          <AlertDescription className="text-amber-700">
            Complete your business qualification to get matched with the most suitable providers.
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

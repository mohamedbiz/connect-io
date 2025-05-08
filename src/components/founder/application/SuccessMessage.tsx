
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SuccessMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-[#0A2342] mb-2">Application Submitted Successfully!</h2>
      
      <p className="text-[#0E3366] max-w-lg mb-6">
        Thank you for your founder application. We've received your information and will use it to help match you with the right email marketing providers.
      </p>
      
      <p className="text-[#0E3366] font-medium mb-8">
        Next step: Complete the qualification process to get personalized recommendations.
      </p>
      
      <Button 
        onClick={() => navigate("/founder-qualification")}
        className="bg-[#2D82B7] hover:bg-[#3D9AD1]"
      >
        Continue to Qualification
      </Button>
    </div>
  );
};

export default SuccessMessage;


import { Button } from "@/components/ui/button";
import { CheckCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ClientAcquisitionSuccess = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Acquisition Process Complete!</h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for completing the client acquisition process. Our team will review your information 
          and match you with the best providers for your needs within the next few hours.
        </p>
        
        <div className="bg-gray-50 border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">What happens next?</h2>
          <ul className="text-left text-gray-600 space-y-3">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">1</span>
              <span>Our team reviews your client acquisition details</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">2</span>
              <span>We match you with email marketing specialists that best fit your needs</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">3</span>
              <span>You'll receive notification with your matches within a few hours</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/founder-dashboard">
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link to="/client-acquisition">
              <Users className="h-4 w-4 mr-2" />
              Review Acquisition Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientAcquisitionSuccess;

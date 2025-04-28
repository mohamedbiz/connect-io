
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
        
        <h1 className="text-3xl font-bold mb-4">Assessment Complete!</h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for completing the provider matching assessment. Our team will carefully 
          review your needs and match you with the best email marketing specialists for your business.
        </p>
        
        <div className="bg-gray-50 border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">What happens next?</h2>
          <ul className="text-left text-gray-600 space-y-3">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">1</span>
              <span>Our team reviews your business needs and email marketing goals</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">2</span>
              <span>We match you with email marketing specialists based on your specific requirements</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">3</span>
              <span>You'll receive your provider matches within 24-48 hours via email</span>
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
              Review My Assessment
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientAcquisitionSuccess;

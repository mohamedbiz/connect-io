
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LoginAlertProps {
  isLoggedIn: boolean;
}

const LoginAlert = ({ isLoggedIn }: LoginAlertProps) => {
  const navigate = useNavigate();

  if (isLoggedIn) return null;

  return (
    <Alert className="mb-6 bg-amber-50 border-amber-200">
      <AlertCircle className="h-5 w-5 text-amber-500" />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
        <div>
          <AlertTitle className="text-amber-800">Authentication Required</AlertTitle>
          <AlertDescription className="text-amber-700">
            You need to be logged in to submit a founder application. Please log in or create an account.
          </AlertDescription>
        </div>
        <Button 
          onClick={() => navigate("/auth?register=true&type=founder")}
          className="mt-3 md:mt-0 bg-amber-500 hover:bg-amber-600 text-white"
        >
          Log In / Sign Up
        </Button>
      </div>
    </Alert>
  );
};

export default LoginAlert;

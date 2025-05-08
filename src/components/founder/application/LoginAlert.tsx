
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface LoginAlertProps {
  isLoggedIn: boolean;
}

const LoginAlert = ({ isLoggedIn }: LoginAlertProps) => {
  if (isLoggedIn) return null;
  
  return (
    <Alert variant="warning" className="mb-6 bg-amber-50 border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-800">Authentication Required</AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-4 text-amber-700">
        <div>You need to be logged in to submit your application.</div>
        <Button asChild variant="outline" className="border-amber-400 text-amber-700 hover:text-amber-800 hover:bg-amber-100">
          <Link to="/auth?register=true&type=founder">
            Sign in or Register
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default LoginAlert;

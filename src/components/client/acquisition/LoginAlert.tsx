
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface LoginAlertProps {
  onClose: () => void;
}

export const LoginAlert = ({ onClose }: LoginAlertProps) => {
  return (
    <Alert className="mb-6 pr-12 relative">
      <AlertTitle className="text-base">Login Required</AlertTitle>
      <AlertDescription className="text-sm">
        You need to be logged in to save your progress and generate client acquisition materials.
        <div className="flex gap-4 mt-2">
          <Button variant="default" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </AlertDescription>
      <Button
        size="sm"
        variant="ghost"
        className="absolute right-2 top-2 h-6 w-6 p-0"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </Alert>
  );
};

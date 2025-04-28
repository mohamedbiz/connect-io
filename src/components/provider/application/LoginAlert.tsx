
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface LoginAlertProps {
  isLoggedIn: boolean;
}

export const LoginAlert = ({ isLoggedIn }: LoginAlertProps) => {
  if (isLoggedIn) return null;
  
  return (
    <Card className="mb-6 p-4 bg-amber-50 border-amber-200">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-800">Login Required</h3>
          <p className="text-amber-700 text-sm mt-1">
            You need to be logged in to submit your provider application. Please{" "}
            <a href="/auth" className="text-primary underline font-medium">
              sign in
            </a>{" "}
            or create an account first.
          </p>
        </div>
      </div>
    </Card>
  );
};

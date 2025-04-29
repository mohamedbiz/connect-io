
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export const LoginAlert = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (isLoggedIn) return null;

  return (
    <Card className="p-4 mb-6 flex items-center gap-3 bg-[#0E3366] border-[#2D82B7] text-white">
      <AlertTriangle className="h-5 w-5 text-[#BFD7ED]" />
      <div className="flex-1">
        <p className="text-[#BFD7ED]">
          Please <Link to="/auth" className="font-medium underline text-white hover:text-[#2D82B7] transition-colors">sign in</Link> to submit your application. Your progress will be saved.
        </p>
      </div>
    </Card>
  );
};

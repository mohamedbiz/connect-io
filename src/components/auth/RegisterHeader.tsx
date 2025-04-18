
import { Briefcase } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterHeader = () => {
  return (
    <CardHeader className="text-center">
      <div className="flex justify-center mb-2">
        <Briefcase className="h-8 w-8 text-primary" />
      </div>
      <CardTitle className="text-2xl">Create an account</CardTitle>
      <CardDescription>
        Join Connect to grow your business
      </CardDescription>
    </CardHeader>
  );
};

export default RegisterHeader;

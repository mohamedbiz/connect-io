
import { Briefcase } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type AuthHeaderProps = { isRegister: boolean };

export default function AuthHeader({ isRegister }: AuthHeaderProps) {
  return (
    <CardHeader className="text-center">
      <div className="flex justify-center mb-2">
        <Briefcase className="h-8 w-8 text-primary" />
      </div>
      <CardTitle className="text-2xl">{isRegister ? "Create your account" : "Login to Connect"}</CardTitle>
      <CardDescription>
        {isRegister ? "Sign up to start using Connect" : "Sign in with email or social provider"}
      </CardDescription>
    </CardHeader>
  );
}

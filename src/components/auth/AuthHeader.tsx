
import { Briefcase } from "lucide-react";

type AuthHeaderProps = {
  isRegister: boolean;
};

const AuthHeader = ({ isRegister }: AuthHeaderProps) => {
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center mb-2">
        <div className="bg-[#0A2342] p-3 rounded-full">
          <Briefcase className="h-6 w-6 text-[#2D82B7]" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-[#0A2342]">
        {isRegister ? "Create your Connect account" : "Welcome back"}
      </h1>
      <p className="text-[#0E3366] mt-2">
        {isRegister
          ? "Join the platform that guarantees results"
          : "Sign in to your Connect account"}
      </p>
    </div>
  );
};

export default AuthHeader;

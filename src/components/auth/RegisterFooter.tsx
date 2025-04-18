
import { Link } from "react-router-dom";
import { CardFooter } from "@/components/ui/card";

const RegisterFooter = () => {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </CardFooter>
  );
};

export default RegisterFooter;

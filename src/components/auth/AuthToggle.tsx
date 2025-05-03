
import React from "react";

type AuthToggleProps = {
  isRegister: boolean;
  toggleAuth: () => void;
};

const AuthToggle = ({ isRegister, toggleAuth }: AuthToggleProps) => {
  return (
    <div className="mt-4 text-center">
      {isRegister ? (
        <span>
          Already have an account?{" "}
          <button className="text-[#2D82B7] hover:text-[#3D9AD1] transition-colors hover:underline" onClick={toggleAuth} type="button">
            Sign In
          </button>
        </span>
      ) : (
        <span>
          Need an account?{" "}
          <button className="text-[#2D82B7] hover:text-[#3D9AD1] transition-colors hover:underline" onClick={toggleAuth} type="button">
            Sign Up
          </button>
        </span>
      )}
    </div>
  );
};

export default AuthToggle;

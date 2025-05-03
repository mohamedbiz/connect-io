
import React from "react";

type AuthCardProps = {
  children: React.ReactNode;
};

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="border border-[#2D82B7]/30 rounded-lg bg-white p-6 shadow-sm">
      {children}
    </div>
  );
};

export default AuthCard;

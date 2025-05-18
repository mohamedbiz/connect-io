
import React from 'react';

const AuthSocialDivider = () => {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[#2D82B7]/30"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-[#0E3366]">
          Or continue with
        </span>
      </div>
    </div>
  );
};

export default AuthSocialDivider;

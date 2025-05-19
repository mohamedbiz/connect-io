
import React from 'react';
import { CardFooter } from '@/components/ui/card';

interface AuthCardFooterProps {
  tabType: 'login' | 'register';
  onTabChange: (tab: 'login' | 'register') => void;
}

const AuthCardFooter = ({ tabType, onTabChange }: AuthCardFooterProps) => {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="text-sm text-center text-gray-500">
        {tabType === 'login' ? (
          <>
            Don't have an account?{" "}
            <button 
              onClick={() => onTabChange('register')}
              className="text-primary hover:underline"
              type="button"
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button 
              onClick={() => onTabChange('login')}
              className="text-primary hover:underline"
              type="button"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </CardFooter>
  );
};

export default AuthCardFooter;

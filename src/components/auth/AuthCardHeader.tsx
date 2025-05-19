
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building } from 'lucide-react';

interface AuthCardHeaderProps {
  tabType: 'login' | 'register';
}

const AuthCardHeader = ({ tabType }: AuthCardHeaderProps) => {
  return (
    <CardHeader className="text-center">
      <div className="flex justify-center mb-2">
        <div className="bg-[#0A2342] p-3 rounded-full">
          <Building className="h-6 w-6 text-[#2D82B7]" />
        </div>
      </div>
      <CardTitle className="text-2xl">
        {tabType === 'login' ? 'Welcome back' : 'Create your account'}
      </CardTitle>
      <CardDescription>
        {tabType === 'login' 
          ? 'Sign in to your Connect account' 
          : 'Join the platform that guarantees results'}
      </CardDescription>
    </CardHeader>
  );
};

export default AuthCardHeader;

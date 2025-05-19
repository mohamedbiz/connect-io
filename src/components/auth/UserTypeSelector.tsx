
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, User } from 'lucide-react';

interface UserTypeSelectorProps {
  userType: 'founder' | 'provider';
  onChange: (value: 'founder' | 'provider') => void;
}

const UserTypeSelector = ({ userType, onChange }: UserTypeSelectorProps) => {
  return (
    <div className="mb-6">
      <Tabs defaultValue={userType} onValueChange={(value) => onChange(value as 'founder' | 'provider')}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="founder">
            <Building className="h-4 w-4 mr-2" />
            I'm a Founder
          </TabsTrigger>
          <TabsTrigger value="provider">
            <User className="h-4 w-4 mr-2" />
            I'm a Provider
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <p className="text-sm text-gray-500 mt-2">
        {userType === 'founder' 
          ? 'For eCommerce store owners looking to grow their sales'
          : 'For marketing specialists who want to connect with clients'}
      </p>
    </div>
  );
};

export default UserTypeSelector;

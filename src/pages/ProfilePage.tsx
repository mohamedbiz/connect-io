
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import FounderProfileForm from '@/components/profile/FounderProfileForm';
import ProviderProfileForm from '@/components/profile/ProviderProfileForm';
import RouteGuard from '@/components/auth/RouteGuard';

const ProfilePage = () => {
  const { profile } = useAuth();

  return (
    <RouteGuard type="protected" allowedRoles={['founder', 'provider']}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>
          
          {profile?.role === 'founder' && <FounderProfileForm />}
          {profile?.role === 'provider' && <ProviderProfileForm />}
        </div>
      </div>
    </RouteGuard>
  );
};

export default ProfilePage;

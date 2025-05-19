
import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, WifiOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user, profile, logout, error, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleRefreshProfile = async () => {
    setIsRefreshing(true);
    try {
      await refreshProfile();
      toast.success('Profile refreshed');
    } catch (err) {
      toast.error('Failed to refresh profile');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Connection error state
  const isConnectionError = error && error.includes('fetch');

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        {isConnectionError && (
          <Alert variant="destructive" className="mb-6">
            <WifiOff className="h-4 w-4 mr-2" />
            <AlertDescription>
              Network connection error. Some profile data may not be available.
              <div className="mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Reconnect
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card className="max-w-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            
            {profile && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">
                    {profile.first_name || ''} {profile.last_name || ''}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium capitalize">{profile.role}</p>
                </div>
                {profile.business_name && (
                  <div>
                    <p className="text-sm text-gray-500">Business</p>
                    <p className="font-medium">{profile.business_name}</p>
                  </div>
                )}
              </>
            )}
            
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleRefreshProfile}
                disabled={isRefreshing || isConnectionError}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh Profile'}
              </Button>
              
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={handleLogout}
                disabled={isConnectionError}
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;

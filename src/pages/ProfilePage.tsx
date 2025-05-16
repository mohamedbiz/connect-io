
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const ProfilePage = () => {
  const { user, profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
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
              </>
            )}
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;

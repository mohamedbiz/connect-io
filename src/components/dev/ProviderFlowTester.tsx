
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createTestProviderApplication, resetProviderApplicationStatus } from '@/utils/test-data';
import { useProviderNavigation } from '@/hooks/useProviderNavigation';
import { toast } from 'sonner';

const ProviderFlowTester = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { navigateToProviderFlow } = useProviderNavigation();
  const [loading, setLoading] = useState(false);

  const handleCreateTestApplication = async () => {
    if (!user) {
      toast.error('Please log in first');
      return;
    }

    setLoading(true);
    try {
      await createTestProviderApplication(user.id);
      await refreshProfile();
      toast.success('Test provider application created successfully!');
      
      // Small delay to ensure profile refresh completes
      setTimeout(() => {
        navigateToProviderFlow();
      }, 500);
    } catch (error) {
      console.error('Error creating test application:', error);
      toast.error('Failed to create test application');
    } finally {
      setLoading(false);
    }
  };

  const handleResetApplication = async () => {
    if (!user) {
      toast.error('Please log in first');
      return;
    }

    setLoading(true);
    try {
      await resetProviderApplicationStatus(user.id);
      await refreshProfile();
      toast.success('Provider application status reset successfully!');
    } catch (error) {
      console.error('Error resetting application:', error);
      toast.error('Failed to reset application status');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Provider Flow Tester</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Please log in to test the provider flow.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Provider Flow Tester</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm"><strong>User ID:</strong> {user.id}</p>
          <p className="text-sm"><strong>Role:</strong> {profile?.role}</p>
          <p className="text-sm"><strong>Account Status:</strong> {profile?.account_status}</p>
          <p className="text-sm"><strong>Approved:</strong> {profile?.approved ? 'Yes' : 'No'}</p>
        </div>
        
        <div className="space-y-2">
          <Button
            onClick={handleCreateTestApplication}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creating...' : 'Create Test Approved Application'}
          </Button>
          
          <Button
            onClick={handleResetApplication}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            {loading ? 'Resetting...' : 'Reset Application Status'}
          </Button>

          <Button
            onClick={navigateToProviderFlow}
            variant="secondary"
            className="w-full"
          >
            Test Provider Navigation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderFlowTester;

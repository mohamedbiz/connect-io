
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, User, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { NewApplicationProvider } from './NewApplicationContext';
import { NewApplicationProgress } from './NewApplicationProgress';
import { NewApplicationStep } from './NewApplicationStep';
import { NewApplicationNavigation } from './NewApplicationNavigation';

const NewProviderApplicationFlow = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'draft' | 'submitted' | 'approved' | 'rejected'>('draft');

  // Check if user has already submitted an application
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('provider_applications')
          .select('status')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error checking application status:', error);
          return;
        }

        if (data) {
          setApplicationStatus(data.status);
          if (data.status === 'submitted' || data.status === 'approved' || data.status === 'rejected') {
            setIsSubmitted(true);
          }
        }
      } catch (error) {
        console.error('Error checking application:', error);
      }
    };

    checkApplicationStatus();
  }, [user]);

  // Handle final application submission
  const handleFinalSubmit = async (formData: any) => {
    if (!user) {
      toast.error('Please sign in to submit your application');
      return;
    }

    try {
      // Submit the application to Supabase
      const { error } = await supabase
        .from('provider_applications')
        .insert({
          user_id: user.id,
          application_data: formData,
          status: 'submitted',
          submitted_at: new Date().toISOString()
        });

      if (error) throw error;

      // Update user profile to mark as provider
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          role: 'provider',
          business_name: formData.full_name + ' Email Marketing',
          portfolio_url: formData.portfolio_url,
          first_name: formData.full_name.split(' ')[0],
          last_name: formData.full_name.split(' ').slice(1).join(' ')
        })
        .eq('id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
      }

      setIsSubmitted(true);
      setApplicationStatus('submitted');
      
      toast.success('Application submitted successfully! We\'ll review it and get back to you soon.');
      
      // Redirect to provider dashboard after a delay
      setTimeout(() => {
        navigate('/provider-dashboard', { replace: true });
      }, 3000);

    } catch (error) {
      console.error('Application submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D82B7] mx-auto mb-4"></div>
            <p className="text-[#0E3366]">Loading application...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto p-6 text-center">
          <User className="h-12 w-12 mx-auto mb-4 text-[#2D82B7]" />
          <h3 className="text-lg font-semibold mb-2">Sign in Required</h3>
          <p className="text-gray-600 mb-4">
            Please sign in to access the provider application form.
          </p>
          <Button onClick={() => navigate('/provider-signup')}>
            Sign Up as Provider
          </Button>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-500" />
          <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">
            Application {applicationStatus === 'approved' ? 'Approved!' : 'Submitted!'}
          </h2>
          
          {applicationStatus === 'approved' ? (
            <div className="space-y-4">
              <p className="text-[#0E3366] text-lg">
                Congratulations! Your provider application has been approved.
              </p>
              <Button 
                onClick={() => navigate('/provider-dashboard')}
                className="bg-[#2D82B7] hover:bg-[#3D9AD1]"
              >
                Go to Dashboard <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-[#0E3366] text-lg">
                Thank you for submitting your provider application! 
              </p>
              <p className="text-gray-600">
                Our team will review your application and get back to you within 2-3 business days. 
                You'll receive an email notification once your application status changes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/provider-dashboard')}
                >
                  View Dashboard
                </Button>
                <Button onClick={() => navigate('/')}>
                  Return Home
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4 text-[#0A2342]">Provider Application</h1>
          <p className="text-lg text-[#0E3366] max-w-2xl mx-auto">
            Join our network of qualified Email Marketing Specialists and connect with 
            eCommerce businesses looking for your expertise.
          </p>
        </div>
        
        <NewApplicationProvider>
          <NewApplicationProgress />
          <Card className="p-6">
            <NewApplicationStep />
            <NewApplicationNavigation handleSubmit={handleFinalSubmit} />
          </Card>
        </NewApplicationProvider>
      </div>
    </div>
  );
};

export default NewProviderApplicationFlow;

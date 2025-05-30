
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Clock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ApplicationSuccessProps {
  applicationStatus: 'submitted' | 'approved' | 'rejected';
  userEmail?: string;
}

const ApplicationSuccess = ({ applicationStatus, userEmail }: ApplicationSuccessProps) => {
  const navigate = useNavigate();

  const getStatusConfig = () => {
    switch (applicationStatus) {
      case 'approved':
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          title: 'Application Approved!',
          subtitle: 'Welcome to the Connect provider network',
          description: 'Congratulations! Your application has been approved. You can now access your provider dashboard and start connecting with eCommerce founders.',
          buttonText: 'Go to Dashboard',
          buttonAction: () => navigate('/provider-dashboard'),
          buttonColor: 'bg-green-600 hover:bg-green-700'
        };
      case 'rejected':
        return {
          icon: <Clock className="h-16 w-16 text-red-500" />,
          title: 'Application Under Review',
          subtitle: 'We need more information',
          description: 'Thank you for your interest. Unfortunately, we need additional information to process your application. Please check your email for next steps.',
          buttonText: 'Return Home',
          buttonAction: () => navigate('/'),
          buttonColor: 'bg-[#2D82B7] hover:bg-[#3D9AD1]'
        };
      default: // submitted
        return {
          icon: <Mail className="h-16 w-16 text-[#2D82B7]" />,
          title: 'Application Submitted!',
          subtitle: 'We\'ll be in touch soon',
          description: 'Thank you for submitting your provider application! Our team will review your submission and get back to you within 2-3 business days.',
          buttonText: 'View Dashboard',
          buttonAction: () => navigate('/provider-dashboard'),
          buttonColor: 'bg-[#2D82B7] hover:bg-[#3D9AD1]'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto p-8 text-center">
        <div className="flex justify-center mb-6">
          {config.icon}
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-[#0A2342]">
          {config.title}
        </h2>
        
        <p className="text-lg text-[#2D82B7] font-medium mb-4">
          {config.subtitle}
        </p>
        
        <p className="text-[#0E3366] mb-6 leading-relaxed">
          {config.description}
        </p>

        {userEmail && applicationStatus === 'submitted' && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
            <p className="text-sm text-blue-800">
              <Mail className="h-4 w-4 inline mr-2" />
              We'll send updates to <strong>{userEmail}</strong>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={config.buttonAction}
            className={config.buttonColor}
          >
            {config.buttonText}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
        </div>

        {applicationStatus === 'submitted' && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-[#0A2342] mb-3">What happens next?</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>✓ Our team reviews your application</p>
              <p>✓ We may reach out for additional information</p>
              <p>✓ You'll receive an approval notification</p>
              <p>✓ Start connecting with eCommerce founders</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ApplicationSuccess;

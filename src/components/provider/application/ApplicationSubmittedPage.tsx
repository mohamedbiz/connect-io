
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Mail, FileText, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProviderApplications } from '@/hooks/useProviderApplications';
import { useAuth } from '@/contexts/AuthContext';

const ApplicationSubmittedPage = () => {
  const navigate = useNavigate();
  const { myApplication, isLoadingMyApplication } = useProviderApplications();
  const { profile } = useAuth();

  // Auto-refresh application status every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (myApplication?.status === 'approved') {
        navigate('/provider/onboarding');
      } else if (myApplication?.status === 'rejected') {
        navigate('/provider-application-rejected');
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [myApplication?.status, navigate]);

  if (isLoadingMyApplication) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="flex items-center justify-center min-h-[60vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#0A2342] to-[#2D82B7] text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Application Submitted Successfully!
          </CardTitle>
          <p className="text-blue-100 mt-2">
            Thank you for applying to join Connect's network of elite email marketing specialists
          </p>
          {myApplication && (
            <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-3">
              <p className="text-sm">
                Application Status: <span className="font-semibold capitalize">{myApplication.status}</span>
              </p>
              {myApplication.automated_score && (
                <p className="text-sm">
                  Initial Score: <span className="font-semibold">{myApplication.automated_score}/100</span>
                </p>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                What Happens Next?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Automated Review</h3>
                    <p className="text-green-700 text-sm">
                      Our system automatically evaluates your application for initial scoring and qualification.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Manual Review</h3>
                    <p className="text-green-700 text-sm">
                      Our team reviews your LinkedIn profile, portfolio, and case study within 2-3 business days.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">Decision Notification</h3>
                    <p className="text-green-700 text-sm">
                      You'll receive an email notification with our decision and next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-800">Timeline</h3>
                </div>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">Automated review: Immediate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">Manual review: 2-3 business days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">Final decision: Within 1 week</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6 text-amber-600" />
                  <h3 className="text-lg font-semibold text-amber-800">Important</h3>
                </div>
                <div className="space-y-2 text-amber-700">
                  <p className="text-sm">
                    Check your email (including spam folder) for updates from Connect.
                  </p>
                  <p className="text-sm">
                    We may reach out for additional information if needed.
                  </p>
                  <p className="text-sm">
                    Questions? Contact us at support@connect.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">Review Criteria</h3>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Our review process evaluates applications based on:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Email marketing experience and expertise</li>
                  <li>• eCommerce industry knowledge</li>
                  <li>• Klaviyo platform proficiency</li>
                  <li>• Case study quality and results</li>
                </ul>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Professional profile authenticity</li>
                  <li>• Portfolio quality and relevance</li>
                  <li>• Communication style and availability</li>
                  <li>• Overall fit with Connect's standards</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="border-[#2D82B7] text-[#2D82B7] hover:bg-[#2D82B7] hover:text-white"
              >
                Return to Home
              </Button>
              {myApplication?.status === 'approved' && (
                <Button 
                  onClick={() => navigate('/provider/onboarding')}
                  className="bg-[#2D82B7] hover:bg-[#1E5A8A] text-white"
                >
                  Continue to Onboarding
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationSubmittedPage;

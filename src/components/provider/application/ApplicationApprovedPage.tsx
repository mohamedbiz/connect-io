
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Star, Users, DollarSign, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApplicationApprovedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            Welcome to Connect!
          </CardTitle>
          <p className="text-green-100 mt-2 text-lg">
            Your application has been approved. You're now part of our elite network.
          </p>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-8">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                🎉 Congratulations!
              </h2>
              <p className="text-green-700 text-lg">
                You've been accepted into Connect's exclusive network of email marketing specialists. 
                Our team was impressed with your experience, expertise, and proven results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-800 mb-2">Quality Clients</h3>
                <p className="text-blue-700 text-sm">
                  Access to pre-qualified eCommerce founders actively seeking email marketing experts
                </p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-800 mb-2">Premium Rates</h3>
                <p className="text-purple-700 text-sm">
                  Command higher rates working with clients who understand the value of expert marketing
                </p>
              </div>

              <div className="text-center p-6 bg-amber-50 rounded-lg border border-amber-200">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-amber-800 mb-2">Elite Network</h3>
                <p className="text-amber-700 text-sm">
                  Join a curated community of top-tier email marketing professionals
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#0A2342] to-[#2D82B7] p-6 rounded-lg text-white">
              <h2 className="text-xl font-semibold mb-4">Your Next Steps</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Complete Your Public Profile</h3>
                    <p className="text-blue-100 text-sm">
                      Set up your detailed provider profile that clients will see when browsing specialists
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Set Your Availability</h3>
                    <p className="text-blue-100 text-sm">
                      Configure your capacity and project preferences to receive relevant matches
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Start Receiving Matches</h3>
                    <p className="text-blue-100 text-sm">
                      Once your profile is complete, we'll start sending you qualified client opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Guidelines</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Quality Standards</h4>
                  <ul className="space-y-1">
                    <li>• Maintain professional communication</li>
                    <li>• Deliver results within agreed timelines</li>
                    <li>• Provide regular project updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Best Practices</h4>
                  <ul className="space-y-1">
                    <li>• Keep your profile updated and accurate</li>
                    <li>• Respond to client inquiries promptly</li>
                    <li>• Use platform messaging for initial discussions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                onClick={() => navigate('/provider/profile-setup')}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                Complete Profile Setup
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => navigate('/provider/dashboard')}
                variant="outline"
                className="border-[#2D82B7] text-[#2D82B7] hover:bg-[#2D82B7] hover:text-white"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationApprovedPage;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, AlertTriangle, BookOpen, Mail, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApplicationRejectedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-500 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <XCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Application Status Update
          </CardTitle>
          <p className="text-gray-100 mt-2">
            Thank you for your interest in joining Connect's provider network
          </p>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-amber-800 mb-3">
                    Application Not Approved
                  </h2>
                  <p className="text-amber-700">
                    After careful review of your application and professional profiles, we've determined that your current experience and expertise don't align with our platform requirements at this time.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">Common Areas for Improvement</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Experience Requirements</h4>
                    <ul className="space-y-1 text-blue-700 text-sm">
                      <li>• Minimum 3+ years email marketing experience</li>
                      <li>• Proven eCommerce/DTC industry expertise</li>
                      <li>• Advanced Klaviyo platform proficiency</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Portfolio Quality</h4>
                    <ul className="space-y-1 text-blue-700 text-sm">
                      <li>• Professional website with case studies</li>
                      <li>• LinkedIn profile demonstrating expertise</li>
                      <li>• Relevant work samples and testimonials</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Results Documentation</h4>
                    <ul className="space-y-1 text-blue-700 text-sm">
                      <li>• Quantifiable performance metrics</li>
                      <li>• Revenue impact demonstrations</li>
                      <li>• Before/after campaign comparisons</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Professional Standards</h4>
                    <ul className="space-y-1 text-blue-700 text-sm">
                      <li>• Clear communication style</li>
                      <li>• Professional presentation</li>
                      <li>• Alignment with platform values</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Future Opportunities</h3>
              </div>
              <p className="text-green-700 mb-4">
                We encourage you to continue developing your skills and experience. You're welcome to apply again in the future when you meet our requirements.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Recommended Actions</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Gain more eCommerce client experience</li>
                    <li>• Develop advanced Klaviyo skills</li>
                    <li>• Build a stronger portfolio website</li>
                    <li>• Document specific campaign results</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Resources</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Klaviyo Academy certification</li>
                    <li>• eCommerce marketing courses</li>
                    <li>• Industry networking events</li>
                    <li>• Professional development programs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">Questions or Feedback</h3>
              </div>
              <p className="text-gray-700 mb-4">
                If you have questions about this decision or would like specific feedback on your application, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Contact our team:</p>
                  <p>Email: applications@connect.com</p>
                  <p>Response time: 2-3 business days</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Reapplication timeline:</p>
                  <p>Wait 6 months before reapplying</p>
                  <p>Focus on skill development during this time</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                onClick={() => window.open('mailto:applications@connect.com', '_blank')}
                variant="outline"
                className="border-[#2D82B7] text-[#2D82B7] hover:bg-[#2D82B7] hover:text-white flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Contact Support
              </Button>
              <Button 
                onClick={() => navigate('/')}
                className="bg-[#2D82B7] hover:bg-[#1E5A8A] text-white"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationRejectedPage;


import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Mail } from 'lucide-react';

interface ApplicationSubmissionStepProps {
  data: any;
  onBack: () => void;
  onComplete: () => void;
  loading: boolean;
}

const ApplicationSubmissionStep = ({ data, onBack, onComplete, loading }: ApplicationSubmissionStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
          Ready to Submit Your Application
        </h3>
        <p className="text-gray-600">
          Review your information below and submit your application for review.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h4 className="font-semibold text-[#0A2342] mb-3">Application Summary</h4>
        
        <div className="space-y-2">
          <div>
            <span className="font-medium">Professional Headline:</span>
            <p className="text-gray-600">{data.headline}</p>
          </div>
          
          <div>
            <span className="font-medium">Experience Level:</span>
            <p className="text-gray-600">{data.yearsExperience} years</p>
          </div>
          
          <div>
            <span className="font-medium">Primary Platform:</span>
            <p className="text-gray-600">{data.primaryEsp}</p>
          </div>
          
          <div>
            <span className="font-medium">Industries:</span>
            <p className="text-gray-600">{data.industriesServed?.join(', ')}</p>
          </div>
          
          <div>
            <span className="font-medium">Portfolio:</span>
            <p className="text-gray-600">{data.portfolioUrl}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">What happens next?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Your application will be reviewed within 2-3 business days</li>
              <li>• You'll receive an email notification about the status</li>
              <li>• If approved, you can start receiving client matches</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800 mb-1">Keep an eye on your email</h4>
            <p className="text-sm text-amber-700">
              We'll send you updates about your application status and next steps.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
          disabled={loading}
        >
          Back
        </Button>
        <Button 
          onClick={onComplete} 
          disabled={loading}
          className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  );
};

export default ApplicationSubmissionStep;

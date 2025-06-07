
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, CheckCircle, Clock, ArrowRight } from 'lucide-react';

interface SuccessStepProps {
  role: 'founder' | 'provider';
  data: {
    profilePictureUrl?: string;
  };
  updateData: (data: Partial<any>) => void;
  onBack: () => void;
  onComplete: () => void;
  loading: boolean;
}

const SuccessStep = ({ role, data, updateData, onBack, onComplete, loading }: SuccessStepProps) => {
  const [formData, setFormData] = useState(data);

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData(newData);
  };

  const isFounder = role === 'founder';

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
          Add a profile picture (optional)
        </h3>
        <p className="text-gray-600">
          {isFounder 
            ? "Help providers recognize you when they see your project requests"
            : "Help clients recognize you in the provider directory"
          }
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={formData.profilePictureUrl} />
            <AvatarFallback className="text-xl bg-[#0A2342] text-white">
              <Upload className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>

          <div className="w-full max-w-sm">
            <Label htmlFor="profilePictureUrl">Profile Picture URL</Label>
            <Input
              id="profilePictureUrl"
              type="url"
              placeholder="https://example.com/your-photo.jpg"
              value={formData.profilePictureUrl || ''}
              onChange={(e) => handleInputChange('profilePictureUrl', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              You can upload an image to a service like imgur.com and paste the URL here
            </p>
          </div>
        </div>

        {/* What happens next section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-[#0A2342] mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            What happens next?
          </h4>
          <div className="space-y-3 text-sm text-gray-700">
            {isFounder ? (
              <>
                <div className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-[#2D82B7]" />
                  <span>You'll get instant access to your personalized dashboard</span>
                </div>
                <div className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-[#2D82B7]" />
                  <span>AI will recommend the best email experts for your business</span>
                </div>
                <div className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-[#2D82B7]" />
                  <span>Browse expert profiles and start connecting</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 mt-0.5 text-amber-600" />
                  <span>Your application will be reviewed by our team (usually within 24-48 hours)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-[#2D82B7]" />
                  <span>Once approved, you'll appear in the provider directory</span>
                </div>
                <div className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-[#2D82B7]" />
                  <span>Start receiving matched client inquiries and build your business</span>
                </div>
              </>
            )}
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
          {loading 
            ? 'Submitting...' 
            : isFounder 
              ? 'Complete Setup' 
              : 'Submit Application'
          }
        </Button>
      </div>
    </div>
  );
};

export default SuccessStep;

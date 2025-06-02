
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';

interface ProfilePictureStepProps {
  data: {
    profilePictureUrl?: string;
  };
  updateData: (data: Partial<any>) => void;
  onBack: () => void;
  onComplete: () => void;
  loading: boolean;
}

const ProfilePictureStep = ({ data, updateData, onBack, onComplete, loading }: ProfilePictureStepProps) => {
  const [formData, setFormData] = useState(data);

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
          Add a profile picture (optional)
        </h3>
        <p className="text-gray-600">
          Help providers recognize you when they see your project requests
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
          {loading ? 'Completing...' : 'Complete Setup'}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePictureStep;

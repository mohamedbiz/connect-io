
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface QuickRegistrationFormProps {
  userType: 'founder' | 'provider';
  onCancel: () => void;
}

const QuickRegistrationForm = ({ userType, onCancel }: QuickRegistrationFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';

      // Generate a unique ID for this user session
      const userId = crypto.randomUUID();

      // Save directly to database without authentication
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          role: userType,
          account_status: 'active',
          onboarding_complete: false
        });

      if (error) {
        // Check if user already exists by email
        if (error.message.includes('duplicate') || error.code === '23505') {
          // User already exists, fetch their data and continue
          const { data: existingUser, error: fetchError } = await supabase
            .from('profiles')
            .select('id, role')
            .eq('email', formData.email)
            .single();

          if (fetchError) {
            toast.error('Error retrieving user data');
            return;
          }

          // Store user data in localStorage for session management
          localStorage.setItem('current_user', JSON.stringify({
            id: existingUser.id,
            role: existingUser.role,
            email: formData.email,
            name: formData.fullName
          }));

          toast.success('Welcome back! Continuing to next step...');
        } else {
          toast.error('Error saving data. Please try again.');
          return;
        }
      } else {
        // Store user data in localStorage for session management
        localStorage.setItem('current_user', JSON.stringify({
          id: userId,
          role: userType,
          email: formData.email,
          name: formData.fullName
        }));
        toast.success('Getting started!');
      }

      // Navigate based on user type
      if (userType === 'founder') {
        navigate('/founder/profile-completion');
      } else {
        navigate('/provider/application-questions');
      }

    } catch (error: any) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-[#0A2342]">
          Join as {userType === 'founder' ? 'Founder' : 'Provider'}
        </CardTitle>
        <p className="text-center text-[#0E3366]">
          Get started in less than 30 seconds
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-[#0A2342]">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="border-[#2D82B7]/30 focus:border-[#2D82B7]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#0A2342]">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border-[#2D82B7]/30 focus:border-[#2D82B7]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-[#2D82B7]/30 text-[#0A2342] hover:bg-[#BFD7ED]/20"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#2D82B7] hover:bg-[#3D9AD1] text-white"
            >
              {loading ? 'Getting Started...' : 'Get Started'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickRegistrationForm;

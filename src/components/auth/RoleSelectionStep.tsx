
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Building, User } from 'lucide-react';
import { toast } from 'sonner';

interface RoleOption {
  value: 'founder' | 'provider';
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

export const RoleSelectionStep: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'founder' | 'provider' | null>(null);
  const navigate = useNavigate();

  const roleOptions: RoleOption[] = [
    {
      value: 'founder',
      title: 'I\'m an eCommerce Business Owner',
      description: 'Looking for email marketing specialists to grow my business',
      icon: <Building className="h-8 w-8" />,
      benefits: [
        'Browse vetted email marketing specialists',
        'Get matched with experts in your industry',
        'Access diagnostic tools and insights',
        'Direct messaging with providers'
      ]
    },
    {
      value: 'provider',
      title: 'I\'m an Email Marketing Specialist',
      description: 'Ready to offer my services to eCommerce businesses',
      icon: <User className="h-8 w-8" />,
      benefits: [
        'Get connected with qualified leads',
        'Showcase your expertise and portfolio',
        'Access to vetted business owners',
        'Secure payment processing'
      ]
    }
  ];

  const handleRoleSelect = (role: 'founder' | 'provider') => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/${selectedRole}/signin`);
    } else {
      toast.error('Please select your role to continue');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-[#0A2342]">Welcome to Connect!</h1>
        <p className="text-gray-600 text-lg">
          Let's get you set up. What describes you best?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {roleOptions.map((option) => (
          <RoleCard
            key={option.value}
            option={option}
            isSelected={selectedRole === option.value}
            onSelect={() => handleRoleSelect(option.value)}
          />
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={handleContinue}
          disabled={!selectedRole}
          className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white px-8 py-3 text-lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

interface RoleCardProps {
  option: RoleOption;
  isSelected: boolean;
  onSelect: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ option, isSelected, onSelect }) => (
  <Card
    className={`
      cursor-pointer transition-all hover:shadow-lg
      ${isSelected 
        ? 'border-[#2D82B7] bg-blue-50 shadow-md' 
        : 'border-gray-200 hover:border-gray-300'
      }
    `}
    onClick={onSelect}
  >
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="text-[#2D82B7]">{option.icon}</div>
        {isSelected && (
          <div className="bg-[#2D82B7] rounded-full p-1">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      <CardTitle className="text-xl text-[#0A2342]">{option.title}</CardTitle>
      <CardDescription className="text-gray-600">{option.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {option.benefits.map((benefit, index) => (
          <li key={index} className="flex items-center text-sm">
            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default RoleSelectionStep;

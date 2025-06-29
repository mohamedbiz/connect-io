
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onRoleSelection?: (role: 'founder' | 'provider') => void;
}

const Hero = ({ onRoleSelection }: HeroProps) => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: 'founder' | 'provider') => {
    console.log('Hero: Button clicked for role:', role);
    
    if (onRoleSelection) {
      console.log('Hero: Calling onRoleSelection callback');
      onRoleSelection(role);
    } else {
      console.log('Hero: Using fallback navigation');
      navigate(`/${role}/signin`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#0A2342] via-[#0E3366] to-[#2D82B7] text-white py-20 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Where Vetted Email Experts & Growth-Ready eCommerce Brands Connect
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-[#BFD7ED] max-w-4xl mx-auto leading-relaxed">
          Stop the endless search and risky hires. Connect is the curated marketplace
          delivering qualified opportunities for experts and proven talent for Founders,
          focused on measurable results.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
          {/* Founder CTA Button */}
          <Button 
            size="lg" 
            className="w-full md:w-auto bg-white text-[#0A2342] hover:bg-[#f8fafc] border-2 border-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 rounded-lg" 
            onClick={() => handleRoleSelection('founder')}
          >
            <Target className="w-5 h-5 mr-2" />
            Grow My eCommerce Brand
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          {/* Provider CTA Button */}
          <Button 
            size="lg" 
            className="w-full md:w-auto bg-white text-[#0A2342] hover:bg-[#f8fafc] border-2 border-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 rounded-lg"
            onClick={() => handleRoleSelection('provider')}
          >
            <Users className="w-5 h-5 mr-2" />
            Access Quality Clients
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#BFD7ED] text-sm">
            Join thousands of successful partnerships built on trust and results
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Building, Lock, Mail } from "lucide-react";
import { useState } from "react";

const FounderRegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="text-sm text-[#0E3366] mb-4 mt-2">
        For eCommerce store owners looking to grow their sales and improve customer retention
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-sm font-medium text-[#0A2342]">
              First Name
            </label>
            <Input 
              id="first-name" 
              placeholder="John" 
              required 
              className="border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium text-[#0A2342]">
              Last Name
            </label>
            <Input 
              id="last-name" 
              placeholder="Smith" 
              required 
              className="border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium text-[#0A2342]">
            Company/Store Name
          </label>
          <Input 
            id="company" 
            placeholder="Your eCommerce Store" 
            required 
            className="border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#0A2342]">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2D82B7]/70" />
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              required 
              className="pl-10 border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-[#0A2342]">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2D82B7]/70" />
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              className="pl-10 border-[#2D82B7]/50 focus-visible:ring-[#2D82B7]"
            />
          </div>
        </div>
        <div className="flex items-start space-x-2 text-sm">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-[#2D82B7] border-[#2D82B7]/50 rounded"
              required
            />
          </div>
          <label htmlFor="terms" className="text-[#0E3366]">
            I agree to the <Link to="/terms" className="text-[#2D82B7] hover:text-[#3D9AD1] transition-colors hover:underline">Terms of Service</Link> and{" "}
            <Link to="/privacy" className="text-[#2D82B7] hover:text-[#3D9AD1] transition-colors hover:underline">Privacy Policy</Link>
          </label>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Founder Account"}
        </Button>
      </form>
    </>
  );
};

export default FounderRegistrationForm;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";

const ProviderRegistrationForm = () => {
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
      <div className="text-sm text-gray-500 mb-4 mt-2">
        For email marketing specialists who want to connect with pre-qualified eCommerce clients
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-sm font-medium">
              First Name
            </label>
            <Input id="first-name" placeholder="Jane" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium">
              Last Name
            </label>
            <Input id="last-name" placeholder="Doe" required />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="business-name" className="text-sm font-medium">
            Business Name
          </label>
          <Input id="business-name" placeholder="Your Agency or Freelance Business" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input id="email" type="email" placeholder="name@example.com" required className="pl-10" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input id="password" type="password" placeholder="••••••••" required className="pl-10" />
          </div>
        </div>
        <div className="flex items-start space-x-2 text-sm">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
              required
            />
          </div>
          <label htmlFor="terms" className="text-gray-500">
            I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </label>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Apply as Provider"}
        </Button>
      </form>
    </>
  );
};

export default ProviderRegistrationForm;

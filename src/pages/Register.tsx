
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Briefcase, Building, Check, Lock, Mail, User } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // In a real implementation, we would handle registration here
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <Card className="border shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Join Connect to grow your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="founder" className="mb-6">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="founder">
                    <Building className="h-4 w-4 mr-1" />
                    I'm a Founder
                  </TabsTrigger>
                  <TabsTrigger value="provider">
                    <User className="h-4 w-4 mr-1" />
                    I'm a Provider
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="founder">
                  <div className="text-sm text-gray-500 mb-4 mt-2">
                    For eCommerce store owners looking to grow their sales and improve customer retention
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          First Name
                        </label>
                        <Input 
                          id="first-name" 
                          placeholder="John" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input 
                          id="last-name" 
                          placeholder="Smith" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company/Store Name
                      </label>
                      <Input 
                        id="company" 
                        placeholder="Your eCommerce Store" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="name@example.com" 
                          required 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••" 
                          required 
                          className="pl-10"
                        />
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
                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Founder Account"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="provider">
                  <div className="text-sm text-gray-500 mb-4 mt-2">
                    For email marketing specialists who want to connect with pre-qualified eCommerce clients
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          First Name
                        </label>
                        <Input 
                          id="first-name" 
                          placeholder="Jane" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          Last Name
                        </label>
                        <Input 
                          id="last-name" 
                          placeholder="Doe" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="business-name" className="text-sm font-medium">
                        Business Name
                      </label>
                      <Input 
                        id="business-name" 
                        placeholder="Your Agency or Freelance Business" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="name@example.com" 
                          required 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••" 
                          required 
                          className="pl-10"
                        />
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
                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Apply as Provider"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

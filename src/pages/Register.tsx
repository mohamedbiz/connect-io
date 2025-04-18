
import { Briefcase, Building, User } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FounderRegistrationForm from "@/components/auth/FounderRegistrationForm";
import ProviderRegistrationForm from "@/components/auth/ProviderRegistrationForm";

const Register = () => {
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
                  <FounderRegistrationForm />
                </TabsContent>
                <TabsContent value="provider">
                  <ProviderRegistrationForm />
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

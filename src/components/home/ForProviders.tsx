
import { ArrowRight, CheckCircle, Coins, Folder, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const ForProviders = () => {
  const benefits = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Pre-qualified Clients",
      description: "Access eCommerce clients who are ready to invest in email marketing optimization."
    },
    {
      icon: <Coins className="h-10 w-10 text-primary" />,
      title: "Higher Earnings",
      description: "Premium rates for your expertise with clients who understand the value of results."
    },
    {
      icon: <Folder className="h-10 w-10 text-primary" />,
      title: "Build Your Portfolio",
      description: "Showcase your verified results and build your reputation with case studies."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Focus on Delivery",
      description: "We handle client acquisition so you can focus on what you do best: driving results."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="for-providers">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              For Service Providers
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Stop chasing clients and start delivering results. Join our network of elite 
              email marketing specialists and connect with eCommerce businesses 
              looking for your expertise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-secondary border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="mb-2">{benefit.icon}</div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button size="lg" variant="outline" asChild>
              <Link to="/for-providers">
                Learn More
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="md:w-1/2">
            <div className="bg-secondary rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Join Our Provider Network</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Application Process</h4>
                    <p className="text-gray-600 text-sm">
                      Submit your portfolio, credentials, and past client results for review.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Verification & Onboarding</h4>
                    <p className="text-gray-600 text-sm">
                      Complete our verification process and training on our platform tools.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Profile Creation</h4>
                    <p className="text-gray-600 text-sm">
                      Build your service provider profile to showcase your expertise and results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Client Matching</h4>
                    <p className="text-gray-600 text-sm">
                      Get matched with clients whose needs align with your expertise.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Results Certification</h4>
                    <p className="text-gray-600 text-sm">
                      Add verified success cases to your profile to attract more clients.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button size="lg" className="w-full" variant="default" asChild>
                <Link to="/provider-apply">
                  Apply as a Provider
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForProviders;

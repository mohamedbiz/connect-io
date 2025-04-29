
import { ArrowRight, CheckCircle, Mail, TrendingUp, Users } from "lucide-react";
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

const ForFounders = () => {
  const benefits = [
    {
      icon: <CheckCircle className="h-10 w-10 text-accent" />,
      title: "Pre-vetted Specialists",
      description: "Only work with proven email marketing experts who have demonstrated consistent results."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-accent" />,
      title: "Guaranteed Performance",
      description: "Providers guarantee a 200% increase in sales, 30% reduction in churn, and 200% LTV improvement."
    },
    {
      icon: <Mail className="h-10 w-10 text-accent" />,
      title: "Email Marketing Focus",
      description: "Specialized experts who know exactly how to optimize your email marketing strategy."
    },
    {
      icon: <Users className="h-10 w-10 text-accent" />,
      title: "Risk-Free Engagement",
      description: "If the promised results aren't delivered within 30 days, you don't pay a cent."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50" id="for-founders">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              For eCommerce Founders
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Stop wasting time and money on marketing strategies that don't deliver. 
              Connect with specialists who guarantee measurable results for your 
              eCommerce business.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-white border shadow-sm h-full hover:shadow-md transition-shadow duration-300">
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

            <Button size="lg" asChild>
              <Link to="/for-founders">
                Learn More
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-xl p-8 border hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 text-primary">What Founders Get</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Comprehensive Email Audit</h4>
                    <p className="text-gray-600 text-sm">
                      Detailed analysis of your current email marketing performance with clear improvement opportunities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Strategic Email Sequences</h4>
                    <p className="text-gray-600 text-sm">
                      Customized welcome, abandonment, post-purchase, and win-back email sequences.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Segmentation Strategy</h4>
                    <p className="text-gray-600 text-sm">
                      Advanced customer segmentation to deliver personalized messaging that drives conversions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Results Dashboard</h4>
                    <p className="text-gray-600 text-sm">
                      Real-time tracking of key metrics to measure progress toward guaranteed results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Risk-Free Guarantee</h4>
                    <p className="text-gray-600 text-sm">
                      If we don't deliver the promised results within 30 days, you don't pay.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button size="lg" className="w-full" asChild>
                <Link to="/register">
                  Connect with Specialists
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

export default ForFounders;

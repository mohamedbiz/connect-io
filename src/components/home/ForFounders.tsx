import { ArrowRight, CheckCircle, Mail, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const ForFounders = () => {
  const benefits = [
    {
      icon: <CheckCircle className="h-10 w-10 text-[#2D82B7]" />,
      title: "Pre-vetted Specialists",
      description: "Only work with proven email marketing experts who have demonstrated consistent results."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-[#2D82B7]" />,
      title: "Guaranteed Performance",
      description: "Providers guarantee a 200% increase in sales, 30% reduction in churn, and 200% LTV improvement."
    },
    {
      icon: <Mail className="h-10 w-10 text-[#2D82B7]" />,
      title: "Email Marketing Focus",
      description: "Specialized experts who know exactly how to optimize your email marketing strategy."
    },
    {
      icon: <Users className="h-10 w-10 text-[#2D82B7]" />,
      title: "Risk-Free Engagement",
      description: "If the promised results aren't delivered within 30 days, you don't pay a cent."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F9FF]" id="for-founders">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="block w-12 h-1 rounded-full bg-[#BFD7ED]"></span>
              <span className="text-[#2D82B7] font-semibold uppercase text-xs tracking-wide">
                For eCommerce Founders
              </span>
              <span className="block w-12 h-1 rounded-full bg-[#BFD7ED]"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0A2342]">
              Grow Your eCommerce Business
            </h2>
            <p className="text-xl text-[#0E3366] mb-8">
              Stop wasting time and money on marketing strategies that don't deliver. 
              Connect with specialists who guarantee measurable results for your 
              eCommerce business.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="border border-[#BFD7ED] rounded-lg p-5 bg-white transition-all duration-300 hover:border-[#2D82B7] hover:translate-y-[-5px]"
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-[#0A2342]">{benefit.title}</h3>
                  <p className="text-[#0E3366] text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
              asChild
            >
              <Link to="/for-founders">
                Learn More
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="md:w-1/2">
            <div className="border border-[#BFD7ED] rounded-lg p-8 bg-white hover:border-[#2D82B7] transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 text-[#0A2342]">What Founders Get</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#0A2342]">Comprehensive Email Audit</h4>
                    <p className="text-[#0E3366] text-sm">
                      Detailed analysis of your current email marketing performance with clear improvement opportunities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#0A2342]">Strategic Email Sequences</h4>
                    <p className="text-[#0E3366] text-sm">
                      Customized welcome, abandonment, post-purchase, and win-back email sequences.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#0A2342]">Segmentation Strategy</h4>
                    <p className="text-[#0E3366] text-sm">
                      Advanced customer segmentation to deliver personalized messaging that drives conversions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#0A2342]">Results Dashboard</h4>
                    <p className="text-[#0E3366] text-sm">
                      Real-time tracking of key metrics to measure progress toward guaranteed results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2D82B7] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-[#0A2342]">Risk-Free Guarantee</h4>
                    <p className="text-[#0E3366] text-sm">
                      If we don't deliver the promised results within 30 days, you don't pay.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-[#2D82B7] hover:bg-[#3D9AD1] text-white transition-colors" 
                asChild
              >
                <Link to="/founder/signin">
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

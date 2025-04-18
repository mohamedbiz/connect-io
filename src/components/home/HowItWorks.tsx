
import {
  ArrowRight,
  LineChart,
  MessageSquare,
  Search,
  ShieldCheck,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Discover Specialists",
      description: "Browse our pre-vetted email marketing specialists with proven track records."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Connect & Plan",
      description: "Schedule discovery calls and define your project scope with clear deliverables."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Collaborate",
      description: "Work together through our project management system with milestone tracking."
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: "Measure Results",
      description: "Track your growth metrics and see the guaranteed improvement in real-time."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Connect Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process connects you with specialized service providers
            and ensures you get the guaranteed results you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border relative">
              <div className="absolute -top-4 -left-4 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="bg-secondary rounded-lg p-6 md:p-8 max-w-3xl w-full text-center">
            <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Guaranteed Results or You Don't Pay</h3>
            <p className="text-gray-700 mb-6">
              Every service provider on Connect guarantees specific, measurable results 
              within 30 days. If they don't deliver, you don't pay - it's that simple.
            </p>
            <Button asChild>
              <Link to="/register">
                Get Started Now
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

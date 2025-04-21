
import { ArrowRight, CheckCircle, Coins, Folder, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const PAIN_POINTS = [
  "Spending countless hours searching for quality clients",
  "Constantly negotiating and justifying your rates",
  "Getting paid less by clients who don’t understand the ROI of great email marketing",
  "Struggling to stand out in a crowded market",
  "Wasting energy on sales calls instead of doing expert work",
];

const BRIDGE_BENEFITS = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Qualified Leads Delivered",
    desc: "You get eCommerce clients already ready to invest in their growth—never do cold outreach again.",
  },
  {
    icon: <Coins className="h-6 w-6 text-primary" />,
    title: "Premium Rates",
    desc: "Only serious founders looking for results. Charge for value, not just time.",
  },
  {
    icon: <Folder className="h-6 w-6 text-primary" />,
    title: "Portfolio Growth",
    desc: "Showcase your verified results and boost your credibility with high-quality case studies.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Unmatched Support",
    desc: "Our team guides both you and clients through onboarding, making every collaboration seamless.",
  },
];

const ForProviders = () => {
  return (
    <section className="py-16 md:py-24 bg-white" id="for-providers">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* PAIN POINTS - THE REALITY */}
        <div className="mb-16">
          <Card className="bg-white shadow-lg border-l-4 border-orange-500 px-6 py-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="text-orange-500 h-7 w-7"/>
              <h2 className="text-2xl font-bold text-gray-900">The Reality for Most Service Providers</h2>
            </div>
            <p className="text-lg text-gray-700 mb-3">
              Doing great work used to be enough. Email marketing specialists today face new hurdles:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
              {PAIN_POINTS.map((pain, idx) => (
                <li key={idx}>{pain}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* THE BRIDGE - TRANSITION TO SOLUTION */}
        <div className="mb-16 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-primary">
            What if you could focus only on delivering results—<br className="hidden md:inline" />not chasing clients?
          </h3>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Our platform exists to bridge the gap—so you spend your time where it matters: delivering value, not chasing leads.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2 max-w-3xl mx-auto">
            {BRIDGE_BENEFITS.map((b, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-secondary rounded-lg shadow p-4 border hover-scale transition-transform">
                <div className="mt-1">{b.icon}</div>
                <div>
                  <div className="font-medium text-base mb-1">{b.title}</div>
                  <div className="text-gray-600 text-sm">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HOW TO JOIN—SIMPLE STEPS */}
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-1/2">
            <div className="bg-secondary rounded-lg shadow-xl p-8 h-full flex flex-col justify-between">
              <h3 className="text-2xl font-bold mb-6 text-primary">
                Join Our Provider Network
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Application Process</h4>
                    <p className="text-gray-600 text-sm">
                      Submit your portfolio and credentials for expert review.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Verification & Onboarding</h4>
                    <p className="text-gray-600 text-sm">
                      Complete a short platform training and verification.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Profile Creation</h4>
                    <p className="text-gray-600 text-sm">
                      Build your public provider profile for clients to discover your work.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Client Matching</h4>
                    <p className="text-gray-600 text-sm">
                      Get matched to eCommerce businesses ready to invest in your expertise.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Results Certification</h4>
                    <p className="text-gray-600 text-sm">
                      Add verified results to your profile to attract more clients.
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

          {/* SUMMARY CARD */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              For Service Providers
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Connect. Deliver. Grow. Join a trusted network of email marketing specialists and connect with eCommerce businesses that value your results.
            </p>
            <div className="mb-10">
              <Button size="lg" variant="outline" asChild>
                <Link to="/for-providers">
                  Learn More
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

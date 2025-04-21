import { CheckCircle, Users, Coins, Folder, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PAIN_POINTS = [
  "Spending countless hours searching for quality clients.",
  "Constantly negotiating and justifying your rates.",
  "Getting paid less by clients who don’t understand the ROI of great email marketing.",
  "Struggling to stand out in a crowded market.",
  "Wasting energy on sales calls instead of doing expert work.",
];

const BRIDGE_BENEFITS = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Qualified Leads Delivered",
    desc: "We’ll connect you directly with eCommerce founders who are eager and ready to invest.",
  },
  {
    icon: <Coins className="h-6 w-6 text-primary" />,
    title: "Premium Rates",
    desc: "Work with serious clients who value results, so you can charge based on your impact.",
  },
  {
    icon: <Folder className="h-6 w-6 text-primary" />,
    title: "Portfolio Growth",
    desc: "Showcase real, verified outcomes to attract even more top-tier projects.",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Unmatched Support",
    desc: "Our team ensures every collaboration is smooth, so you can focus on what you do best.",
  },
];

const ForProviders = () => {
  return (
    <section className="py-16 md:py-24 bg-white" id="for-providers">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* REALITY SECTION */}
        <Card className="relative bg-gradient-to-br from-secondary via-white to-white border-0 shadow-xl px-8 py-8 mb-20">
          <CardHeader className="flex items-center gap-3 border-b-0 p-0 mb-6">
            <div className="rounded-full bg-orange-100 p-3 border border-orange-200">
              <AlertTriangle className="text-orange-500 h-8 w-8" />
            </div>
            <CardTitle className="!text-3xl !font-extrabold text-gray-900 tracking-tight">
              The Reality for Most Service Providers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <p className="text-lg text-gray-800 mb-6 font-semibold max-w-3xl leading-relaxed">
              Doing great work used to be enough. Today, email marketing specialists face growing challenges:
            </p>
            <ul className="space-y-5 pl-4 max-w-xl text-base text-gray-700 font-medium leading-relaxed">
              {PAIN_POINTS.map((pain, idx) => (
                <li key={idx} className="flex items-start gap-3 group transition">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400 group-hover:text-orange-500 transition" />
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* BRIDGE SECTION */}
        <div className="text-center mb-20 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="block w-12 h-1 rounded-full bg-primary/80"></span>
            <span className="text-primary font-semibold uppercase text-xs tracking-wide">
              There’s a better way
            </span>
            <span className="block w-12 h-1 rounded-full bg-primary/80"></span>
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 leading-snug mb-4">
            What if you could focus only on delivering results &ndash; <br className="hidden md:inline" />
            not chasing clients?
          </h3>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Our platform exists to bridge the gap—so you spend your time where it matters: delivering value, not chasing leads.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {BRIDGE_BENEFITS.map((b, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-secondary rounded-lg shadow p-5 border hover-scale transition-transform">
                <div className="mt-1">{b.icon}</div>
                <div>
                  <div className="font-semibold text-base mb-1 text-gray-900">{b.title}</div>
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

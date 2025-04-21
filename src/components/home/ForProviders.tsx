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
  "Endless hours wasted searching for high-quality clients.",
  "Pressure to justify your value and negotiate your worth—all the time.",
  "Underpaid by clients who don’t recognize the ROI of expert email strategy.",
  "Struggling to truly stand out in a market flooded with freelancers.",
  "Losing energy on sales and outreach instead of creating amazing results.",
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
        {/* PAIN POINTS - THE REALITY */}
        <Card className="relative bg-gradient-to-br from-secondary via-white to-white border-0 shadow-xl px-0 md:px-8 py-10 mb-20">
          <CardHeader className="flex-row items-center gap-4 border-b-0 p-0 mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2 border border-orange-200">
                <AlertTriangle className="text-orange-500 h-7 w-7" />
              </div>
              <CardTitle className="!text-3xl !font-extrabold text-gray-900 tracking-tight">
                The Reality: Tough Road for Email Service Providers
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-4">
            <div className="text-lg text-gray-800 mb-4 font-medium leading-relaxed max-w-2xl">
              Top specialists aren’t struggling because they lack skill—they’re stuck playing the client-chase game. Does any of this sound familiar?
            </div>
            <ul className="space-y-4 pl-2">
              {PAIN_POINTS.map((pain, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 group transition"
                >
                  <span className="mt-1">
                    <CheckCircle className="h-5 w-5 text-orange-400 group-hover:text-orange-500 transition" />
                  </span>
                  <span className="text-base text-gray-700">{pain}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {/* BRIDGE SECTION - SOLUTION */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="block w-10 h-1 rounded-full bg-primary/70"></span>
            <span className="text-primary font-semibold tracking-wide uppercase text-xs">
              There’s a better way
            </span>
            <span className="block w-10 h-1 rounded-full bg-primary/70"></span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-snug">
            Imagine focusing only on delivering results<br className="hidden md:inline" />
            <span className="block text-xl md:text-2xl font-normal text-gray-700 mt-2">
              (Not chasing clients, negotiating fees, or selling yourself)
            </span>
          </h3>
          <p className="text-lg text-gray-700 mb-9 max-w-2xl mx-auto">
            We built Connect to flip the script—removing the client acquisition pain entirely.
            Our platform connects you with founders who value your expertise, so you finally get to do your best work (and get paid what you’re worth).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2 max-w-3xl mx-auto">
            {BRIDGE_BENEFITS.map((b, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-secondary rounded-lg shadow p-4 border hover-scale transition-transform">
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

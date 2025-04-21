import Layout from "@/components/layout/Layout";
import { ArrowRight, Users, Coins, CheckCircle, Folder, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Unified, improved pain points for brand voice:
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

const ForProvidersPage = () => (
  <Layout>
    {/* "The Reality for Most Service Providers" - replicated from home section */}
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
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
      </div>
    </section>

    {/* Improved "What if you could focus only on delivering results..." section */}
    <section className="bg-gradient-to-br from-secondary to-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-20 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="block w-12 h-1 rounded-full bg-primary/80"></span>
            <span className="text-primary font-semibold uppercase text-xs tracking-wide">
              There’s a better way
            </span>
            <span className="block w-12 h-1 rounded-full bg-primary/80"></span>
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 leading-snug mb-4">
            What if you could focus only on delivering results—<br className="hidden md:inline" />
            not chasing clients?
          </h3>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Imagine a platform built for your success, where:</p>
          <ul className="space-y-3 text-base text-gray-700 mb-6 font-medium max-w-xl mx-auto text-left">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-1" />
              You connect effortlessly with pre-qualified eCommerce founders—no more cold outreach.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-1" />
              You command premium rates with clients who value measurable results.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-1" />
              You build a portfolio of verified case studies and outcomes.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary mt-1" />
              You spend your energy on the work that matters—delivering results.
            </li>
          </ul>
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
        <div className="text-center">
          <Button size="lg" className="w-full md:w-auto" variant="default" asChild>
            <Link to="/provider-apply">
              Apply as a Provider
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Email Marketing Specialists Choose Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-secondary rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Pre-qualified Clients</h3>
              <p className="text-gray-700">Connect with eCommerce founders who are ready to invest in email marketing and understand the value of expertise.</p>
            </div>
            <div className="bg-secondary rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">No Client Acquisition Costs</h3>
              <p className="text-gray-700">We handle the marketing, lead generation, and initial qualification so you can focus on what you do best.</p>
            </div>
            <div className="bg-secondary rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Premium Rates</h3>
              <p className="text-gray-700">Command higher rates for your services with clients who value results and understand the ROI of effective email marketing.</p>
            </div>
            <div className="bg-secondary rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">Verified Results</h3>
              <p className="text-gray-700">Build your reputation with verified case studies and success metrics that attract more premium clients.</p>
            </div>
          </div>
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Focus on Results, Not Sales</h3>
                <p className="text-gray-700 mb-6">
                  Stop wasting time and money on client acquisition. We bring pre-qualified 
                  eCommerce founders directly to you, so you can focus on delivering results 
                  rather than constantly chasing new business.
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">Pre-qualified Clients</span>
                </div>
              </div>
              <div className="md:w-1/2 bg-white border shadow-md rounded-lg p-6">
                <h4 className="font-bold text-xl mb-4">Our Client Requirements</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <h5 className="font-medium">Established eCommerce Business</h5>
                      <p className="text-gray-600 text-sm">
                        $10K+ monthly revenue with existing email list
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <h5 className="font-medium">Ready to Invest</h5>
                      <p className="text-gray-600 text-sm">
                        Understand the value of professional email marketing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <h5 className="font-medium">Connected Platforms</h5>
                      <p className="text-gray-600 text-sm">
                        Using major eCommerce platforms and email marketing tools
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <h5 className="font-medium">Growth Mindset</h5>
                      <p className="text-gray-600 text-sm">
                        Looking for long-term relationships with service providers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Earn Premium Rates</h3>
                <p className="text-gray-700 mb-6">
                  Our platform enables you to command higher rates by focusing on value and 
                  guaranteed results. Clients are pre-qualified and understand the ROI of 
                  effective email marketing.
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <Coins className="h-5 w-5" />
                  <span className="font-medium">Value-Based Pricing</span>
                </div>
              </div>
              <div className="md:w-1/2 bg-secondary rounded-lg p-6">
                <h4 className="font-bold text-xl mb-4">Average Project Values</h4>
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded shadow">
                    <div className="text-lg font-bold text-primary">$2,500 - $5,000</div>
                    <div className="text-sm text-gray-700">Initial Setup & Optimization Projects</div>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <div className="text-lg font-bold text-primary">$1,500 - $3,000</div>
                    <div className="text-sm text-gray-700">Monthly Retainers</div>
                  </div>
                  <div className="bg-white p-4 rounded shadow">
                    <div className="text-lg font-bold text-primary">$10,000+</div>
                    <div className="text-sm text-gray-700">Advanced Strategy & Implementation</div>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-2">
                    * Based on average provider earnings on Connect
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Simple Application Process</h3>
                <p className="text-gray-700 mb-6">
                  Our thorough vetting process ensures only the best email marketing 
                  specialists join our platform, maintaining high quality and trustworthiness 
                  for our clients.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="p-4 border-b bg-secondary">
                    <h4 className="font-medium">Application Steps</h4>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex gap-4">
                      <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        1
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Submit Application</h5>
                        <p className="text-gray-600 text-sm">Share your experience, portfolio, and case studies</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        2
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Skills Assessment</h5>
                        <p className="text-gray-600 text-sm">Demonstrate your email marketing expertise</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        3
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Interview</h5>
                        <p className="text-gray-600 text-sm">Discuss your approach and results with our team</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        4
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Onboarding</h5>
                        <p className="text-gray-600 text-sm">Get set up on the platform and start connecting with clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Ready to grow your email marketing business?</h3>
            <Button size="lg" asChild>
              <Link to="/provider-apply">
                Apply as a Provider
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-gray-500 text-sm mt-4">
              Only the top 5% of applicants are accepted to maintain quality
            </p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default ForProvidersPage;

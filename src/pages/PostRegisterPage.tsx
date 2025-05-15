
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronRight, Check, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PostRegisterPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!loading && !user) {
      navigate("/auth");
    } else {
      setLoading(false);
    }
  }, [user, navigate, loading]);

  const completeStep = (stepId: string) => {
    setCompletedSteps((prev) => [...prev, stepId]);
  };

  const isStepCompleted = (stepId: string) => {
    return completedSteps.includes(stepId);
  };

  // Go to appropriate dashboard based on user role
  const goToDashboard = () => {
    if (profile?.role === "provider") {
      navigate("/provider-dashboard");
    } else {
      navigate("/founder-dashboard");
    }
  };

  const userRole = profile?.role || "founder";
  const firstName = profile?.first_name || "there";

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <p>Loading your personalized onboarding...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#0A2342]">Welcome, {firstName}!</h1>
            <p className="text-[#0E3366] mt-2">
              We're excited to have you join Connect as a {userRole === "provider" ? "provider" : "founder"}. 
              Let's get you set up for success.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#2D82B7]/10 p-3 rounded-full">
                  <UserCircle2 className="h-6 w-6 text-[#2D82B7]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#0A2342]">Your Next Steps</h2>
                  <p className="text-sm text-[#0E3366]">Complete these steps to get started</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                {/* Step 1: Complete Your Profile */}
                <StepCard 
                  title="Complete Your Profile"
                  description="Add more details to your profile to help us personalize your experience."
                  isCompleted={isStepCompleted('profile')}
                  onClick={() => {
                    completeStep('profile');
                    navigate(userRole === 'provider' ? '/provider-profile' : '/founder-profile');
                  }}
                />

                {/* Step 2: Qualification or Application */}
                {userRole === "founder" ? (
                  <StepCard 
                    title="Complete Qualification"
                    description="Answer a few questions to help us match you with the right providers."
                    isCompleted={isStepCompleted('qualification')}
                    onClick={() => {
                      completeStep('qualification');
                      navigate('/founder-qualification');
                    }}
                  />
                ) : (
                  <StepCard 
                    title="Complete Provider Application"
                    description="Showcase your skills and expertise to attract potential clients."
                    isCompleted={isStepCompleted('application')}
                    onClick={() => {
                      completeStep('application');
                      navigate('/provider-application');
                    }}
                  />
                )}

                {/* Step 3: Explore Dashboard */}
                <StepCard 
                  title="Explore Your Dashboard"
                  description="Get familiar with your personalized dashboard and available features."
                  isCompleted={isStepCompleted('dashboard')}
                  onClick={() => {
                    completeStep('dashboard');
                    goToDashboard();
                  }}
                />
              </div>

              <div className="mt-8 text-center">
                <Button 
                  onClick={goToDashboard}
                  className="bg-[#2D82B7] hover:bg-[#3D9AD1]"
                >
                  Skip to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-[#0A2342] mb-2">Need Help?</h3>
            <p className="text-[#0E3366] mb-4">
              Our team is here to assist you with any questions or concerns you might have as you get started.
            </p>
            <Button variant="outline" className="text-[#2D82B7] border-[#2D82B7]">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface StepCardProps {
  title: string;
  description: string;
  isCompleted: boolean;
  onClick: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ 
  title, 
  description, 
  isCompleted, 
  onClick 
}) => {
  return (
    <div 
      className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
        isCompleted ? "bg-green-50 border-green-200" : "border-gray-200"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
          isCompleted ? "bg-green-500" : "bg-[#2D82B7]"
        }`}>
          {isCompleted ? (
            <Check className="h-5 w-5 text-white" />
          ) : (
            <span className="text-white font-medium">→</span>
          )}
        </div>
        <div>
          <h3 className="font-medium text-[#0A2342]">{title}</h3>
          <p className="text-sm text-[#0E3366]">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
};

export default PostRegisterPage;

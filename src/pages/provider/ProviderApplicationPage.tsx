
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";

const ProviderApplicationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    business_name: "",
    expertise: "",
    experience_years: "",
    portfolio_url: "",
    linkedin_url: "",
    about: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to submit your application",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Update user profile with provider role and application details
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ 
          role: "provider",
          business_name: form.business_name,
          expertise: form.expertise,
          portfolio_url: form.portfolio_url,
          linkedin_url: form.linkedin_url,
          about: form.about
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast({
        title: "Application submitted!",
        description: "We'll review your application and get back to you soon.",
      });

      // Redirect to provider dashboard
      navigate("/provider-dashboard");
    } catch (error) {
      console.error("Application error:", error);
      toast({
        title: "Application failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Provider Application</h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="business_name" className="text-sm font-medium">
                  Business Name
                </label>
                <Input
                  id="business_name"
                  name="business_name"
                  required
                  value={form.business_name}
                  onChange={handleInput}
                  placeholder="Your agency or business name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="expertise" className="text-sm font-medium">
                  Primary Expertise
                </label>
                <Input
                  id="expertise"
                  name="expertise"
                  required
                  value={form.expertise}
                  onChange={handleInput}
                  placeholder="e.g., Email Marketing, Campaign Strategy"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="experience_years" className="text-sm font-medium">
                  Years of Experience
                </label>
                <Input
                  id="experience_years"
                  name="experience_years"
                  type="number"
                  required
                  value={form.experience_years}
                  onChange={handleInput}
                  placeholder="Years of experience in the field"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="portfolio_url" className="text-sm font-medium">
                  Portfolio URL
                </label>
                <Input
                  id="portfolio_url"
                  name="portfolio_url"
                  type="url"
                  value={form.portfolio_url}
                  onChange={handleInput}
                  placeholder="https://your-portfolio.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="linkedin_url" className="text-sm font-medium">
                  LinkedIn Profile
                </label>
                <Input
                  id="linkedin_url"
                  name="linkedin_url"
                  type="url"
                  value={form.linkedin_url}
                  onChange={handleInput}
                  placeholder="https://linkedin.com/in/your-profile"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="about" className="text-sm font-medium">
                  About Your Services
                </label>
                <Textarea
                  id="about"
                  name="about"
                  required
                  value={form.about}
                  onChange={handleInput}
                  placeholder="Tell us about your experience and the services you offer..."
                  className="h-32"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderApplicationPage;

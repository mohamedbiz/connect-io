
import { ClientAcquisitionFormData } from "../acquisition/AcquisitionContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";

interface DiscoveryCallStepProps {
  formData: ClientAcquisitionFormData;
  updateFormData: (data: Partial<ClientAcquisitionFormData>) => void;
}

export const DiscoveryCallStep = ({ formData, updateFormData }: DiscoveryCallStepProps) => {
  const [isPreparationOpen, setIsPreparationOpen] = useState(true);
  const [isAgendaOpen, setIsAgendaOpen] = useState(false);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);

  const handleBusinessBackgroundUpdate = (field: string, value: string) => {
    updateFormData({
      business_background: {
        ...formData.business_background,
        [field]: value
      }
    });
  };

  const handleEmailMarketingUpdate = (field: string, value: string) => {
    updateFormData({
      current_email: {
        ...formData.current_email,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Discovery Call Structure</h2>
        <p className="text-gray-600 mb-6">
          Prepare for and conduct an effective discovery call with potential clients.
          Document their business background and current email marketing approach.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-5 rounded-lg border">
          <Collapsible open={isPreparationOpen} onOpenChange={setIsPreparationOpen}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium">Pre-Call Preparation Checklist</h3>
              </div>
              <CollapsibleTrigger className="hover:bg-gray-200 rounded-full p-1">
                {isPreparationOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-4">
              <div className="bg-white p-4 rounded border space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" id="review-website" />
                  <label htmlFor="review-website">Review store website thoroughly</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" id="signup-email" />
                  <label htmlFor="signup-email">Sign up for their email list 24-48 hours before call</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" id="document-emails" />
                  <label htmlFor="document-emails">Document all emails received</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" id="social-media" />
                  <label htmlFor="social-media">Check their social media presence</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" id="founder-research" />
                  <label htmlFor="founder-research">Research founder background on LinkedIn</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" id="identify-opportunities" />
                  <label htmlFor="identify-opportunities">Identify 3-5 specific opportunities in their email program</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" id="prepare-slides" />
                  <label htmlFor="prepare-slides">Prepare customized slides if needed</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" id="test-equipment" />
                  <label htmlFor="test-equipment">Test video/audio equipment 10 minutes before call</label>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border">
          <Collapsible open={isAgendaOpen} onOpenChange={setIsAgendaOpen}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium">Discovery Call Agenda</h3>
              </div>
              <CollapsibleTrigger className="hover:bg-gray-200 rounded-full p-1">
                {isAgendaOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-4">
              <div className="space-y-6">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium mb-2 text-sm">Introduction (3 minutes)</h4>
                  <div className="text-sm text-gray-600 whitespace-pre-line">
                    {`Thanks for taking the time to chat today, ${formData.first_name || "[Name]"}. I'm excited to learn more about ${formData.store_name || "[Store Name]"} and share some insights about how we might be able to help improve your email marketing results.

Before we dive in, let me quickly explain who we are and how we work. Connect specializes in matching eCommerce founders like you with pre-vetted email marketing specialists who can deliver guaranteed results within 30 days. Specifically, we guarantee a 200% increase in email-generated sales, 30% reduction in customer churn, and 200% improvement in customer lifetime value.

I'd like to use our time today to learn about your business, understand your current email marketing approach, identify your biggest opportunities, and if it seems like a good fit, explain how our matching process works. How does that sound?`}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Business Background Questions (5 minutes)</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="founding_story">How did you start {formData.store_name || "[Store Name]"} and what's your journey so far?</Label>
                      <Textarea
                        id="founding_story"
                        value={formData.business_background.founding_story}
                        onChange={(e) => handleBusinessBackgroundUpdate('founding_story', e.target.value)}
                        placeholder="Document the founding story"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="best_selling_products">What are your best-selling products right now?</Label>
                      <Textarea
                        id="best_selling_products"
                        value={formData.business_background.best_selling_products}
                        onChange={(e) => handleBusinessBackgroundUpdate('best_selling_products', e.target.value)}
                        placeholder="Document their best-selling products"
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ideal_customer">Who is your ideal customer?</Label>
                      <Textarea
                        id="ideal_customer"
                        value={formData.business_background.ideal_customer}
                        onChange={(e) => handleBusinessBackgroundUpdate('ideal_customer', e.target.value)}
                        placeholder="Document their ideal customer profile"
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="average_order_value">What's your average order value?</Label>
                        <Textarea
                          id="average_order_value"
                          value={formData.business_background.average_order_value}
                          onChange={(e) => handleBusinessBackgroundUpdate('average_order_value', e.target.value)}
                          placeholder="Document their AOV"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="acquisition_channels">What are your main customer acquisition channels?</Label>
                        <Textarea
                          id="acquisition_channels"
                          value={formData.business_background.acquisition_channels}
                          onChange={(e) => handleBusinessBackgroundUpdate('acquisition_channels', e.target.value)}
                          placeholder="Document their acquisition channels"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="business_goals">What are your biggest business goals for the next 6-12 months?</Label>
                      <Textarea
                        id="business_goals"
                        value={formData.business_background.business_goals}
                        onChange={(e) => handleBusinessBackgroundUpdate('business_goals', e.target.value)}
                        placeholder="Document their business goals"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Current Email Marketing Assessment (5 minutes)</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="platform">What email platform are you currently using?</Label>
                        <Textarea
                          id="platform"
                          value={formData.current_email.platform}
                          onChange={(e) => handleEmailMarketingUpdate('platform', e.target.value)}
                          placeholder="Document their email platform"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="working_well">What's working well in your email marketing right now?</Label>
                        <Textarea
                          id="working_well"
                          value={formData.current_email.working_well}
                          onChange={(e) => handleEmailMarketingUpdate('working_well', e.target.value)}
                          placeholder="Document what's working well"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="not_working">What's not working as well as you'd like?</Label>
                        <Textarea
                          id="not_working"
                          value={formData.current_email.not_working}
                          onChange={(e) => handleEmailMarketingUpdate('not_working', e.target.value)}
                          placeholder="Document what's not working well"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="revenue_percentage">What percentage of your revenue currently comes from email?</Label>
                        <Textarea
                          id="revenue_percentage"
                          value={formData.current_email.revenue_percentage}
                          onChange={(e) => handleEmailMarketingUpdate('revenue_percentage', e.target.value)}
                          placeholder="Document revenue percentage from email"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="previous_experience">Have you worked with email marketing specialists before? What was that experience like?</Label>
                      <Textarea
                        id="previous_experience"
                        value={formData.current_email.previous_experience}
                        onChange={(e) => handleEmailMarketingUpdate('previous_experience', e.target.value)}
                        placeholder="Document their previous experience with specialists"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border">
          <Collapsible open={isFollowUpOpen} onOpenChange={setIsFollowUpOpen}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-medium">Post-Call Follow-Up</h3>
              </div>
              <CollapsibleTrigger className="hover:bg-gray-200 rounded-full p-1">
                {isFollowUpOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-4">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium mb-2 text-sm">Follow-Up Email Template</h4>
                <div className="text-sm text-gray-600 whitespace-pre-line">
                  {`Subject: Next Steps Following Our Conversation

Hi ${formData.first_name || "[First Name]"},

Thank you for taking the time to speak with me today about ${formData.store_name || "[Store Name]"}'s email marketing program. I enjoyed learning about [reference something specific from the call] and appreciate your insights on [another reference from the call].

Based on our conversation, I believe there's significant opportunity to improve your results through:

1. [Specific opportunity #1]
2. [Specific opportunity #2]
3. [Specific opportunity #3]

Next Steps:
[If they agreed to assessment]
I've attached the assessment agreement for your review. Once signed, we'll begin our comprehensive analysis of your email program and have results for you within 3 business days.

[If they didn't agree to assessment]
I respect your decision to hold off on the assessment at this time. As promised, I've attached a brief resource on [topic relevant to their challenges] that might be helpful.

If you have any questions or would like to revisit the conversation in the future, please don't hesitate to reach out.

Best regards,
[Your Name]
Founder, Connect
[Phone Number]
[LinkedIn Profile]`}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

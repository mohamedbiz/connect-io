
import { ClientAcquisitionFormData } from "../acquisition/AcquisitionContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, Linkedin } from "lucide-react";

interface InitialOutreachStepProps {
  formData: ClientAcquisitionFormData;
  updateFormData: (data: Partial<ClientAcquisitionFormData>) => void;
}

export const InitialOutreachStep = ({ formData, updateFormData }: InitialOutreachStepProps) => {
  const [isEmailOpen, setIsEmailOpen] = useState(true);
  const [isLinkedInOpen, setIsLinkedInOpen] = useState(false);
  const [isColdCallOpen, setIsColdCallOpen] = useState(false);

  const handleTypeChange = (value: string) => {
    updateFormData({ outreach_type: value as "email" | "linkedin" | "cold_call" | "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Initial Outreach Templates</h2>
        <p className="text-gray-600 mb-6">
          Use these templates to reach out to potential clients through different channels.
          Customize the templates with the client's information.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="store_name">Store Name</Label>
            <Input
              id="store_name"
              value={formData.store_name}
              onChange={(e) => updateFormData({ store_name: e.target.value })}
              placeholder="Enter store name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="first_name">Client's First Name</Label>
            <Input
              id="first_name"
              value={formData.first_name}
              onChange={(e) => updateFormData({ first_name: e.target.value })}
              placeholder="Enter client's first name"
              className="mt-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="specific_observation">Specific Observation</Label>
            <Textarea
              id="specific_observation"
              value={formData.specific_observation}
              onChange={(e) => updateFormData({ specific_observation: e.target.value })}
              placeholder="Enter a specific observation about their store"
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="niche">Store Niche/Industry</Label>
            <Input
              id="niche"
              value={formData.niche}
              onChange={(e) => updateFormData({ niche: e.target.value })}
              placeholder="Enter store niche or industry"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="email" onValueChange={handleTypeChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email">Email Template</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn Template</TabsTrigger>
          <TabsTrigger value="cold_call">Cold Call Script</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="space-y-4 pt-4">
          <div className="bg-gray-50 p-5 rounded-lg border">
            <Collapsible open={isEmailOpen} onOpenChange={setIsEmailOpen}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-medium">Email Outreach Template</h3>
                </div>
                <CollapsibleTrigger className="hover:bg-gray-200 rounded-full p-1">
                  {isEmailOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-2">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border text-sm">
                    <p className="font-medium mb-2">Subject Line Options:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>{formData.store_name}: 200% Sales Increase from Your Email Marketing in 30 Days</li>
                      <li>Guaranteed Results for {formData.store_name}'s Email Marketing</li>
                      <li>[Mutual Connection] suggested I reach out about your email program</li>
                    </ul>
                    
                    <p className="font-medium mt-4 mb-2">Email Body:</p>
                    <div className="whitespace-pre-line">
                      {`Hi ${formData.first_name || "[First Name]"},

I noticed ${formData.specific_observation || "[specific observation about their store/email program]"} while reviewing ${formData.store_name || "[Store Name]"}'s customer journey.

Based on our analysis of [number] similar eCommerce stores in the ${formData.niche || "[niche]"} space, there's a significant opportunity to improve your email marketing results in three specific areas:

1. [Specific observation about abandoned cart sequence or lack thereof]
2. [Specific observation about post-purchase nurturing]
3. [Specific observation about customer winback/retention]

We specialize in connecting eCommerce founders like you with pre-vetted email marketing specialists who guarantee specific results within 30 days:
• 200% increase in email-generated sales
• 30% reduction in customer churn
• 200% improvement in customer lifetime value

If these numbers sound interesting, I'd love to schedule a quick 20-minute call to share our analysis of your specific opportunities and explain how our guarantee works.

Would [Day] at [Time] or [Day] at [Time] work for a brief conversation?

Best regards,
[Your Name]
Founder, Connect
[Phone Number]
[LinkedIn Profile]

P.S. We recently helped [similar store in their niche] achieve [specific result]. Happy to share the case study during our call.`}
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </TabsContent>
        
        <TabsContent value="linkedin" className="space-y-4 pt-4">
          <div className="bg-gray-50 p-5 rounded-lg border">
            <Collapsible open={isLinkedInOpen} onOpenChange={setIsLinkedInOpen}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-medium">LinkedIn Outreach Template</h3>
                </div>
                <CollapsibleTrigger className="hover:bg-gray-200 rounded-full p-1">
                  {isLinkedInOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-2">
                <div className="bg-white p-4 rounded border text-sm">
                  <div className="whitespace-pre-line">
                    {`Hi ${formData.first_name || "[First Name]"},

I noticed ${formData.store_name || "[Store Name]"} while researching successful ${formData.niche || "[niche]"} brands, and wanted to reach out about your email marketing program.

We help eCommerce founders like you achieve a guaranteed 200% increase in email-generated sales within 30 days by connecting you with pre-vetted email marketing specialists.

I've analyzed your current setup and see 3 specific opportunities for immediate improvement. Would you be open to a quick 20-min call where I can share this analysis at no cost?

[Your Name]
Founder, Connect`}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </TabsContent>
        
        <TabsContent value="cold_call" className="space-y-4 pt-4">
          <div className="bg-gray-50 p-5 rounded-lg border">
            <Collapsible open={isColdCallOpen} onOpenChange={setIsColdCallOpen}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-medium">Cold Call Script</h3>
                </div>
                <CollapsibleTrigger className="hover:bg-gray-200 rounded-full p-1">
                  {isColdCallOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-2">
                <div className="bg-white p-4 rounded border text-sm">
                  <div className="whitespace-pre-line">
                    {`Hi ${formData.first_name || "[First Name]"}, this is [Your Name] from Connect.

[If voicemail]: I'm reaching out because we've helped several ${formData.niche || "[niche]"} eCommerce brands like ${formData.store_name || "[Store Name]"} increase their email-generated revenue by 200% within 30 days. I've analyzed your current email program and identified some specific opportunities for improvement. I'd love to share this analysis with you on a quick call. You can reach me at [phone number] or I'll try you again later this week.

[If live]: Do you have a moment to chat? [If yes, continue]

I'm reaching out because we specialize in helping eCommerce founders like you achieve guaranteed results with email marketing. We've helped several brands in the ${formData.niche || "[niche]"} space increase their email-generated revenue by 200% within 30 days.

I've taken a look at your current email program and noticed a few opportunities:
[Mention 1-2 specific observations]

Would you be interested in a quick 20-minute call where I can share a more detailed analysis and explain how our guarantee works?

[If yes, schedule call]

[If no, ask about pain points]: I understand. Just out of curiosity, what's your biggest challenge with email marketing right now?`}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

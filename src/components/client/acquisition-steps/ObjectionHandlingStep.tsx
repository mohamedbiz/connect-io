
import { ChevronDown, ChevronUp } from "lucide-react";
import { ClientAcquisitionFormData } from "../acquisition/AcquisitionContext";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ObjectionHandlingStepProps {
  formData: ClientAcquisitionFormData;
  updateFormData: (data: Partial<ClientAcquisitionFormData>) => void;
}

export const ObjectionHandlingStep = ({ formData, updateFormData }: ObjectionHandlingStepProps) => {
  const [openObjections, setOpenObjections] = useState<Record<string, boolean>>({
    "expensive": true,
    "specialists": false,
    "hire": false,
    "think": false,
    "time": false,
    "guarantee": false,
    "agency": false,
    "myself": false,
    "good": false
  });

  const toggleObjection = (objection: string) => {
    setOpenObjections(prev => ({
      ...prev,
      [objection]: !prev[objection]
    }));
  };

  const objections = [
    {
      id: "expensive",
      title: "It's too expensive.",
      response: `"I understand budget considerations are important. Let me ask: what's the monthly value of your average customer? [Get answer]

If we can increase your email-generated revenue by 200%, that would mean approximately $[calculated amount] in additional monthly revenue. Our fee is just a fraction of that additional revenue, and it's a one-time investment rather than an ongoing cost.

Plus, our guarantee means there's no financial risk to you. If we don't deliver the promised results, you don't pay the final 50%. Would it help if I shared a specific ROI calculation based on your numbers?"`
    },
    {
      id: "specialists",
      title: "I've tried email marketing specialists before and didn't see results.",
      response: `"That's a valid concern, and unfortunately, it's common in our industry. There are a few key differences in our approach:

1. Our specialists are rigorously vetted - we accept less than 5% of applicants
2. We match you specifically with someone who has experience in your niche and with your exact challenges
3. We provide project management oversight to ensure quality
4. Most importantly, we guarantee specific results - a 200% increase in email revenue within 30 days

If we don't deliver, you don't pay the final 50%. This aligns our incentives completely with your success.

May I ask what specifically didn't work with your previous specialist?"`
    },
    {
      id: "hire",
      title: "I can just hire someone directly.",
      response: `"You absolutely could, and for some businesses, that's the right approach. There are a few advantages to working with Connect:

1. Vetting - we've already screened hundreds of specialists to find the top performers
2. Matching - our process ensures you get someone with specific experience in your niche
3. Risk reduction - our guarantee means you only pay if you get results
4. Time savings - we handle all the recruitment, management, and quality control
5. Results verification - we provide objective measurement of performance

The real question is value of your time. How much time would it take you to find, vet, hire, and manage a specialist? And what's the cost if you choose the wrong one?

Our service is designed for founders who want guaranteed results without the time investment of finding and managing the right specialist."`
    },
    {
      id: "think",
      title: "I want to think about it.",
      response: `"I completely understand wanting to give this proper consideration. To help with your decision, what specific information would be most helpful for you to have?

Also, since timing can impact results, I'd be happy to reserve a spot with one of our specialists who has specific experience with [their niche/challenge] for the next [timeframe], while you make your decision.

Would it be helpful if I shared a case study from a similar business to yours that outlines exactly what we did and the results they achieved?"`
    },
    {
      id: "time",
      title: "I don't have time to focus on this right now.",
      response: `"I understand how busy you are running your business. That's actually one of the main benefits of our service - we handle everything with minimal time required from you.

After the initial kickoff call (about 60 minutes), you'll only need about 15-30 minutes per week for updates and approvals. The specialist handles all the implementation work.

Many of our clients specifically choose us because they don't have time to focus on optimizing their email marketing, but they know it's costing them revenue.

When do you think would be a better time to focus on increasing your email revenue? And what would need to change between now and then?"`
    },
    {
      id: "guarantee",
      title: "How can you guarantee results when you don't know my business?",
      response: `"That's an excellent question. Our guarantee is based on three key factors:

1. Our assessment process - we've already analyzed your current email program and identified specific opportunities based on data
2. Our specialist matching - we'll pair you with someone who has specific experience in your niche and with your exact challenges
3. Our track record - we've implemented similar improvements across [number] eCommerce businesses with consistent results

We don't guarantee results for every business that approaches us. In fact, if during our assessment we determine we can't deliver the guaranteed improvement, we'll refund your assessment fee and tell you exactly why.

Would it be helpful to see the specific analysis we've done of your current email program and the opportunities we've identified?"`
    },
    {
      id: "agency",
      title: "I'm already working with an agency.",
      response: `"I understand you have an existing relationship. May I ask how that's working for you and what results you're seeing?

Many of our clients come to us while working with agencies that handle multiple marketing channels. The difference is our specialists focus exclusively on email marketing optimization with guaranteed results.

We're not looking to replace your agency - in fact, we can work alongside them, focusing specifically on improving your email marketing results while they continue managing other channels.

Would it be worth exploring whether we could complement your current agency relationship with our specialized email marketing expertise?"`
    },
    {
      id: "myself",
      title: "I'll just do it myself.",
      response: `"That's definitely an option, and if you have the expertise and time, it might be the right approach for you.

Many of our clients are quite knowledgeable about email marketing but choose to work with us because:
1. Time constraints - implementing these improvements requires significant time
2. Specialized expertise - our specialists live and breathe email marketing for your specific niche
3. Guaranteed results - we're accountable for delivering specific outcomes
4. Faster implementation - we can implement all improvements within 30 days

If you decide to do it yourself, I'd be happy to share a few resources that might help. And if you find you don't have the time to fully implement the changes, we're here to help."`
    },
    {
      id: "good",
      title: "How do I know your specialists are any good?",
      response: `"That's a critical question. Our specialists undergo a rigorous vetting process:

1. Initial application with portfolio review
2. Technical assessment of their email marketing skills
3. Case study verification of past results
4. Client reference checks
5. Test project to verify quality of work

We accept less than 5% of applicants to our network. Each specialist must demonstrate:
• At least 3 years of email marketing experience
• Specific expertise in eCommerce
• Documented results from past clients
• Excellent communication skills
• Reliability and professionalism

I'd be happy to share anonymous profiles of a few specialists who might be a good fit for your business, including their past results and client testimonials."`
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Objection Handling Guide</h2>
        <p className="text-gray-600 mb-6">
          Be prepared to address common client objections with effective responses.
          These scripts will help you overcome hesitations and move the sales process forward.
        </p>
      </div>

      <div className="space-y-4">
        {objections.map((objection) => (
          <div key={objection.id} className="bg-white p-5 rounded-lg border shadow-sm">
            <Collapsible open={openObjections[objection.id]} onOpenChange={() => toggleObjection(objection.id)}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{`"${objection.title}"`}</h3>
                <CollapsibleTrigger className="hover:bg-gray-200 rounded-full p-1">
                  {openObjections[objection.id] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-4">
                <div className="bg-gray-50 p-4 rounded border text-gray-700 whitespace-pre-line">
                  {objection.response}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
};

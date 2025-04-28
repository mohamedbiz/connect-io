
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Folder, FileText } from "lucide-react";

export const ProviderResources = () => {
  return (
    <Tabs defaultValue="outreach">
      <TabsList className="mb-4">
        <TabsTrigger value="outreach">Initial Outreach</TabsTrigger>
        <TabsTrigger value="discovery">Discovery Call</TabsTrigger>
        <TabsTrigger value="objections">Objection Handling</TabsTrigger>
        <TabsTrigger value="proposals">Proposal Templates</TabsTrigger>
      </TabsList>
      
      <TabsContent value="outreach" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Initial Outreach Templates</CardTitle>
                <CardDescription>
                  Email templates to help you make a strong first impression
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h4 className="font-medium text-base mb-2">Cold Email Template</h4>
              <div className="bg-gray-50 p-4 rounded-md border text-sm">
                <p className="mb-2"><strong>Subject:</strong> Improving [Store Name]'s Email Revenue</p>
                <p className="mb-1">Hi [Name],</p>
                <p className="mb-1">I noticed [specific observation about their store] and thought you might be interested in how similar stores have improved their email marketing revenue.</p>
                <p className="mb-1">Working with brands like [similar brand], we've helped achieve [specific result]. Would you be open to a quick 15-minute chat about how we might be able to help [Store Name]?</p>
                <p className="mb-1">Best,<br />[Your Name]</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-base mb-2">LinkedIn Connection Template</h4>
              <div className="bg-gray-50 p-4 rounded-md border text-sm">
                <p className="mb-1">Hi [Name],</p>
                <p className="mb-1">I help eCommerce brands like [similar brand] increase revenue through strategic email marketing. I noticed [specific observation] and thought we might be able to help [their company] too.</p>
                <p className="mb-1">Would love to connect!</p>
                <p className="mb-1">[Your Name]</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="discovery" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Discovery Call Framework</CardTitle>
                <CardDescription>
                  Question frameworks to understand client needs
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h4 className="font-medium text-base mb-2">Key Questions to Ask</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>What are your current email marketing KPIs and goals?</li>
                <li>What's working well in your current email strategy?</li>
                <li>What are the biggest challenges you're facing?</li>
                <li>What would success look like for you in the next 3-6 months?</li>
                <li>Have you worked with email marketing specialists before? How was that experience?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-base mb-2">Call Structure</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Introduction and rapport building (2-3 minutes)</li>
                <li>Discovery questions about their business (5-7 minutes)</li>
                <li>Deep dive into current email strategy (10 minutes)</li>
                <li>Initial thoughts and potential approaches (5 minutes)</li>
                <li>Next steps and timeline discussion (3-5 minutes)</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="objections" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Objection Handling Guide</CardTitle>
                <CardDescription>
                  Strategies for addressing common client concerns
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-base mb-2">"It's too expensive"</h4>
                <p className="text-sm">
                  "I understand budget concerns are important. Can we discuss the ROI you'd expect to see? For most of our clients, email marketing generates $X for every $1 spent, making it one of the highest-ROI channels available."
                </p>
              </div>
              <div>
                <h4 className="font-medium text-base mb-2">"We've tried email marketing before"</h4>
                <p className="text-sm">
                  "I'd love to hear more about your previous experience. What worked well? What didn't? Many of our clients had tried email marketing before working with us, but weren't implementing [specific strategies] that have made the difference for their results."
                </p>
              </div>
              <div>
                <h4 className="font-medium text-base mb-2">"We can do it in-house"</h4>
                <p className="text-sm">
                  "That's definitely an option! Many businesses do handle email marketing internally. However, our specialized expertise often accelerates results and prevents common pitfalls. Would it be helpful to discuss the specific advantages we bring compared to an in-house approach?"
                </p>
              </div>
              <div>
                <h4 className="font-medium text-base mb-2">"Let me think about it"</h4>
                <p className="text-sm">
                  "Of course, this is an important decision. To help you make the best choice, what specific questions or concerns would be most helpful to address now? Would it be useful to see a case study from a similar business to yours?"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="proposals" className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <Folder className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Proposal Templates</CardTitle>
                <CardDescription>
                  Customizable proposal frameworks for different client types
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <h4 className="font-medium text-base mb-2">Proposal Structure</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li><strong>Executive Summary:</strong> Brief overview of client needs and proposed solution</li>
                  <li><strong>Current Situation Analysis:</strong> Observations about current email program</li>
                  <li><strong>Recommended Approach:</strong> Specific strategies and implementations</li>
                  <li><strong>Expected Outcomes:</strong> Projected results and KPIs</li>
                  <li><strong>Timeline & Investment:</strong> Project phases and pricing options</li>
                  <li><strong>About Us:</strong> Relevant experience and testimonials</li>
                  <li><strong>Next Steps:</strong> Clear call to action</li>
                </ol>
              </div>
              <div>
                <h4 className="font-medium text-base mb-2">Value-Based Pricing Tips</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Focus on ROI rather than hours worked</li>
                  <li>Present multiple pricing tiers with clear value differences</li>
                  <li>Include specific success metrics tied to their business goals</li>
                  <li>Consider performance-based components for long-term engagements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

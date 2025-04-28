
import { ClientAcquisitionFormData } from "../acquisition/AcquisitionContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProposalGenerationStepProps {
  formData: ClientAcquisitionFormData;
  updateFormData: (data: Partial<ClientAcquisitionFormData>) => void;
}

export const ProposalGenerationStep = ({ formData, updateFormData }: ProposalGenerationStepProps) => {
  const [activeTab, setActiveTab] = useState("current");

  const handleStrengthsUpdate = (index: number, value: string) => {
    const updatedStrengths = [...formData.proposal.strengths];
    updatedStrengths[index] = value;
    
    updateFormData({
      proposal: {
        ...formData.proposal,
        strengths: updatedStrengths
      }
    });
  };

  const handleOpportunitiesUpdate = (index: number, value: string) => {
    const updatedOpportunities = [...formData.proposal.opportunities];
    updatedOpportunities[index] = value;
    
    updateFormData({
      proposal: {
        ...formData.proposal,
        opportunities: updatedOpportunities
      }
    });
  };

  const handleInvestmentUpdate = (value: string) => {
    updateFormData({
      proposal: {
        ...formData.proposal,
        investment_amount: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Proposal Generation</h2>
        <p className="text-gray-600 mb-6">
          Create a comprehensive proposal based on your analysis and identified opportunities.
          This proposal will outline your recommended approach and expected results.
        </p>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <div className="flex -mb-px space-x-8">
          <button
            onClick={() => setActiveTab("current")}
            className={`py-2 border-b-2 font-medium text-sm ${
              activeTab === "current"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Current Situation
          </button>
          <button
            onClick={() => setActiveTab("recommended")}
            className={`py-2 border-b-2 font-medium text-sm ${
              activeTab === "recommended"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Recommended Solution
          </button>
          <button
            onClick={() => setActiveTab("investment")}
            className={`py-2 border-b-2 font-medium text-sm ${
              activeTab === "investment"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Investment & Guarantee
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`py-2 border-b-2 font-medium text-sm ${
              activeTab === "cases"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Case Studies
          </button>
        </div>
      </div>

      {activeTab === "current" && (
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Current Situation Analysis</h3>
            
            <div className="bg-white p-5 rounded-lg border shadow-sm">
              <h4 className="text-lg font-medium mb-4">Strengths</h4>
              <div className="space-y-3">
                {formData.proposal.strengths.map((strength, index) => (
                  <div key={index}>
                    <Label htmlFor={`strength_${index}`}>{`Strength ${index + 1}`}</Label>
                    <Textarea
                      id={`strength_${index}`}
                      value={strength}
                      onChange={(e) => handleStrengthsUpdate(index, e.target.value)}
                      placeholder={`Specific strength #${index + 1}`}
                      className="mt-1"
                    />
                  </div>
                ))}
                {formData.proposal.strengths.length < 5 && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      updateFormData({
                        proposal: {
                          ...formData.proposal,
                          strengths: [...formData.proposal.strengths, ""]
                        }
                      });
                    }}
                  >
                    Add Another Strength
                  </Button>
                )}
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border shadow-sm">
              <h4 className="text-lg font-medium mb-4">Opportunities</h4>
              <div className="space-y-3">
                {formData.proposal.opportunities.map((opportunity, index) => (
                  <div key={index}>
                    <Label htmlFor={`opportunity_${index}`}>{`Opportunity ${index + 1}`}</Label>
                    <Textarea
                      id={`opportunity_${index}`}
                      value={opportunity}
                      onChange={(e) => handleOpportunitiesUpdate(index, e.target.value)}
                      placeholder={`Specific opportunity #${index + 1}`}
                      className="mt-1"
                    />
                  </div>
                ))}
                {formData.proposal.opportunities.length < 5 && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      updateFormData({
                        proposal: {
                          ...formData.proposal,
                          opportunities: [...formData.proposal.opportunities, ""]
                        }
                      });
                    }}
                  >
                    Add Another Opportunity
                  </Button>
                )}
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border shadow-sm">
              <h4 className="text-lg font-medium mb-4">Key Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Current email revenue</Label>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      $
                    </span>
                    <Input
                      type="text"
                      className="rounded-l-none"
                      placeholder="Amount/month"
                      value={formData.opportunities.current_monthly_revenue}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <Label>Email contribution to total revenue</Label>
                  <div className="flex mt-1">
                    <Input
                      type="text"
                      className="rounded-r-none"
                      placeholder="Percentage"
                      value={formData.current_email.revenue_percentage}
                      readOnly
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      %
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Industry benchmark</Label>
                  <div className="flex mt-1">
                    <Input
                      type="text"
                      className="rounded-r-none"
                      placeholder="Percentage"
                      value={formData.opportunities.industry_benchmark}
                      readOnly
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      %
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Potential monthly revenue increase</Label>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      $
                    </span>
                    <Input
                      type="text"
                      className="rounded-l-none"
                      placeholder="Amount"
                      value={formData.opportunities.projected_increase}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "recommended" && (
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Recommended Solution</h3>
            
            <div className="bg-white p-5 rounded-lg border shadow-sm space-y-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="space-y-4 pb-5 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <h4 className="text-lg font-medium">{`Recommendation ${index}`}</h4>
                  
                  <div>
                    <Label>{`Specific recommendation #${index}`}</Label>
                    <Input 
                      placeholder="Enter recommendation title"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Detail points</Label>
                    <div className="space-y-2 mt-1">
                      <Textarea 
                        placeholder="Detail point 1"
                        rows={2}
                      />
                      <Textarea 
                        placeholder="Detail point 2"
                        rows={2}
                      />
                      <Button variant="outline" size="sm">Add Detail</Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Expected impact</Label>
                    <Textarea 
                      placeholder="Describe the expected impact"
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-5 rounded-lg border shadow-sm">
              <h4 className="text-lg font-medium mb-4">Implementation Process</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">1. Specialist Matching (Week 1)</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Introduction to your dedicated specialist</li>
                    <li>Detailed kickoff and strategy session</li>
                    <li>Access provision and project planning</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">2. Implementation Phase (Weeks 2-3)</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Development of new email sequences</li>
                    <li>Setup of improved segmentation</li>
                    <li>Implementation of technical improvements</li>
                    <li>Testing and quality assurance</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">3. Optimization Phase (Week 4)</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Performance monitoring</li>
                    <li>A/B testing of key elements</li>
                    <li>Refinement based on initial results</li>
                    <li>Final adjustments for maximum impact</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">4. Results Verification (End of Week 4)</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Comprehensive performance analysis</li>
                    <li>ROI calculation and documentation</li>
                    <li>Strategy for maintaining improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "investment" && (
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Investment & Guarantee</h3>
            
            <div className="bg-white p-5 rounded-lg border shadow-sm">
              <h4 className="text-lg font-medium mb-4">Investment</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="assessment_fee">Assessment Fee</Label>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      $
                    </span>
                    <Input
                      id="assessment_fee"
                      type="text"
                      className="rounded-l-none"
                      value="500"
                      readOnly
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Applied to project cost if the client proceeds</p>
                </div>
                <div>
                  <Label htmlFor="project_fee">Project Fee</Label>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      $
                    </span>
                    <Input
                      id="project_fee"
                      type="text"
                      className="rounded-l-none"
                      value={formData.proposal.investment_amount}
                      onChange={(e) => handleInvestmentUpdate(e.target.value)}
                      placeholder="2,500-5,000 depending on scope"
                    />
                  </div>
                </div>
                <div>
                  <Label>Payment Terms</Label>
                  <p className="text-sm text-gray-600">50% upon project initiation, 50% upon results verification</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg border shadow-sm">
              <h4 className="text-lg font-medium mb-4">Our Guarantee</h4>
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="font-medium text-green-800 mb-2">We guarantee a 200% increase in email-generated revenue within 30 days of implementation.</p>
                <p className="text-sm text-green-700">If we fail to achieve this result, you'll receive:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-green-700">
                  <li>A full refund of the project fee</li>
                  <li>A detailed analysis of what didn't work</li>
                  <li>Recommendations for alternative approaches</li>
                </ul>
                <p className="text-sm text-green-700 mt-3">This guarantee is backed by our track record of successful implementations across numerous eCommerce businesses.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "cases" && (
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Case Studies</h3>
            
            <div className="bg-white p-5 rounded-lg border shadow-sm space-y-6">
              {[1, 2].map((index) => (
                <div key={index} className="space-y-4 pb-5 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <h4 className="text-lg font-medium">{`Case Study ${index}`}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Case Study Title</Label>
                      <Input 
                        placeholder="Enter case study title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Business Type/Niche</Label>
                      <Input 
                        placeholder="Enter business type or niche"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Challenge</Label>
                    <Textarea 
                      placeholder="Describe the challenge faced by the client"
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label>Solution</Label>
                    <Textarea 
                      placeholder="Describe the solution implemented"
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label>Results</Label>
                    <Textarea 
                      placeholder="Describe the specific metrics achieved"
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline">Add Another Case Study</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

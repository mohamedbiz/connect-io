
import { ClientAcquisitionFormData } from "../acquisition/AcquisitionContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OpportunityIdentificationStepProps {
  formData: ClientAcquisitionFormData;
  updateFormData: (data: Partial<ClientAcquisitionFormData>) => void;
}

export const OpportunityIdentificationStep = ({ formData, updateFormData }: OpportunityIdentificationStepProps) => {
  const [newOpportunity, setNewOpportunity] = useState({
    name: "",
    effort: "Medium" as "Low" | "Medium" | "High",
    impact: "Medium" as "Low" | "Medium" | "High",
    priority_score: 5
  });

  const handleOpportunityUpdate = (field: string, value: string) => {
    updateFormData({
      opportunities: {
        ...formData.opportunities,
        [field]: value
      }
    });
  };

  const handleNewOpportunityChange = (field: string, value: any) => {
    setNewOpportunity(prev => ({
      ...prev,
      [field]: value,
      priority_score: calculatePriorityScore(
        field === "effort" ? value : prev.effort,
        field === "impact" ? value : prev.impact
      )
    }));
  };

  const calculatePriorityScore = (effort: string, impact: string) => {
    const effortScore = { "Low": 3, "Medium": 2, "High": 1 };
    const impactScore = { "Low": 1, "Medium": 2, "High": 3 };
    return (effortScore[effort as keyof typeof effortScore] * impactScore[impact as keyof typeof impactScore]);
  };

  const addOpportunity = () => {
    if (!newOpportunity.name) return;

    updateFormData({
      opportunities: {
        ...formData.opportunities,
        priority_opportunities: [
          ...formData.opportunities.priority_opportunities,
          { ...newOpportunity }
        ]
      }
    });

    setNewOpportunity({
      name: "",
      effort: "Medium",
      impact: "Medium",
      priority_score: 5
    });
  };

  const removeOpportunity = (index: number) => {
    const updatedOpportunities = [...formData.opportunities.priority_opportunities];
    updatedOpportunities.splice(index, 1);
    
    updateFormData({
      opportunities: {
        ...formData.opportunities,
        priority_opportunities: updatedOpportunities
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Opportunity Identification Framework</h2>
        <p className="text-gray-600 mb-6">
          Identify and prioritize opportunities for improvement in the client's email marketing program.
          Use the revenue opportunity calculation to quantify the potential impact.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Revenue Opportunity Calculation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="current_monthly_revenue">Current monthly email revenue ($)</Label>
              <Input
                id="current_monthly_revenue"
                value={formData.opportunities.current_monthly_revenue}
                onChange={(e) => handleOpportunityUpdate('current_monthly_revenue', e.target.value)}
                placeholder="e.g., 5000"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="industry_benchmark">Industry benchmark for email revenue (%)</Label>
              <Input
                id="industry_benchmark"
                value={formData.opportunities.industry_benchmark}
                onChange={(e) => handleOpportunityUpdate('industry_benchmark', e.target.value)}
                placeholder="e.g., 25"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="revenue_gap">Gap between current and potential ($)</Label>
              <Input
                id="revenue_gap"
                value={formData.opportunities.revenue_gap}
                onChange={(e) => handleOpportunityUpdate('revenue_gap', e.target.value)}
                placeholder="e.g., 7500"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="projected_increase">Projected 200% increase value ($)</Label>
              <Input
                id="projected_increase"
                value={formData.opportunities.projected_increase}
                onChange={(e) => handleOpportunityUpdate('projected_increase', e.target.value)}
                placeholder="e.g., 10000"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Priority Opportunity Matrix</h3>
          
          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opportunity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Effort to Implement
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Potential Impact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority Score
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.opportunities.priority_opportunities.map((opportunity, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {opportunity.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {opportunity.effort}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {opportunity.impact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {opportunity.priority_score}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          className="text-red-600 hover:text-red-900" 
                          onClick={() => removeOpportunity(index)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input
                        placeholder="New opportunity"
                        value={newOpportunity.name}
                        onChange={(e) => handleNewOpportunityChange('name', e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select 
                        value={newOpportunity.effort} 
                        onValueChange={(value) => handleNewOpportunityChange('effort', value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Effort" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select 
                        value={newOpportunity.impact} 
                        onValueChange={(value) => handleNewOpportunityChange('impact', value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Impact" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {newOpportunity.priority_score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button onClick={addOpportunity}>Add</Button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Top 3 Recommended Improvements</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-white p-5 rounded-lg border shadow-sm">
                <Label htmlFor={`improvement_${num}`}>{num}. Recommended Improvement</Label>
                <Textarea
                  id={`improvement_${num}`}
                  placeholder={`Highest priority improvement #${num} with specific details`}
                  className="mt-2"
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProviderApplicationFormData } from "../ProviderApplicationForm";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react";

interface CaseStudiesStepProps {
  formData: ProviderApplicationFormData;
  updateFormData: (data: Partial<ProviderApplicationFormData>) => void;
}

export const CaseStudiesStep = ({ formData, updateFormData }: CaseStudiesStepProps) => {
  const updateCaseStudy = (index: number, field: string, value: string) => {
    const updatedCaseStudies = [...formData.case_studies];
    updatedCaseStudies[index] = {
      ...updatedCaseStudies[index],
      [field]: value
    };
    
    updateFormData({ case_studies: updatedCaseStudies });
  };
  
  const addCaseStudy = () => {
    if (formData.case_studies.length < 3) {
      const updatedCaseStudies = [...formData.case_studies];
      updatedCaseStudies.push({
        client_industry: "",
        project_duration: "",
        initial_situation: "",
        implemented_solutions: "",
        results_achieved: "",
        reference_contact: ""
      });
      
      updateFormData({ case_studies: updatedCaseStudies });
    }
  };
  
  const removeCaseStudy = (index: number) => {
    if (formData.case_studies.length > 1) {
      const updatedCaseStudies = [...formData.case_studies];
      updatedCaseStudies.splice(index, 1);
      
      updateFormData({ case_studies: updatedCaseStudies });
    }
  };

  const updateSampleWork = (index: number, value: string) => {
    const updatedSampleWork = [...formData.sample_work];
    updatedSampleWork[index] = value;
    
    updateFormData({ sample_work: updatedSampleWork });
  };
  
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold mb-4">Case Studies</h2>
        <p className="text-gray-600 mb-6">
          Please provide details for at least 2 recent client projects that showcase your expertise.
        </p>
      </div>

      {formData.case_studies.map((caseStudy, index) => (
        <div key={index} className="border rounded-lg p-5 space-y-4 mb-8 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Case Study {index + 1}</h3>
            {index > 0 && (
              <Button 
                type="button"
                variant="ghost" 
                size="sm"
                onClick={() => removeCaseStudy(index)}
                className="text-destructive hover:text-destructive/90"
              >
                <MinusCircle className="h-4 w-4 mr-1" />
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`client_industry_${index}`} className="required">Client Industry</Label>
              <Input 
                id={`client_industry_${index}`} 
                value={caseStudy.client_industry}
                onChange={(e) => updateCaseStudy(index, "client_industry", e.target.value)}
                placeholder="e.g. Beauty & Cosmetics"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`project_duration_${index}`} className="required">Project Duration</Label>
              <Input 
                id={`project_duration_${index}`} 
                value={caseStudy.project_duration}
                onChange={(e) => updateCaseStudy(index, "project_duration", e.target.value)}
                placeholder="e.g. 3 months"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`initial_situation_${index}`} className="required">Initial Situation</Label>
            <Textarea 
              id={`initial_situation_${index}`} 
              value={caseStudy.initial_situation}
              onChange={(e) => updateCaseStudy(index, "initial_situation", e.target.value)}
              placeholder="Describe the client's situation before your involvement"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`implemented_solutions_${index}`} className="required">Implemented Solutions</Label>
            <Textarea 
              id={`implemented_solutions_${index}`} 
              value={caseStudy.implemented_solutions}
              onChange={(e) => updateCaseStudy(index, "implemented_solutions", e.target.value)}
              placeholder="Describe the strategies and solutions you implemented"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`results_achieved_${index}`} className="required">Results Achieved</Label>
            <Textarea 
              id={`results_achieved_${index}`} 
              value={caseStudy.results_achieved}
              onChange={(e) => updateCaseStudy(index, "results_achieved", e.target.value)}
              placeholder="Describe the specific results and improvements achieved"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`reference_contact_${index}`}>Reference Contact (if available)</Label>
            <Input 
              id={`reference_contact_${index}`} 
              value={caseStudy.reference_contact}
              onChange={(e) => updateCaseStudy(index, "reference_contact", e.target.value)}
              placeholder="Name, email or phone (only with their permission)"
            />
          </div>
        </div>
      ))}

      {formData.case_studies.length < 3 && (
        <Button 
          type="button"
          variant="outline" 
          onClick={addCaseStudy}
          className="w-full"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Another Case Study
        </Button>
      )}

      <div className="space-y-4 mt-8">
        <h3 className="font-semibold text-lg">Sample Work</h3>
        <p className="text-sm text-gray-600">
          Please provide links to 2-3 examples of email campaigns or sequences you've created.
        </p>

        {formData.sample_work.map((sample, index) => (
          <div className="space-y-2" key={index}>
            <Label htmlFor={`sample_work_${index}`} className={index < 2 ? "required" : ""}>
              Sample {index + 1}
            </Label>
            <Input 
              id={`sample_work_${index}`} 
              value={sample}
              onChange={(e) => updateSampleWork(index, e.target.value)}
              placeholder="https://example.com/campaign"
              required={index < 2}
            />
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};

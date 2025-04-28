
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";
import { isSectionComplete, SectionStatus } from "./reviewUtils";

interface CaseStudiesSectionProps {
  formData: ProviderApplicationFormData;
}

export const CaseStudiesSection = ({ formData }: CaseStudiesSectionProps) => {
  const isComplete = isSectionComplete("caseStudies", formData);
  
  return (
    <div className="border rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">4. Case Studies</h3>
        <SectionStatus isComplete={isComplete} />
      </div>

      <div className="space-y-4 text-sm">
        {formData.case_studies.length > 0 ? (
          <div className="space-y-4">
            {formData.case_studies.map((cs, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded">
                <h4 className="font-medium mb-2">Case Study {index + 1}: {cs.client_industry}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">Project Duration</span>
                    <div>{cs.project_duration || "Not provided"}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-gray-500">Results</span>
                    <div className="line-clamp-2">{cs.results_achieved || "Not provided"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No case studies provided</div>
        )}
        
        <div>
          <span className="font-medium text-gray-700">Sample Work:</span>
          <div className="space-y-1 mt-1">
            {formData.sample_work.some(sample => !!sample) ? (
              formData.sample_work.map((sample, index) => (
                sample && (
                  <div key={index} className="truncate">
                    <a href={sample} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block">
                      {sample}
                    </a>
                  </div>
                )
              ))
            ) : (
              <div>No sample work provided</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

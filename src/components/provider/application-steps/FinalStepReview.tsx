
import { ProviderApplicationFormData } from "../ProviderApplicationForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check } from "lucide-react";

interface FinalStepReviewProps {
  formData: ProviderApplicationFormData;
}

export const FinalStepReview = ({ formData }: FinalStepReviewProps) => {
  // Function to check if the section is complete
  const isSectionComplete = (section: string): boolean => {
    switch (section) {
      case "personal":
        return !!formData.full_name && 
               !!formData.phone_number && 
               !!formData.location &&
               !!formData.linkedin_url;
      case "professional":
        return !!formData.years_experience && 
               formData.email_platforms.length > 0 && 
               formData.ecommerce_platforms.length > 0;
      case "expertise":
        return formData.expertise_areas.length > 0 && 
               formData.industries.length > 0 &&
               !!formData.average_revenue_increase &&
               !!formData.average_conversion_increase &&
               !!formData.average_churn_reduction;
      case "caseStudies":
        return formData.case_studies.length >= 2 &&
               formData.case_studies.every(cs => 
                 !!cs.client_industry && 
                 !!cs.project_duration &&
                 !!cs.initial_situation &&
                 !!cs.implemented_solutions &&
                 !!cs.results_achieved
               );
      case "workApproach":
        return !!formData.availability &&
               !!formData.typical_timeline &&
               !!formData.communication_preferences &&
               !!formData.project_management_tools &&
               !!formData.performance_guarantee &&
               formData.technical_assessment &&
               !!formData.referral_source;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold mb-4">Review Your Application</h2>
        <p className="text-gray-600 mb-6">
          Please review your information before submitting. You can go back to any section to make changes.
        </p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">1. Personal Information</h3>
            {isSectionComplete("personal") ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Check className="h-3 w-3 mr-1" /> Complete
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">Incomplete</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Full Name:</span>
              <div className="mt-1">{formData.full_name || "Not provided"}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Phone Number:</span>
              <div className="mt-1">{formData.phone_number || "Not provided"}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Location:</span>
              <div className="mt-1">{formData.location || "Not provided"}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">LinkedIn:</span>
              <div className="mt-1 truncate">
                {formData.linkedin_url ? (
                  <a href={formData.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block">
                    {formData.linkedin_url}
                  </a>
                ) : (
                  "Not provided"
                )}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Portfolio:</span>
              <div className="mt-1 truncate">
                {formData.portfolio_url ? (
                  <a href={formData.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block">
                    {formData.portfolio_url}
                  </a>
                ) : (
                  "Not provided"
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">2. Professional Experience</h3>
            {isSectionComplete("professional") ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Check className="h-3 w-3 mr-1" /> Complete
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">Incomplete</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Years Experience:</span>
              <div className="mt-1">{formData.years_experience || "Not provided"}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Email Platforms:</span>
              <div className="mt-1">
                {formData.email_platforms.length > 0 ? 
                  formData.email_platforms.join(", ") + 
                  (formData.email_platforms.includes("Other") ? ` (${formData.email_platforms_other})` : "") 
                  : "None selected"}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">eCommerce Platforms:</span>
              <div className="mt-1">
                {formData.ecommerce_platforms.length > 0 ? 
                  formData.ecommerce_platforms.join(", ") + 
                  (formData.ecommerce_platforms.includes("Other") ? ` (${formData.ecommerce_platforms_other})` : "") 
                  : "None selected"}
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">3. Expertise & Specialization</h3>
            {isSectionComplete("expertise") ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Check className="h-3 w-3 mr-1" /> Complete
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">Incomplete</span>
            )}
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Areas of Expertise:</span>
              <div className="mt-1">
                {formData.expertise_areas.length > 0 ? 
                  formData.expertise_areas.join(", ") + 
                  (formData.expertise_areas.includes("Other") ? ` (${formData.expertise_other})` : "") 
                  : "None selected"}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Industry Experience:</span>
              <div className="mt-1">
                {formData.industries.length > 0 ? 
                  formData.industries.join(", ") + 
                  (formData.industries.includes("Other") ? ` (${formData.industries_other})` : "") 
                  : "None selected"}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Average Results:</span>
              <div className="grid grid-cols-3 gap-4 mt-1">
                <div>
                  <span className="text-xs text-gray-500">Email Revenue Increase</span>
                  <div className="font-semibold">{formData.average_revenue_increase}%</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Conversion Rate Improvement</span>
                  <div className="font-semibold">{formData.average_conversion_increase}%</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Churn Rate Reduction</span>
                  <div className="font-semibold">{formData.average_churn_reduction}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">4. Case Studies</h3>
            {isSectionComplete("caseStudies") ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Check className="h-3 w-3 mr-1" /> Complete
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">Incomplete</span>
            )}
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

        <div className="border rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">5. Work Approach</h3>
            {isSectionComplete("workApproach") ? (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Check className="h-3 w-3 mr-1" /> Complete
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">Incomplete</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Availability:</span>
              <div className="mt-1">{formData.availability || "Not provided"} hours/week</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Typical Timeline:</span>
              <div className="mt-1">{formData.typical_timeline || "Not provided"}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Communication:</span>
              <div className="mt-1">{formData.communication_preferences || "Not provided"}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Project Management Tools:</span>
              <div className="mt-1">{formData.project_management_tools || "Not provided"}</div>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-gray-700">Performance Guarantee:</span>
              <div className="mt-1">
                {formData.performance_guarantee === "yes" && "Yes, I can work under this guarantee"}
                {formData.performance_guarantee === "no" && "No, I cannot work under this guarantee"}
                {formData.performance_guarantee === "conditional" && 
                  `Yes, with conditions: ${formData.performance_guarantee_conditions}`}
              </div>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-gray-700">Referral Source:</span>
              <div className="mt-1">
                {formData.referral_source || "Not provided"} 
                {formData.referral_source && formData.referral_source !== "LinkedIn" && formData.referral_details ? 
                  ` (${formData.referral_details})` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {(!isSectionComplete("personal") || 
        !isSectionComplete("professional") || 
        !isSectionComplete("expertise") || 
        !isSectionComplete("caseStudies") || 
        !isSectionComplete("workApproach")) && (
        <Alert variant="destructive" className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Incomplete Application</AlertTitle>
          <AlertDescription>
            Please go back and complete all required fields before submitting your application.
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-gray-50 p-5 rounded-lg border mt-6">
        <h4 className="font-medium">Next Steps</h4>
        <ol className="mt-2 space-y-2 text-sm pl-5 list-decimal">
          <li>Our team will review your application (1-2 business days)</li>
          <li>If selected, you'll receive a technical assessment to complete</li>
          <li>Interview with our team</li>
          <li>Reference checks</li>
          <li>Final decision</li>
        </ol>
        <p className="text-sm mt-4 text-gray-600">
          By submitting this application, you confirm that all information provided is accurate and that you're interested in joining our network of email marketing specialists.
        </p>
      </div>
    </div>
  );
};

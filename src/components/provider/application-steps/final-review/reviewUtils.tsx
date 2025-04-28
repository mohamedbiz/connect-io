
import React from 'react';
import { ProviderApplicationFormData } from "../../ProviderApplicationForm";

export const isSectionComplete = (section: string, formData: ProviderApplicationFormData): boolean => {
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

export const SectionStatus = ({ isComplete }: { isComplete: boolean }) => {
  return isComplete ? (
    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1"><polyline points="20 6 9 17 4 12"></polyline></svg>
      Complete
    </span>
  ) : (
    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">Incomplete</span>
  );
};

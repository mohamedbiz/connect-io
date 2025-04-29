
import { ClientAcquisitionFormData } from "../../acquisition/AcquisitionContext";
import { PlatformSelector } from "./PlatformSelector";
import { ExperienceLevelSelector } from "./ExperienceLevelSelector";
import { CampaignTypesSelector } from "./CampaignTypesSelector";
import { EmailFlowsSelector } from "./EmailFlowsSelector";
import { ChallengesInput } from "./ChallengesInput";
import { RevenuePercentageSelector } from "./RevenuePercentageSelector";

interface EmailMarketingNeedsStepProps {
  formData: ClientAcquisitionFormData;
  updateFormData: (data: Partial<ClientAcquisitionFormData>) => void;
}

export const EmailMarketingNeedsStep = ({ formData, updateFormData }: EmailMarketingNeedsStepProps) => {
  const handleEmailUpdate = (field: string, value: any) => {
    updateFormData({
      email_needs: {
        ...formData.email_needs,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Email Marketing Needs</h2>
        <p className="text-gray-600 mb-6">
          Help us understand your current email marketing situation and what you're looking to improve.
        </p>
      </div>

      <div className="space-y-6">
        <PlatformSelector 
          value={formData.email_needs?.platform || ""} 
          onChange={(value) => handleEmailUpdate("platform", value)} 
        />
        
        <ExperienceLevelSelector 
          value={formData.email_needs?.experience_level || ""} 
          onChange={(value) => handleEmailUpdate("experience_level", value)} 
        />

        <CampaignTypesSelector 
          selectedTypes={formData.email_needs?.campaign_types || []} 
          onChange={(types) => handleEmailUpdate("campaign_types", types)} 
        />
        
        <EmailFlowsSelector 
          selectedFlows={formData.email_needs?.needed_flows || []} 
          onChange={(flows) => handleEmailUpdate("needed_flows", flows)} 
        />
        
        <ChallengesInput 
          value={formData.email_needs?.challenges || ""} 
          onChange={(value) => handleEmailUpdate("challenges", value)} 
        />
        
        <RevenuePercentageSelector 
          value={formData.email_needs?.revenue_percentage || ""} 
          onChange={(value) => handleEmailUpdate("revenue_percentage", value)} 
        />
      </div>
    </div>
  );
};

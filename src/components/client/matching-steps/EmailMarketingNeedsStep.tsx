
import { ClientAcquisitionFormData } from "../acquisition/AcquisitionContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

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

  const toggleCampaignType = (type: string) => {
    const currentTypes = formData.email_needs?.campaign_types || [];
    let newTypes;
    
    if (currentTypes.includes(type)) {
      newTypes = currentTypes.filter(t => t !== type);
    } else {
      newTypes = [...currentTypes, type];
    }
    
    handleEmailUpdate('campaign_types', newTypes);
  };

  const toggleFlow = (flow: string) => {
    const currentFlows = formData.email_needs?.needed_flows || [];
    let newFlows;
    
    if (currentFlows.includes(flow)) {
      newFlows = currentFlows.filter(f => f !== flow);
    } else {
      newFlows = [...currentFlows, flow];
    }
    
    handleEmailUpdate('needed_flows', newFlows);
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
        <div>
          <Label htmlFor="platform">Current Email Marketing Platform</Label>
          <Select 
            value={formData.email_needs?.platform || ""} 
            onValueChange={(value) => handleEmailUpdate("platform", value)}
          >
            <SelectTrigger id="platform" className="mt-1">
              <SelectValue placeholder="Select your current platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="klaviyo">Klaviyo</SelectItem>
              <SelectItem value="mailchimp">Mailchimp</SelectItem>
              <SelectItem value="omnisend">Omnisend</SelectItem>
              <SelectItem value="active_campaign">Active Campaign</SelectItem>
              <SelectItem value="hubspot">HubSpot</SelectItem>
              <SelectItem value="none">Not using any</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="experience_level">Your Email Marketing Experience Level</Label>
          <Select 
            value={formData.email_needs?.experience_level || ""} 
            onValueChange={(value) => handleEmailUpdate("experience_level", value)}
          >
            <SelectTrigger id="experience_level" className="mt-1">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner - Just getting started</SelectItem>
              <SelectItem value="intermediate">Intermediate - Have some campaigns running</SelectItem>
              <SelectItem value="advanced">Advanced - Good understanding but want to improve</SelectItem>
              <SelectItem value="expert">Expert - Looking for specialized help only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Campaign Types You're Interested In</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="newsletters" 
                checked={formData.email_needs?.campaign_types?.includes('newsletters') || false}
                onCheckedChange={() => toggleCampaignType('newsletters')} 
              />
              <Label htmlFor="newsletters" className="cursor-pointer">Newsletters</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="promotional" 
                checked={formData.email_needs?.campaign_types?.includes('promotional') || false}
                onCheckedChange={() => toggleCampaignType('promotional')} 
              />
              <Label htmlFor="promotional" className="cursor-pointer">Promotional Campaigns</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="seasonal" 
                checked={formData.email_needs?.campaign_types?.includes('seasonal') || false}
                onCheckedChange={() => toggleCampaignType('seasonal')} 
              />
              <Label htmlFor="seasonal" className="cursor-pointer">Seasonal Campaigns</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="product_launches" 
                checked={formData.email_needs?.campaign_types?.includes('product_launches') || false}
                onCheckedChange={() => toggleCampaignType('product_launches')} 
              />
              <Label htmlFor="product_launches" className="cursor-pointer">Product Launches</Label>
            </div>
          </div>
        </div>
        
        <div>
          <Label className="mb-2 block">Automated Flows You Need Help With</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="welcome" 
                checked={formData.email_needs?.needed_flows?.includes('welcome') || false}
                onCheckedChange={() => toggleFlow('welcome')} 
              />
              <Label htmlFor="welcome" className="cursor-pointer">Welcome Series</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="abandoned_cart" 
                checked={formData.email_needs?.needed_flows?.includes('abandoned_cart') || false}
                onCheckedChange={() => toggleFlow('abandoned_cart')} 
              />
              <Label htmlFor="abandoned_cart" className="cursor-pointer">Abandoned Cart</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="browse_abandonment" 
                checked={formData.email_needs?.needed_flows?.includes('browse_abandonment') || false}
                onCheckedChange={() => toggleFlow('browse_abandonment')} 
              />
              <Label htmlFor="browse_abandonment" className="cursor-pointer">Browse Abandonment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="post_purchase" 
                checked={formData.email_needs?.needed_flows?.includes('post_purchase') || false}
                onCheckedChange={() => toggleFlow('post_purchase')} 
              />
              <Label htmlFor="post_purchase" className="cursor-pointer">Post-Purchase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="winback" 
                checked={formData.email_needs?.needed_flows?.includes('winback') || false}
                onCheckedChange={() => toggleFlow('winback')} 
              />
              <Label htmlFor="winback" className="cursor-pointer">Customer Winback</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="review_request" 
                checked={formData.email_needs?.needed_flows?.includes('review_request') || false} 
                onCheckedChange={() => toggleFlow('review_request')} 
              />
              <Label htmlFor="review_request" className="cursor-pointer">Review Request</Label>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="current_challenges">Current Email Marketing Challenges</Label>
          <Textarea
            id="current_challenges"
            value={formData.email_needs?.challenges || ""}
            onChange={(e) => handleEmailUpdate("challenges", e.target.value)}
            placeholder="What are your biggest challenges with email marketing right now?"
            className="mt-1"
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="revenue_percentage">Current Email Revenue (%)</Label>
          <Select 
            value={formData.email_needs?.revenue_percentage || ""} 
            onValueChange={(value) => handleEmailUpdate("revenue_percentage", value)}
          >
            <SelectTrigger id="revenue_percentage" className="mt-1">
              <SelectValue placeholder="What percentage of your revenue comes from email?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less_than_5">Less than 5%</SelectItem>
              <SelectItem value="5_10">5-10%</SelectItem>
              <SelectItem value="10_20">10-20%</SelectItem>
              <SelectItem value="20_30">20-30%</SelectItem>
              <SelectItem value="over_30">Over 30%</SelectItem>
              <SelectItem value="not_sure">Not sure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

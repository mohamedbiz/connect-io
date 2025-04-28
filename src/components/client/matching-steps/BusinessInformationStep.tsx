
import { ClientAcquisitionFormData } from "../acquisition/AcquisitionContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface BusinessInformationStepProps {
  formData: ClientAcquisitionFormData;
  updateFormData: (data: Partial<ClientAcquisitionFormData>) => void;
}

export const BusinessInformationStep = ({ formData, updateFormData }: BusinessInformationStepProps) => {
  const handleBusinessUpdate = (field: string, value: string) => {
    updateFormData({
      business_info: {
        ...formData.business_info,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Business Information</h2>
        <p className="text-gray-600 mb-6">
          Tell us about your business so we can match you with the most suitable email marketing specialists.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="store_name">Store Name</Label>
          <Input
            id="store_name"
            value={formData.store_name}
            onChange={(e) => updateFormData({ store_name: e.target.value })}
            placeholder="Enter your store or business name"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="niche">Business Niche/Industry</Label>
          <Select 
            value={formData.business_info?.industry || ""} 
            onValueChange={(value) => handleBusinessUpdate("industry", value)}
          >
            <SelectTrigger id="niche" className="mt-1">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fashion">Fashion & Apparel</SelectItem>
              <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="home">Home & Kitchen</SelectItem>
              <SelectItem value="electronics">Electronics & Gadgets</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
              <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
              <SelectItem value="pet">Pet Supplies</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {formData.business_info?.industry === "other" && (
          <div>
            <Label htmlFor="other_industry">Please specify</Label>
            <Input
              id="other_industry"
              value={formData.business_info?.other_industry || ""}
              onChange={(e) => handleBusinessUpdate("other_industry", e.target.value)}
              placeholder="Enter your specific industry"
              className="mt-1"
            />
          </div>
        )}
        
        <div>
          <Label htmlFor="monthly_revenue">Monthly Revenue Range</Label>
          <Select 
            value={formData.business_info?.monthly_revenue || ""} 
            onValueChange={(value) => handleBusinessUpdate("monthly_revenue", value)}
          >
            <SelectTrigger id="monthly_revenue" className="mt-1">
              <SelectValue placeholder="Select your monthly revenue range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less_than_10k">Less than $10,000</SelectItem>
              <SelectItem value="10k_50k">$10,000 - $50,000</SelectItem>
              <SelectItem value="50k_100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k_500k">$100,000 - $500,000</SelectItem>
              <SelectItem value="over_500k">Over $500,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="customer_description">Describe your ideal customer</Label>
          <Textarea
            id="customer_description"
            value={formData.business_info?.ideal_customer || ""}
            onChange={(e) => handleBusinessUpdate("ideal_customer", e.target.value)}
            placeholder="Describe your typical customer demographic, interests, and behaviors"
            className="mt-1"
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="business_goals">Business Goals for Next 6 Months</Label>
          <Textarea
            id="business_goals"
            value={formData.business_info?.goals || ""}
            onChange={(e) => handleBusinessUpdate("goals", e.target.value)}
            placeholder="What are you trying to achieve with your business in the next 6 months?"
            className="mt-1"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

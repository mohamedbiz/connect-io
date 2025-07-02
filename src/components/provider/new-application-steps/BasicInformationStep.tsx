
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface BasicInformationStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

const EMAIL_MARKETING_EXPERTISE = [
  "Strategy",
  "Automation Setup",
  "Copywriting",
  "Design",
  "Deliverability",
  "List Management",
  "Analytics & Reporting"
];

export const BasicInformationStep = ({ formData, updateFormData }: BasicInformationStepProps) => {
  const handleExpertiseChange = (expertise: string, checked: boolean) => {
    const updated = checked 
      ? [...formData.email_marketing_expertise, expertise]
      : formData.email_marketing_expertise.filter(e => e !== expertise);
    updateFormData({ email_marketing_expertise: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#0A2342]">Professional Background</h2>
        <p className="text-gray-600 mb-6">
          Help us understand your experience and expertise in email marketing for eCommerce businesses.
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          This information will be used to evaluate your fit for delivering best results for eCommerce brands.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="full_name" 
            value={formData.full_name}
            onChange={(e) => updateFormData({ full_name: e.target.value })}
            placeholder="Enter your full name"
            required
            className={!formData.full_name ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.full_name && (
            <p className="text-xs text-red-600">Full name is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="email" 
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="your.email@example.com"
            required
            className={!formData.email ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.email && (
            <p className="text-xs text-red-600">Email address is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location (Country/Timezone) <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="location" 
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="City, Country or Timezone"
            required
            className={!formData.location ? "border-red-300 focus:border-red-500" : ""}
          />
          {!formData.location && (
            <p className="text-xs text-red-600">Location is required</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="years_email_marketing" className="text-sm font-medium">
            Years of Experience in Email Marketing <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.years_email_marketing} 
            onValueChange={(value) => updateFormData({ years_email_marketing: value })}
          >
            <SelectTrigger className={!formData.years_email_marketing ? "border-red-300" : ""}>
              <SelectValue placeholder="Select years of experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0-1 years</SelectItem>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
          {!formData.years_email_marketing && (
            <p className="text-xs text-red-600">Please select your experience level</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="years_ecommerce_experience" className="text-sm font-medium">
            Years of Experience Working with eCommerce/DTC Brands <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.years_ecommerce_experience} 
            onValueChange={(value) => updateFormData({ years_ecommerce_experience: value })}
          >
            <SelectTrigger className={!formData.years_ecommerce_experience ? "border-red-300" : ""}>
              <SelectValue placeholder="Select eCommerce experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0-1 years</SelectItem>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
          {!formData.years_ecommerce_experience && (
            <p className="text-xs text-red-600">Please select your eCommerce experience</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Primary Areas of Email Marketing Expertise <span className="text-red-500">*</span>
          </Label>
          <p className="text-xs text-gray-600 mb-3">Select all areas where you have hands-on expertise</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EMAIL_MARKETING_EXPERTISE.map(expertise => (
              <div key={expertise} className="flex items-center space-x-2">
                <Checkbox
                  id={expertise}
                  checked={formData.email_marketing_expertise.includes(expertise)}
                  onCheckedChange={(checked) => handleExpertiseChange(expertise, checked as boolean)}
                />
                <Label htmlFor={expertise} className="text-sm">{expertise}</Label>
              </div>
            ))}
          </div>
          
          {formData.email_marketing_expertise.length === 0 && (
            <p className="text-xs text-red-600">Please select at least one expertise area</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="average_client_revenue" className="text-sm font-medium">
            Average Client Revenue Range <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.average_client_revenue} 
            onValueChange={(value) => updateFormData({ average_client_revenue: value })}
          >
            <SelectTrigger className={!formData.average_client_revenue ? "border-red-300" : ""}>
              <SelectValue placeholder="Select average client revenue range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<$1M">Less than $1M</SelectItem>
              <SelectItem value="$1-5M">$1M - $5M</SelectItem>
              <SelectItem value="$5-10M">$5M - $10M</SelectItem>
              <SelectItem value="$10M+">$10M+</SelectItem>
            </SelectContent>
          </Select>
          {!formData.average_client_revenue && (
            <p className="text-xs text-red-600">Please select average client revenue range</p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
        <p className="text-sm text-gray-700">
          Next, we'll collect information about your professional presence and portfolio links.
        </p>
      </div>

      <div className="text-sm text-gray-500 mt-6">
        <span className="text-red-500">*</span> Required fields
      </div>
    </div>
  );
};

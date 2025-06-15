
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { NewProviderApplicationData } from "../application/NewApplicationContext";

interface BasicInformationStepProps {
  formData: NewProviderApplicationData;
  updateFormData: (data: Partial<NewProviderApplicationData>) => void;
}

export const BasicInformationStep = ({ formData, updateFormData }: BasicInformationStepProps) => {
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
            Location <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="location" 
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="City, Country"
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

        <div className="space-y-2">
          <Label htmlFor="connect_interest" className="text-sm font-medium">
            Why are you interested in the Connect platform specifically? <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="connect_interest" 
            value={formData.connect_interest}
            onChange={(e) => updateFormData({ connect_interest: e.target.value })}
            placeholder="Explain your interest in joining Connect (100 words max)"
            required
            rows={3}
            maxLength={500}
            className={!formData.connect_interest ? "border-red-300 focus:border-red-500" : ""}
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {formData.connect_interest?.length || 0}/500 characters (≈100 words max)
            </div>
          </div>
          {!formData.connect_interest && (
            <p className="text-xs text-red-600">Please explain your interest in Connect</p>
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

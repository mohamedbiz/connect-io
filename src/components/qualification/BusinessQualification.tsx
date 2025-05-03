
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { QualificationFormData, ECOMMERCE_PLATFORMS, PRODUCT_MARGIN_RANGES } from "@/types/qualification";

interface BusinessQualificationProps {
  formData: QualificationFormData;
  updateFormData: (field: keyof QualificationFormData, value: string | number | boolean | null) => void;
}

const BusinessQualification = ({ formData, updateFormData }: BusinessQualificationProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#0A2342]">Business Qualification</h3>
      <p className="text-sm text-[#0E3366]">
        Please provide information about your eCommerce business to help us better understand your needs.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="revenue-threshold">Monthly Revenue (USD)</Label>
          <Input
            id="revenue-threshold"
            type="number"
            placeholder="10000"
            value={formData.revenue_threshold || ""}
            onChange={e => updateFormData("revenue_threshold", e.target.value ? parseInt(e.target.value, 10) : null)}
          />
          <p className="text-xs text-[#0E3366]/80">Minimum $10K/month recommended</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ecommerce-platform">eCommerce Platform</Label>
          <Select
            value={formData.ecommerce_platform || ""}
            onValueChange={value => updateFormData("ecommerce_platform", value)}
          >
            <SelectTrigger id="ecommerce-platform">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {ECOMMERCE_PLATFORMS.map(platform => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthly-traffic">Monthly Website Visitors</Label>
          <Input
            id="monthly-traffic"
            type="number"
            placeholder="1000"
            value={formData.monthly_traffic || ""}
            onChange={e => updateFormData("monthly_traffic", e.target.value ? parseInt(e.target.value, 10) : null)}
          />
          <p className="text-xs text-[#0E3366]/80">Minimum 1,000+ visitors recommended</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-margins">Product Margins</Label>
          <Select
            value={formData.product_margins || ""}
            onValueChange={value => updateFormData("product_margins", value)}
          >
            <SelectTrigger id="product-margins">
              <SelectValue placeholder="Select margin range" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_MARGIN_RANGES.map(range => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox
            id="growth-mindset"
            checked={formData.growth_mindset}
            onCheckedChange={(checked) => updateFormData("growth_mindset", checked === true)}
          />
          <div className="space-y-1">
            <Label htmlFor="growth-mindset" className="font-normal">
              I have a growth mindset and am willing to invest in optimization and follow recommendations
            </Label>
            <p className="text-xs text-[#0E3366]/80">
              Successful email marketing requires commitment to implementing best practices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessQualification;

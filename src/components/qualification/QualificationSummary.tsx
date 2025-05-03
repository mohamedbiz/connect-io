
import { Check, X } from "lucide-react";
import { QualificationFormData, ECOMMERCE_PLATFORMS, PRODUCT_MARGIN_RANGES } from "@/types/qualification";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface QualificationSummaryProps {
  formData: QualificationFormData;
}

const QualificationSummary = ({ formData }: QualificationSummaryProps) => {
  const getPlatformName = (value: string | null) => {
    if (!value) return "Not selected";
    const platform = ECOMMERCE_PLATFORMS.find(p => p.value === value);
    return platform ? platform.label : value;
  };

  const getMarginRange = (value: string | null) => {
    if (!value) return "Not selected";
    const range = PRODUCT_MARGIN_RANGES.find(r => r.value === value);
    return range ? range.label : value;
  };

  const isBusinessQualified = 
    (formData.revenue_threshold != null && formData.revenue_threshold >= 10000) &&
    formData.ecommerce_platform != null &&
    (formData.monthly_traffic != null && formData.monthly_traffic >= 1000) &&
    formData.product_margins != null &&
    formData.growth_mindset;

  const isProjectQualified =
    formData.project_scope != null &&
    formData.project_scope.length >= 10 &&
    formData.accepts_timeframe &&
    formData.is_decision_maker &&
    formData.accepts_performance_based;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#0A2342]">Qualification Summary</h3>
      <p className="text-sm text-[#0E3366] mb-4">
        Please review your qualification information before submission.
      </p>

      {(!isBusinessQualified || !isProjectQualified) && (
        <Alert className="bg-amber-50 border-amber-300 mb-6">
          <AlertTitle className="text-amber-800">Some information is missing or below recommendations</AlertTitle>
          <AlertDescription className="text-amber-700">
            We recommend meeting all qualification criteria for the best provider matches and results.
            However, you can still proceed if needed.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            Business Qualification
            {isBusinessQualified ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <X className="w-5 h-5 text-amber-500" />
            )}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Monthly Revenue</p>
              <p className="text-sm text-[#0E3366]">
                ${formData.revenue_threshold?.toLocaleString() || "Not specified"}
                {formData.revenue_threshold != null && formData.revenue_threshold < 10000 && (
                  <span className="text-amber-500 ml-2">(Below recommendation)</span>
                )}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">eCommerce Platform</p>
              <p className="text-sm text-[#0E3366]">{getPlatformName(formData.ecommerce_platform)}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Monthly Visitors</p>
              <p className="text-sm text-[#0E3366]">
                {formData.monthly_traffic?.toLocaleString() || "Not specified"}
                {formData.monthly_traffic != null && formData.monthly_traffic < 1000 && (
                  <span className="text-amber-500 ml-2">(Below recommendation)</span>
                )}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Product Margins</p>
              <p className="text-sm text-[#0E3366]">{getMarginRange(formData.product_margins)}</p>
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-1">
              <p className="text-sm font-medium">Growth Mindset</p>
              <p className="text-sm text-[#0E3366]">
                {formData.growth_mindset ? "Yes, willing to invest and follow recommendations" : "No"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            Project Qualification
            {isProjectQualified ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <X className="w-5 h-5 text-amber-500" />
            )}
          </h4>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Project Scope</p>
            <p className="text-sm text-[#0E3366] bg-gray-50 p-3 rounded-md">
              {formData.project_scope || "Not provided"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">30-day Implementation</p>
              <p className="text-sm text-[#0E3366]">{formData.accepts_timeframe ? "Accepted" : "Not accepted"}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Decision Maker</p>
              <p className="text-sm text-[#0E3366]">{formData.is_decision_maker ? "Yes" : "No"}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Performance-based Compensation</p>
              <p className="text-sm text-[#0E3366]">{formData.accepts_performance_based ? "Open to discuss" : "Not interested"}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium">Portfolio/Case Study Use</p>
              <p className="text-sm text-[#0E3366]">{formData.allows_portfolio_use ? "Willing to consider" : "Not interested"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationSummary;

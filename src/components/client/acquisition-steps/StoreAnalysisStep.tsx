
import { ClientAcquisitionFormData } from "../acquisition/AcquisitionContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface StoreAnalysisStepProps {
  formData: ClientAcquisitionFormData;
  updateFormData: (data: Partial<ClientAcquisitionFormData>) => void;
}

export const StoreAnalysisStep = ({ formData, updateFormData }: StoreAnalysisStepProps) => {
  const handleTechnicalAssessmentUpdate = (field: string, value: boolean) => {
    updateFormData({
      technical_assessment: {
        ...formData.technical_assessment,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Store Analysis Checklist</h2>
        <p className="text-gray-600 mb-6">
          Complete a comprehensive analysis of the client's store and email marketing program.
          This analysis will help identify opportunities for improvement and inform your proposal.
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-xl font-medium">Email Program Technical Assessment</h3>
          
          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Platform Evaluation</Label>
                  <p className="text-sm text-gray-500">
                    Review their email platform, integration, tracking, and segmentation
                  </p>
                </div>
                <Switch 
                  checked={formData.technical_assessment.platform_evaluation}
                  onCheckedChange={(checked) => handleTechnicalAssessmentUpdate('platform_evaluation', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">List Health Assessment</Label>
                  <p className="text-sm text-gray-500">
                    Analyze subscriber count, growth rate, segmentation, and engagement metrics
                  </p>
                </div>
                <Switch 
                  checked={formData.technical_assessment.list_health}
                  onCheckedChange={(checked) => handleTechnicalAssessmentUpdate('list_health', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Automated Flow Assessment</Label>
                  <p className="text-sm text-gray-500">
                    Evaluate welcome, abandoned cart, browse abandonment, and post-purchase sequences
                  </p>
                </div>
                <Switch 
                  checked={formData.technical_assessment.flow_assessment}
                  onCheckedChange={(checked) => handleTechnicalAssessmentUpdate('flow_assessment', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Campaign Assessment</Label>
                  <p className="text-sm text-gray-500">
                    Review frequency, content quality, subject lines, CTAs, and design
                  </p>
                </div>
                <Switch 
                  checked={formData.technical_assessment.campaign_assessment}
                  onCheckedChange={(checked) => handleTechnicalAssessmentUpdate('campaign_assessment', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Performance Metrics Assessment</Label>
                  <p className="text-sm text-gray-500">
                    Analyze email revenue, conversion rates, AOV from email, and ROI
                  </p>
                </div>
                <Switch 
                  checked={formData.technical_assessment.performance_metrics}
                  onCheckedChange={(checked) => handleTechnicalAssessmentUpdate('performance_metrics', checked)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Email Program Analysis Findings</h3>
          
          <div className="bg-white p-5 rounded-lg border shadow-sm">
            <div className="space-y-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-medium">Website Evaluation</span>
                  <span className="text-xs font-medium text-blue-600 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="user-experience" />
                    <label htmlFor="user-experience" className="text-sm">Overall user experience</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="mobile-responsive" />
                    <label htmlFor="mobile-responsive" className="text-sm">Mobile responsiveness</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="page-load" />
                    <label htmlFor="page-load" className="text-sm">Page load speed</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="navigation" />
                    <label htmlFor="navigation" className="text-sm">Navigation clarity</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="product-presentation" />
                    <label htmlFor="product-presentation" className="text-sm">Product presentation</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="checkout-process" />
                    <label htmlFor="checkout-process" className="text-sm">Checkout process</label>
                  </div>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-medium">Product Assessment</span>
                  <span className="text-xs font-medium text-blue-600 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="product-range" />
                    <label htmlFor="product-range" className="text-sm">Product range and variety</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="price-points" />
                    <label htmlFor="price-points" className="text-sm">Price points</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="unique-selling" />
                    <label htmlFor="unique-selling" className="text-sm">Unique selling propositions</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="cross-sell" />
                    <label htmlFor="cross-sell" className="text-sm">Cross-sell/upsell opportunities</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="product-page" />
                    <label htmlFor="product-page" className="text-sm">Product page conversion elements</label>
                  </div>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-medium">Customer Journey Mapping</span>
                  <span className="text-xs font-medium text-blue-600 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="email-signup" />
                    <label htmlFor="email-signup" className="text-sm">Email signup process and incentive</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="new-visitor" />
                    <label htmlFor="new-visitor" className="text-sm">New visitor experience</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="returning-customer" />
                    <label htmlFor="returning-customer" className="text-sm">Returning customer recognition</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="cart-abandonment" />
                    <label htmlFor="cart-abandonment" className="text-sm">Cart abandonment rate</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="checkout-completion" />
                    <label htmlFor="checkout-completion" className="text-sm">Checkout completion rate</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="post-purchase" />
                    <label htmlFor="post-purchase" className="text-sm">Post-purchase experience</label>
                  </div>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="text-lg font-medium">Competitive Analysis</span>
                  <span className="text-xs font-medium text-blue-600 transition group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="mt-3 text-gray-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="competitor-signup" />
                    <label htmlFor="competitor-signup" className="text-sm">Sign up for 2-3 competitor email lists</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="compare-strategies" />
                    <label htmlFor="compare-strategies" className="text-sm">Compare email strategies and quality</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="competitive-advantages" />
                    <label htmlFor="competitive-advantages" className="text-sm">Identify competitive advantages/disadvantages</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" id="best-practices" />
                    <label htmlFor="best-practices" className="text-sm">Note best practices to potentially implement</label>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

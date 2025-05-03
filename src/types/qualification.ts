
export interface QualificationFormData {
  revenue_threshold: number | null;
  ecommerce_platform: string | null;
  monthly_traffic: number | null;
  product_margins: string | null;
  growth_mindset: boolean;
  project_scope: string | null;
  accepts_timeframe: boolean;
  is_decision_maker: boolean;
  accepts_performance_based: boolean;
  allows_portfolio_use: boolean;
}

export const ECOMMERCE_PLATFORMS = [
  { value: "shopify", label: "Shopify" },
  { value: "woocommerce", label: "WooCommerce" },
  { value: "klaviyo", label: "Klaviyo" },
  { value: "bigcommerce", label: "BigCommerce" },
  { value: "magento", label: "Magento" },
  { value: "other", label: "Other" }
];

export const PRODUCT_MARGIN_RANGES = [
  { value: "below_20", label: "Below 20%" },
  { value: "20_40", label: "20% - 40%" },
  { value: "40_60", label: "40% - 60%" },
  { value: "above_60", label: "Above 60%" }
];

export const initialQualificationData: QualificationFormData = {
  revenue_threshold: null,
  ecommerce_platform: null,
  monthly_traffic: null,
  product_margins: null,
  growth_mindset: false,
  project_scope: null,
  accepts_timeframe: false,
  is_decision_maker: false,
  accepts_performance_based: false,
  allows_portfolio_use: false
};

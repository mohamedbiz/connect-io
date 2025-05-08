
export type FounderApplicationFormData = {
  // Business Information
  business_name: string;
  industry: string;
  monthly_revenue: string;
  number_of_employees: string;
  website_url: string;
  
  // Email Marketing Needs
  current_email_platform: string;
  current_email_platform_other: string;
  email_list_size: string;
  current_email_strategies: string[];
  main_challenges: string[];
  main_challenges_other: string;
  
  // Project Requirements
  project_timeline: string;
  budget_range: string;
  specific_goals: string[];
  specific_goals_other: string;
  preferred_communication: string[];
  
  // Additional Information
  expectations: string;
  previous_experience: string;
  referral_source: string;
  additional_information: string;
};

export const INDUSTRIES = [
  { value: "fashion", label: "Fashion & Apparel" },
  { value: "beauty", label: "Beauty & Cosmetics" },
  { value: "home", label: "Home & Decor" },
  { value: "electronics", label: "Electronics & Gadgets" },
  { value: "food", label: "Food & Beverages" },
  { value: "health", label: "Health & Wellness" },
  { value: "pets", label: "Pets" },
  { value: "jewelry", label: "Jewelry & Accessories" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "toys", label: "Toys & Games" },
  { value: "other", label: "Other" }
];

export const EMAIL_PLATFORMS = [
  { value: "klaviyo", label: "Klaviyo" },
  { value: "mailchimp", label: "Mailchimp" },
  { value: "omnisend", label: "Omnisend" },
  { value: "hubspot", label: "HubSpot" },
  { value: "shopify_email", label: "Shopify Email" },
  { value: "brevo", label: "Brevo (formerly Sendinblue)" },
  { value: "active_campaign", label: "ActiveCampaign" },
  { value: "none", label: "No email platform yet" },
  { value: "other", label: "Other" }
];

export const LIST_SIZE_OPTIONS = [
  { value: "under_1k", label: "Under 1,000 subscribers" },
  { value: "1k_5k", label: "1,000 - 5,000 subscribers" },
  { value: "5k_10k", label: "5,000 - 10,000 subscribers" },
  { value: "10k_50k", label: "10,000 - 50,000 subscribers" },
  { value: "50k_100k", label: "50,000 - 100,000 subscribers" },
  { value: "over_100k", label: "Over 100,000 subscribers" },
  { value: "no_list", label: "No email list yet" }
];

export const EMAIL_STRATEGIES = [
  { value: "welcome_series", label: "Welcome series" },
  { value: "abandoned_cart", label: "Abandoned cart emails" },
  { value: "post_purchase", label: "Post-purchase follow-ups" },
  { value: "newsletters", label: "Regular newsletters" },
  { value: "promotional", label: "Promotional campaigns" },
  { value: "winback", label: "Win-back campaigns" },
  { value: "segmentation", label: "Segmentation & personalization" },
  { value: "automation", label: "Advanced automations" },
  { value: "none", label: "None yet" },
  { value: "other", label: "Other" }
];

export const EMAIL_CHALLENGES = [
  { value: "deliverability", label: "Email deliverability issues" },
  { value: "open_rates", label: "Low open rates" },
  { value: "click_rates", label: "Low click-through rates" },
  { value: "conversion", label: "Poor conversion from emails" },
  { value: "growth", label: "Difficulty growing list" },
  { value: "segmentation", label: "Poor segmentation" },
  { value: "content", label: "Creating engaging content" },
  { value: "technical", label: "Technical implementation" },
  { value: "strategy", label: "Lack of overall strategy" },
  { value: "time", label: "Not enough time to manage emails" },
  { value: "expertise", label: "Lack of expertise" },
  { value: "other", label: "Other" }
];

export const PROJECT_TIMELINES = [
  { value: "immediate", label: "Immediate (ASAP)" },
  { value: "one_month", label: "Within 1 month" },
  { value: "one_three_months", label: "1-3 months" },
  { value: "three_six_months", label: "3-6 months" },
  { value: "flexible", label: "Flexible/Not urgent" }
];

export const BUDGET_RANGES = [
  { value: "under_1k", label: "Under $1,000" },
  { value: "1k_3k", label: "$ 1,000 - $3,000" },
  { value: "3k_5k", label: "$ 3,000 - $5,000" },
  { value: "5k_10k", label: "$ 5,000 - $10,000" },
  { value: "10k_plus", label: "Above $10,000" },
  { value: "not_sure", label: "Not sure yet" }
];

export const PROJECT_GOALS = [
  { value: "improve_open_rates", label: "Improve email open rates" },
  { value: "improve_clicks", label: "Improve click-through rates" },
  { value: "increase_conversions", label: "Increase conversions from email" },
  { value: "grow_list", label: "Grow email subscriber list" },
  { value: "automate_flows", label: "Set up email automation flows" },
  { value: "strategy", label: "Develop overall email marketing strategy" },
  { value: "templates", label: "Create professional email templates" },
  { value: "segmentation", label: "Implement advanced segmentation" },
  { value: "reengagement", label: "Re-engage inactive subscribers" },
  { value: "other", label: "Other" }
];

export const COMMUNICATION_PREFERENCES = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "video", label: "Video calls" },
  { value: "messenger", label: "Messenger/Chat" },
  { value: "project_management", label: "Project management tool" }
];

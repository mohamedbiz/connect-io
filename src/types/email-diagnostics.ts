
export interface SignupFormMetric {
  id: string;
  name: string;
  score: number;
  currentRate: number;
  industryAverage: number;
  potentialRate: number;
  description: string;
  improvementTips: string[];
}

export interface EmailListGrowthData {
  overallScore: number;
  currentConversionRate: number;
  industryAverage: number;
  potentialConversionRate: number;
  estimatedListGrowth: number;
  forms: SignupFormMetric[];
}

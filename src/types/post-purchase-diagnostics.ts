
export interface SequenceStep {
  id: string;
  name: string;
  status: 'missing' | 'basic' | 'advanced';
  impact: 'low' | 'medium' | 'high';
  description: string;
  expectedLift: string;
  recommendations: string[];
}

export interface PostPurchaseDiagnostic {
  overallScore: number;
  currentRepeatRate: number;
  industryAverage: number;
  potentialRepeatRate: number;
  estimatedRevenueLift: number;
  sequences: SequenceStep[];
}

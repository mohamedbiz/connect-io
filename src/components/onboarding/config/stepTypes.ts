export interface OnboardingStepConfig {
  id: string;
  title: string;
  description?: string;
  component: string;
  validation?: Record<string, any>;
  required?: boolean;
  conditional?: (data: any) => boolean;
}

export interface OnboardingConfig {
  steps: OnboardingStepConfig[];
  totalSteps: number;
  role: 'founder' | 'provider';
}

export interface OnboardingData {
  // Founder fields
  businessWebsite?: string;
  industry?: string;
  monthlyRevenueRange?: string;
  currentEmailPlatform?: string;
  primaryGoal?: string;
  biggestChallenge?: string;
  profilePictureUrl?: string;
  
  // Provider fields
  headline?: string;
  yearsExperience?: string;
  primaryEsp?: string;
  industriesServed?: string[];
  approachDescription?: string;
  portfolioUrl?: string;
}

export interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  formData: OnboardingData;
  loading: boolean;
  role: 'founder' | 'provider';
  progress: number;
  updateFormData: (data: Partial<OnboardingData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  submitOnboarding: () => Promise<void>;
  canGoNext: boolean;
  canGoBack: boolean;
}
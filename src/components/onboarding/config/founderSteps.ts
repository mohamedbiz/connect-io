import { OnboardingConfig } from './stepTypes';

export const founderOnboardingConfig: OnboardingConfig = {
  role: 'founder',
  totalSteps: 3,
  steps: [
    {
      id: 'business-info',
      title: 'Business Information',
      description: 'Tell us about your business',
      component: 'BusinessInfoStep',
      required: true,
      validation: {
        industry: { required: true },
        businessWebsite: { required: false },
        monthlyRevenueRange: { required: true }
      }
    },
    {
      id: 'marketing-info',
      title: 'Marketing Details',
      description: 'Help us understand your marketing needs',
      component: 'MarketingInfoStep',
      required: true,
      validation: {
        currentEmailPlatform: { required: true },
        primaryGoal: { required: true },
        biggestChallenge: { required: true }
      }
    },
    {
      id: 'success',
      title: 'Complete Setup',
      description: 'Review and complete your profile',
      component: 'SuccessStep',
      required: true
    }
  ]
};
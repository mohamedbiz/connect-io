import { OnboardingConfig } from './stepTypes';

export const providerOnboardingConfig: OnboardingConfig = {
  role: 'provider',
  totalSteps: 3,
  steps: [
    {
      id: 'expertise',
      title: 'Your Expertise',
      description: 'Tell us about your professional background',
      component: 'ExpertiseStep',
      required: true,
      validation: {
        headline: { required: true },
        yearsExperience: { required: true },
        primaryEsp: { required: true },
        approachDescription: { required: true }
      }
    },
    {
      id: 'portfolio',
      title: 'Portfolio & Experience',
      description: 'Share your work and industry experience',
      component: 'PortfolioStep',
      required: true,
      validation: {
        industriesServed: { required: true, minItems: 1 },
        portfolioUrl: { required: false }
      }
    },
    {
      id: 'success',
      title: 'Submit Application',
      description: 'Review and submit your provider application',
      component: 'SuccessStep',
      required: true
    }
  ]
};
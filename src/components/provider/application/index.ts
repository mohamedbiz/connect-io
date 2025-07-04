// Re-export all the types and components to maintain backward compatibility
export type { NewProviderApplicationData, NewApplicationContextType } from './types';
export { useNewApplicationContext } from './context';
export { NewApplicationProvider } from './provider';
export { initialFormData, TOTAL_STEPS } from './constants';
export { validateStep } from './validation';
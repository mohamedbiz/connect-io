import { createContext, useContext } from 'react';
import { NewApplicationContextType } from './types';

export const NewApplicationContext = createContext<NewApplicationContextType | undefined>(undefined);

export const useNewApplicationContext = () => {
  const context = useContext(NewApplicationContext);
  if (!context) {
    throw new Error('useNewApplicationContext must be used within a NewApplicationProvider');
  }
  return context;
};

import { useSupabaseQuery } from '@/hooks/useSupabaseQuery';
import { supabase } from '@/lib/supabase';
import { ServiceProvider } from '@/types/provider';

export const useProviders = () => {
  return useSupabaseQuery<ServiceProvider[]>(
    ['providers'], 
    async () => {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .order('created_at', { ascending: false });
      
      return { data, error };
    }
  );
};

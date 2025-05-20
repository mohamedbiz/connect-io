
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { PostgrestError } from '@supabase/supabase-js'

export function useSupabaseQuery<T>(
  key: string[],
  query: () => Promise<{ data: T | null; error: PostgrestError | null }>
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await query()
      if (error) throw error
      return data
    },
  })
}

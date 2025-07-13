
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface Supermarket {
  id: string;
  name: string;
  logo_url: string;
  color: string;
}

export const useSupermarkets = () => {
  return useQuery({
    queryKey: ['supermarkets'],
    queryFn: async (): Promise<Supermarket[]> => {
      const { data, error } = await supabase
        .from('supermarkets')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching supermarkets:', error);
        throw error;
      }

      return data || [];
    },
  });
};

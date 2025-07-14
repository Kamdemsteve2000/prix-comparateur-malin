
import { useQuery } from '@tanstack/react-query';
import { fetchSupermarkets } from '@/services/productService';

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
      console.log('Fetching supermarkets');
      return await fetchSupermarkets();
    },
  });
};

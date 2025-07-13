
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface ProductWithPrices {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  rating: number;
  review_count: number;
  image_url: string;
  prices: {
    id: string;
    price: number;
    original_price: number | null;
    discount: number | null;
    availability: boolean;
    address: string;
    supermarket: {
      id: string;
      name: string;
      logo_url: string;
      color: string;
    };
  }[];
}

export const useProducts = (searchQuery?: string, selectedSupermarkets?: string[]) => {
  return useQuery({
    queryKey: ['products', searchQuery, selectedSupermarkets],
    queryFn: async (): Promise<ProductWithPrices[]> => {
      let query = supabase
        .from('products')
        .select(`
          *,
          prices (
            *,
            supermarkets (*)
          )
        `);

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      // Filter by selected supermarkets if provided
      let filteredData = data || [];
      if (selectedSupermarkets && selectedSupermarkets.length > 0) {
        filteredData = filteredData.map(product => ({
          ...product,
          prices: product.prices.filter(price => 
            selectedSupermarkets.includes(price.supermarkets.name)
          )
        })).filter(product => product.prices.length > 0);
      }

      return filteredData.map(product => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        description: product.description || '',
        category: product.category,
        rating: product.rating || 0,
        review_count: product.review_count || 0,
        image_url: product.image_url || '',
        prices: product.prices.map(price => ({
          id: price.id,
          price: price.price,
          original_price: price.original_price,
          discount: price.discount,
          availability: price.availability,
          address: price.address || '',
          supermarket: {
            id: price.supermarkets.id,
            name: price.supermarkets.name,
            logo_url: price.supermarkets.logo_url || '',
            color: price.supermarkets.color || 'bg-gray-500'
          }
        }))
      }));
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<ProductWithPrices | null> => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          prices (
            *,
            supermarkets (*)
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }

      if (!data) return null;

      return {
        id: data.id,
        name: data.name,
        brand: data.brand,
        description: data.description || '',
        category: data.category,
        rating: data.rating || 0,
        review_count: data.review_count || 0,
        image_url: data.image_url || '',
        prices: data.prices.map(price => ({
          id: price.id,
          price: price.price,
          original_price: price.original_price,
          discount: price.discount,
          availability: price.availability,
          address: price.address || '',
          supermarket: {
            id: price.supermarkets.id,
            name: price.supermarkets.name,
            logo_url: price.supermarkets.logo_url || '',
            color: price.supermarkets.color || 'bg-gray-500'
          }
        }))
      };
    },
    enabled: !!id,
  });
};

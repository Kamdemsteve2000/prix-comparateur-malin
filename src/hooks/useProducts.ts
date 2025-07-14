
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProduct, ProductWithPrices } from '@/services/productService';

export const useProducts = (searchQuery?: string, selectedSupermarkets?: string[]) => {
  return useQuery({
    queryKey: ['products', searchQuery, selectedSupermarkets],
    queryFn: async (): Promise<ProductWithPrices[]> => {
      console.log('Fetching products with query:', searchQuery);
      let products = await fetchProducts(searchQuery);
      
      // Filtrer par supermarchés sélectionnés si fourni
      if (selectedSupermarkets && selectedSupermarkets.length > 0) {
        products = products.map(product => ({
          ...product,
          prices: product.prices.filter(price => 
            selectedSupermarkets.includes(price.supermarket.name)
          )
        })).filter(product => product.prices.length > 0);
      }
      
      return products;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<ProductWithPrices | null> => {
      console.log('Fetching product with id:', id);
      return await fetchProduct(id);
    },
    enabled: !!id,
  });
};

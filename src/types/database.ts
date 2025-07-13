
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          brand: string;
          description: string;
          category: string;
          rating: number;
          review_count: number;
          image_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand: string;
          description?: string;
          category: string;
          rating?: number;
          review_count?: number;
          image_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          brand?: string;
          description?: string;
          category?: string;
          rating?: number;
          review_count?: number;
          image_url?: string;
          updated_at?: string;
        };
      };
      supermarkets: {
        Row: {
          id: string;
          name: string;
          logo_url: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string;
          color?: string;
        };
      };
      prices: {
        Row: {
          id: string;
          product_id: string;
          supermarket_id: string;
          price: number;
          original_price: number | null;
          discount: number | null;
          availability: boolean;
          address: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          supermarket_id: string;
          price: number;
          original_price?: number | null;
          discount?: number | null;
          availability?: boolean;
          address?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          supermarket_id?: string;
          price?: number;
          original_price?: number | null;
          discount?: number | null;
          availability?: boolean;
          address?: string;
          updated_at?: string;
        };
      };
    };
  };
}

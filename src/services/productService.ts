
// Service pour récupérer des produits depuis une API publique
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

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

// Liste des supermarchés avec leurs couleurs
const supermarkets = [
  { id: '1', name: 'Carrefour', logo_url: '', color: 'bg-blue-500' },
  { id: '2', name: 'Leclerc', logo_url: '', color: 'bg-green-500' },
  { id: '3', name: 'Auchan', logo_url: '', color: 'bg-red-500' },
  { id: '4', name: 'Casino', logo_url: '', color: 'bg-yellow-500' },
  { id: '5', name: 'Monoprix', logo_url: '', color: 'bg-purple-500' },
];

// Fonction pour générer des prix aléatoires pour différents supermarchés
const generateRandomPrices = (basePrice: number, productId: number) => {
  return supermarkets.map((supermarket, index) => {
    const variation = (Math.random() - 0.5) * 0.3; // Variation de ±30%
    const price = Math.max(0.5, basePrice * (1 + variation));
    const hasDiscount = Math.random() > 0.7;
    const originalPrice = hasDiscount ? price * 1.2 : null;
    const discount = hasDiscount ? Math.floor(Math.random() * 30) + 5 : null;
    
    return {
      id: `${productId}-${supermarket.id}`,
      price: Math.round(price * 100) / 100,
      original_price: originalPrice ? Math.round(originalPrice * 100) / 100 : null,
      discount,
      availability: Math.random() > 0.1, // 90% de disponibilité
      address: `Magasin ${supermarket.name} - ${Math.floor(Math.random() * 10) + 1} rue de la République`,
      supermarket: {
        id: supermarket.id,
        name: supermarket.name,
        logo_url: supermarket.logo_url,
        color: supermarket.color
      }
    };
  });
};

export const fetchProducts = async (searchQuery?: string): Promise<ProductWithPrices[]> => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products: Product[] = await response.json();
    
    let filteredProducts = products;
    
    // Filtrer par recherche si fournie
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Convertir au format attendu par l'application
    return filteredProducts.map(product => ({
      id: product.id.toString(),
      name: product.title,
      brand: getBrandFromTitle(product.title),
      description: product.description,
      category: product.category,
      rating: product.rating.rate,
      review_count: product.rating.count,
      image_url: product.image,
      prices: generateRandomPrices(product.price, product.id)
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return [];
  }
};

export const fetchProduct = async (id: string): Promise<ProductWithPrices | null> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product: Product = await response.json();
    
    if (!product) return null;
    
    return {
      id: product.id.toString(),
      name: product.title,
      brand: getBrandFromTitle(product.title),
      description: product.description,
      category: product.category,
      rating: product.rating.rate,
      review_count: product.rating.count,
      image_url: product.image,
      prices: generateRandomPrices(product.price, product.id)
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    return null;
  }
};

// Fonction utilitaire pour extraire une marque du titre
const getBrandFromTitle = (title: string): string => {
  const brands = ['Samsung', 'Apple', 'Nike', 'Adidas', 'Sony', 'LG', 'Fjallraven', 'John Hardy', 'Mens', 'Womens'];
  const foundBrand = brands.find(brand => title.toLowerCase().includes(brand.toLowerCase()));
  return foundBrand || 'Generic';
};

export const fetchSupermarkets = async () => {
  return supermarkets;
};

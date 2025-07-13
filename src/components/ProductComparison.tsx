
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp, ExternalLink, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  prices: {
    supermarket: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    availability: boolean;
    logo: string;
  }[];
  category: string;
  rating: number;
}

interface ProductComparisonProps {
  searchQuery: string;
  selectedSupermarkets: string[];
}

const ProductComparison = ({ searchQuery, selectedSupermarkets }: ProductComparisonProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Données simulées de produits
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Nutella 400g",
        brand: "Ferrero",
        image: "/lovable-uploads/nutella.png",
        category: "Petit-déjeuner",
        rating: 4.5,
        prices: [
          {
            supermarket: "Carrefour",
            price: 3.89,
            originalPrice: 4.29,
            discount: 9,
            availability: true,
            logo: "/lovable-uploads/carrefour-logo.png"
          },
          {
            supermarket: "Leclerc",
            price: 3.75,
            availability: true,
            logo: "/lovable-uploads/leclerc-logo.png"
          },
          {
            supermarket: "Auchan",
            price: 4.15,
            availability: true,
            logo: "/lovable-uploads/auchan-logo.png"
          },
          {
            supermarket: "Intermarché",
            price: 3.95,
            availability: false,
            logo: "/lovable-uploads/intermarche-logo.png"
          }
        ]
      },
      {
        id: "2",
        name: "Lait Demi-Écrémé 1L",
        brand: "Lactel",
        image: "/lovable-uploads/lait.png",
        category: "Produits laitiers",
        rating: 4.2,
        prices: [
          {
            supermarket: "Carrefour",
            price: 1.25,
            availability: true,
            logo: "/lovable-uploads/carrefour-logo.png"
          },
          {
            supermarket: "Leclerc",
            price: 1.19,
            availability: true,
            logo: "/lovable-uploads/leclerc-logo.png"
          },
          {
            supermarket: "Auchan",
            price: 1.32,
            availability: true,
            logo: "/lovable-uploads/auchan-logo.png"
          },
          {
            supermarket: "Intermarché",
            price: 1.28,
            availability: true,
            logo: "/lovable-uploads/intermarche-logo.png"
          }
        ]
      },
      {
        id: "3",
        name: "Pain de Mie Complet",
        brand: "Harry's",
        image: "/lovable-uploads/pain.png",
        category: "Boulangerie",
        rating: 4.0,
        prices: [
          {
            supermarket: "Carrefour",
            price: 1.89,
            originalPrice: 2.15,
            discount: 12,
            availability: true,
            logo: "/lovable-uploads/carrefour-logo.png"
          },
          {
            supermarket: "Leclerc",
            price: 1.95,
            availability: true,
            logo: "/lovable-uploads/leclerc-logo.png"
          },
          {
            supermarket: "Auchan",
            price: 2.05,
            availability: true,
            logo: "/lovable-uploads/auchan-logo.png"
          },
          {
            supermarket: "Intermarché",
            price: 1.85,
            availability: true,
            logo: "/lovable-uploads/intermarche-logo.png"
          }
        ]
      }
    ];

    // Simulation du chargement
    setTimeout(() => {
      let filteredProducts = mockProducts;
      
      if (searchQuery) {
        filteredProducts = mockProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setProducts(filteredProducts);
      setLoading(false);
    }, 1000);
  }, [searchQuery]);

  const getBestPrice = (prices: Product['prices']) => {
    const availablePrices = prices.filter(p => p.availability);
    return availablePrices.length > 0 
      ? Math.min(...availablePrices.map(p => p.price))
      : null;
  };

  const getWorstPrice = (prices: Product['prices']) => {
    const availablePrices = prices.filter(p => p.availability);
    return availablePrices.length > 0 
      ? Math.max(...availablePrices.map(p => p.price))
      : null;
  };

  const getSavings = (prices: Product['prices']) => {
    const bestPrice = getBestPrice(prices);
    const worstPrice = getWorstPrice(prices);
    if (bestPrice && worstPrice) {
      return ((worstPrice - bestPrice) / worstPrice * 100).toFixed(0);
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center mb-8">
          Recherche en cours pour "{searchQuery}"...
        </h3>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex space-x-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-16 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold mb-4">Aucun produit trouvé</h3>
        <p className="text-gray-600">
          Essayez avec d'autres mots-clés comme "Nutella", "lait" ou "pain"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-2">
          Résultats pour "{searchQuery}"
        </h3>
        <p className="text-gray-600">
          {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid gap-6">
        {products.map((product) => {
          const bestPrice = getBestPrice(product.prices);
          const savings = getSavings(product.prices);
          const filteredPrices = selectedSupermarkets.length > 0
            ? product.prices.filter(p => selectedSupermarkets.includes(p.supermarket))
            : product.prices;

          return (
            <Card key={product.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                  {/* Product Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <div className="text-4xl">🛒</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-1">{product.name}</h4>
                      <p className="text-gray-600 mb-2">{product.brand}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600">
                            ({product.rating})
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      {savings > 0 && (
                        <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          Économisez {savings}%
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Price Comparison */}
                  <div className="flex-1">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredPrices.map((priceInfo) => (
                        <Card
                          key={priceInfo.supermarket}
                          className={`border-2 transition-all duration-200 ${
                            priceInfo.price === bestPrice && priceInfo.availability
                              ? 'border-green-500 bg-green-50'
                              : priceInfo.availability
                              ? 'border-gray-200 hover:border-gray-300'
                              : 'border-gray-100 bg-gray-50 opacity-60'
                          }`}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="w-8 h-8 mx-auto mb-2 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                              {priceInfo.supermarket.charAt(0)}
                            </div>
                            <p className="text-xs font-medium mb-2">
                              {priceInfo.supermarket}
                            </p>
                            {priceInfo.availability ? (
                              <>
                                <div className="space-y-1">
                                  {priceInfo.originalPrice && (
                                    <p className="text-xs text-gray-500 line-through">
                                      {priceInfo.originalPrice.toFixed(2)}€
                                    </p>
                                  )}
                                  <p className={`font-bold ${
                                    priceInfo.price === bestPrice ? 'text-green-600 text-lg' : 'text-gray-900'
                                  }`}>
                                    {priceInfo.price.toFixed(2)}€
                                  </p>
                                </div>
                                {priceInfo.discount && (
                                  <Badge variant="destructive" className="text-xs mt-1">
                                    -{priceInfo.discount}%
                                  </Badge>
                                )}
                                {priceInfo.price === bestPrice && (
                                  <Badge className="bg-green-500 text-white text-xs mt-1">
                                    Meilleur prix
                                  </Badge>
                                )}
                              </>
                            ) : (
                              <div className="text-xs text-gray-500">
                                <p>Non disponible</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProductComparison;

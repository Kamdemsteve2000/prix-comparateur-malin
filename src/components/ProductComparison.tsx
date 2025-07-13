
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Star } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

interface ProductComparisonProps {
  searchQuery: string;
  selectedSupermarkets: string[];
}

const ProductComparison = ({ searchQuery, selectedSupermarkets }: ProductComparisonProps) => {
  const { data: products = [], isLoading: loading, error } = useProducts(searchQuery, selectedSupermarkets);

  const getBestPrice = (prices: any[]) => {
    const availablePrices = prices.filter(p => p.availability);
    return availablePrices.length > 0 
      ? Math.min(...availablePrices.map(p => p.price))
      : null;
  };

  const getWorstPrice = (prices: any[]) => {
    const availablePrices = prices.filter(p => p.availability);
    return availablePrices.length > 0 
      ? Math.max(...availablePrices.map(p => p.price))
      : null;
  };

  const getSavings = (prices: any[]) => {
    const bestPrice = getBestPrice(prices);
    const worstPrice = getWorstPrice(prices);
    if (bestPrice && worstPrice) {
      return Math.round((worstPrice - bestPrice) / worstPrice * 100);
    }
    return 0;
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-2xl font-bold mb-4">Erreur de chargement</h3>
        <p className="text-gray-600">
          Impossible de charger les produits. Veuillez réessayer.
        </p>
      </div>
    );
  }

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
          Essayez avec d'autres mots-clés
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

          return (
            <Card key={product.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                  {/* Product Info */}
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-4xl">🛒</div>
                      )}
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
                      {product.prices.map((priceInfo) => (
                        <Card
                          key={priceInfo.id}
                          className={`border-2 transition-all duration-200 ${
                            priceInfo.price === bestPrice && priceInfo.availability
                              ? 'border-green-500 bg-green-50'
                              : priceInfo.availability
                              ? 'border-gray-200 hover:border-gray-300'
                              : 'border-gray-100 bg-gray-50 opacity-60'
                          }`}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="w-8 h-8 mx-auto mb-2 rounded flex items-center justify-center text-xs font-bold overflow-hidden">
                              {priceInfo.supermarket.logo_url ? (
                                <img 
                                  src={priceInfo.supermarket.logo_url} 
                                  alt={priceInfo.supermarket.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className={`w-full h-full ${priceInfo.supermarket.color} flex items-center justify-center text-white`}>
                                  {priceInfo.supermarket.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <p className="text-xs font-medium mb-2">
                              {priceInfo.supermarket.name}
                            </p>
                            {priceInfo.availability ? (
                              <>
                                <div className="space-y-1">
                                  {priceInfo.original_price && (
                                    <p className="text-xs text-gray-500 line-through">
                                      {priceInfo.original_price.toFixed(2)}€
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

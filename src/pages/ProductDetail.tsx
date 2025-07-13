
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, TrendingDown, ExternalLink, MapPin } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  prices: {
    supermarket: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    availability: boolean;
    logo: string;
    address: string;
  }[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de données pour la démo
    const mockProduct: Product = {
      id: id || "1",
      name: "Nutella 400g",
      brand: "Ferrero",
      description: "Pâte à tartiner aux noisettes et au cacao. Idéale pour le petit-déjeuner ou le goûter. Sans huile de palme.",
      category: "Petit-déjeuner",
      rating: 4.5,
      reviewCount: 1247,
      prices: [
        {
          supermarket: "Leclerc",
          price: 3.75,
          availability: true,
          logo: "/lovable-uploads/leclerc-logo.png",
          address: "Centre Commercial Leclerc, 123 Rue de la République"
        },
        {
          supermarket: "Carrefour",
          price: 3.89,
          originalPrice: 4.29,
          discount: 9,
          availability: true,
          logo: "/lovable-uploads/carrefour-logo.png",
          address: "Carrefour Hypermarché, 456 Avenue des Champs"
        },
        {
          supermarket: "Intermarché",
          price: 3.95,
          availability: false,
          logo: "/lovable-uploads/intermarche-logo.png",
          address: "Intermarché Super, 789 Boulevard Central"
        },
        {
          supermarket: "Auchan",
          price: 4.15,
          availability: true,
          logo: "/lovable-uploads/auchan-logo.png",
          address: "Auchan Hypermarché, 321 Route Nationale"
        }
      ]
    };

    setTimeout(() => {
      setProduct(mockProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  const bestPrice = Math.min(...product.prices.filter(p => p.availability).map(p => p.price));
  const worstPrice = Math.max(...product.prices.filter(p => p.availability).map(p => p.price));
  const savings = Math.round((worstPrice - bestPrice) / worstPrice * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux résultats
          </Link>
        </div>

        {/* Product Header */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
                  <Badge variant="outline" className="mb-4">
                    {product.category}
                  </Badge>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">{product.rating}</span>
                    <span className="text-gray-600">({product.reviewCount} avis)</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-700">Meilleure offre</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {bestPrice.toFixed(2)}€
                  </div>
                  {savings > 0 && (
                    <p className="text-sm text-green-600">
                      Économisez jusqu'à {savings}% par rapport au prix le plus élevé
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-6xl">🛒</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Comparison */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Comparaison des prix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {product.prices.map((priceInfo) => (
                <Card
                  key={priceInfo.supermarket}
                  className={`border-2 ${
                    priceInfo.price === bestPrice && priceInfo.availability
                      ? 'border-green-500 bg-green-50'
                      : priceInfo.availability
                      ? 'border-gray-200'
                      : 'border-gray-100 bg-gray-50 opacity-60'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                          {priceInfo.supermarket.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{priceInfo.supermarket}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {priceInfo.address}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        {priceInfo.availability ? (
                          <div className="space-y-2">
                            {priceInfo.originalPrice && (
                              <p className="text-sm text-gray-500 line-through">
                                {priceInfo.originalPrice.toFixed(2)}€
                              </p>
                            )}
                            <p className={`text-2xl font-bold ${
                              priceInfo.price === bestPrice ? 'text-green-600' : 'text-gray-900'
                            }`}>
                              {priceInfo.price.toFixed(2)}€
                            </p>
                            {priceInfo.discount && (
                              <Badge variant="destructive" className="text-xs">
                                -{priceInfo.discount}%
                              </Badge>
                            )}
                            {priceInfo.price === bestPrice && (
                              <Badge className="bg-green-500 text-white text-xs ml-2">
                                Meilleur prix
                              </Badge>
                            )}
                            <div className="mt-2">
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Voir en magasin
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-gray-500 font-medium">Non disponible</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;

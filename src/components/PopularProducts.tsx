
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Star } from "lucide-react";

const PopularProducts = () => {
  const popularProducts = [
    {
      name: "Nutella 400g",
      category: "Petit-déjeuner",
      bestPrice: 3.75,
      avgPrice: 3.95,
      savings: 15,
      trend: "down",
      rating: 4.5
    },
    {
      name: "Lait Demi-Écrémé 1L",
      category: "Produits laitiers",
      bestPrice: 1.19,
      avgPrice: 1.26,
      savings: 6,
      trend: "up",
      rating: 4.2
    },
    {
      name: "Pain de Mie Complet",
      category: "Boulangerie",
      bestPrice: 1.85,
      avgPrice: 1.98,
      savings: 7,
      trend: "down",
      rating: 4.0
    },
    {
      name: "Huile d'Olive Vierge Extra",
      category: "Huiles & Vinaigres",
      bestPrice: 4.89,
      avgPrice: 5.45,
      savings: 10,
      trend: "down",
      rating: 4.3
    },
    {
      name: "Pâtes Spaghetti 500g",
      category: "Épicerie",
      bestPrice: 0.95,
      avgPrice: 1.15,
      savings: 17,
      trend: "up",
      rating: 4.1
    },
    {
      name: "Yaourt Nature 8x125g",
      category: "Produits laitiers",
      bestPrice: 2.45,
      avgPrice: 2.78,
      savings: 12,
      trend: "down",
      rating: 4.4
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-4">Produits populaires</h3>
        <p className="text-gray-600 mb-8">
          Les produits les plus recherchés et comparés par nos utilisateurs
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularProducts.map((product, index) => (
          <Card
            key={product.name}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <Badge variant="outline" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">
                      ({product.rating})
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🔥'}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Meilleur prix:</span>
                  <span className="font-bold text-green-600 text-lg">
                    {product.bestPrice.toFixed(2)}€
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prix moyen:</span>
                  <span className="text-sm text-gray-500 line-through">
                    {product.avgPrice.toFixed(2)}€
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    {product.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      product.trend === 'down' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {product.trend === 'down' ? 'En baisse' : 'En hausse'}
                    </span>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    -{product.savings}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
          <CardContent className="p-8">
            <div className="text-4xl mb-4">💡</div>
            <h4 className="text-xl font-bold mb-2">Astuce d'économies</h4>
            <p className="text-gray-600">
              En comparant les prix avant vos courses, vous pouvez économiser jusqu'à 
              <span className="font-bold text-green-600"> 30% sur votre budget alimentaire</span> !
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PopularProducts;


import { useState } from "react";
import { Search, TrendingDown, ShoppingCart, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductComparison from "@/components/ProductComparison";
import SupermarketFilter from "@/components/SupermarketFilter";
import PopularProducts from "@/components/PopularProducts";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupermarkets, setSelectedSupermarkets] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                PrixCompare
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <TrendingDown className="h-4 w-4 mr-1" />
                Économisez jusqu'à 30%
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Comparez les prix des
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent block">
              supermarchés
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Trouvez les meilleurs prix pour vos courses et économisez de l'argent sur tous vos achats quotidiens
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher un produit (ex: Nutella, lait, pain...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 py-6 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
            <Button
              onClick={handleSearch}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Search className="h-5 w-5 mr-2" />
              Comparer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-blue-600">15+</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Supermarchés comparés</p>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-green-600">50k+</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Produits référencés</p>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-purple-600">30%</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">d'économies moyennes</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <SupermarketFilter
          selectedSupermarkets={selectedSupermarkets}
          onSelectionChange={setSelectedSupermarkets}
        />

        {/* Results */}
        {showResults && (
          <ProductComparison
            searchQuery={searchQuery}
            selectedSupermarkets={selectedSupermarkets}
          />
        )}

        {/* Popular Products */}
        {!showResults && <PopularProducts />}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart className="h-6 w-6" />
                <span className="text-xl font-bold">PrixCompare</span>
              </div>
              <p className="text-gray-400">
                La plateforme de référence pour comparer les prix des supermarchés français.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Supermarchés</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Carrefour</li>
                <li>Leclerc</li>
                <li>Auchan</li>
                <li>Intermarché</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Catégories</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Alimentaire</li>
                <li>Hygiène & Beauté</li>
                <li>Maison</li>
                <li>Électronique</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Aide</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Comment ça marche</li>
                <li>Contact</li>
                <li>À propos</li>
                <li>Mentions légales</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PrixCompare. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

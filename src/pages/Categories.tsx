
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      id: "alimentaire",
      name: "Alimentaire",
      description: "Tous vos produits d'épicerie quotidiens",
      productCount: 28500,
      icon: "🛒",
      color: "from-green-500 to-emerald-600",
      subcategories: [
        "Fruits & Légumes",
        "Viandes & Poissons",
        "Produits laitiers",
        "Épicerie salée",
        "Épicerie sucrée",
        "Surgelés"
      ]
    },
    {
      id: "hygiene-beaute",
      name: "Hygiène & Beauté",
      description: "Produits de soin et d'hygiène personnelle",
      productCount: 8750,
      icon: "🧴",
      color: "from-pink-500 to-rose-600",
      subcategories: [
        "Soins du visage",
        "Soins du corps",
        "Hygiène dentaire",
        "Parfums",
        "Maquillage",
        "Soins des cheveux"
      ]
    },
    {
      id: "maison",
      name: "Maison",
      description: "Tout pour l'entretien et la décoration",
      productCount: 6200,
      icon: "🏠",
      color: "from-blue-500 to-cyan-600",
      subcategories: [
        "Entretien maison",
        "Linge & Repassage",
        "Décoration",
        "Electroménager",
        "Bricolage",
        "Jardin"
      ]
    },
    {
      id: "bebe-enfant",
      name: "Bébé & Enfant",
      description: "Produits dédiés aux tout-petits",
      productCount: 3400,
      icon: "👶",
      color: "from-yellow-500 to-orange-600",
      subcategories: [
        "Alimentation bébé",
        "Hygiène bébé",
        "Jouets",
        "Vêtements enfant",
        "Puériculture",
        "École & Bureau"
      ]
    },
    {
      id: "animalerie",
      name: "Animalerie",
      description: "Soins et alimentation pour vos animaux",
      productCount: 2100,
      icon: "🐕",
      color: "from-purple-500 to-violet-600",
      subcategories: [
        "Alimentation chien",
        "Alimentation chat",
        "Soins & Hygiène",
        "Accessoires",
        "Jouets animaux",
        "Aquariophilie"
      ]
    },
    {
      id: "electronique",
      name: "Électronique",
      description: "High-tech et électroménager",
      productCount: 1800,
      icon: "📱",
      color: "from-indigo-500 to-blue-600",
      subcategories: [
        "Smartphones",
        "Informatique",
        "Audio & Vidéo",
        "Électroménager",
        "Gaming",
        "Accessoires"
      ]
    }
  ];

  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Catégories de Produits</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Explorez nos {totalProducts.toLocaleString()} produits répartis dans {categories.length} catégories principales
            </p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {totalProducts.toLocaleString()} produits référencés
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl`}>
                    {category.icon}
                  </div>
                  <Badge variant="outline" className="group-hover:bg-blue-50">
                    {category.productCount.toLocaleString()} produits
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-3 text-gray-700">Sous-catégories populaires :</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {category.subcategories.slice(0, 4).map((subcat) => (
                        <Badge 
                          key={subcat} 
                          variant="secondary" 
                          className="text-xs justify-center py-1 hover:bg-blue-100 cursor-pointer transition-colors"
                        >
                          {subcat}
                        </Badge>
                      ))}
                    </div>
                    {category.subcategories.length > 4 && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        +{category.subcategories.length - 4} autres
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <Link to={`/?category=${category.id}`}>
                      <Button className="w-full group-hover:bg-blue-600 transition-colors">
                        Explorer la catégorie
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Categories Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">🔥 Catégories les plus populaires</h3>
              <p className="text-lg mb-6 opacity-90">
                Découvrez les catégories les plus recherchées par nos utilisateurs
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {categories.slice(0, 3).map((category) => (
                  <div key={category.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h4 className="font-semibold">{category.name}</h4>
                    <p className="text-sm opacity-80">{category.productCount.toLocaleString()} produits</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">💡</div>
                <h4 className="text-lg font-bold mb-3">Astuce d'achat</h4>
                <p className="text-gray-600 text-sm">
                  Comparez les prix dans plusieurs catégories pour maximiser vos économies. 
                  Certains supermarchés sont plus compétitifs sur certaines gammes de produits.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h4 className="text-lg font-bold mb-3">Analyse des prix</h4>
                <p className="text-gray-600 text-sm">
                  Nos algorithmes analysent quotidiennement les prix de plus de 50 000 produits 
                  pour vous garantir les meilleures offres du marché.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Categories;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, ExternalLink, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Supermarkets = () => {
  const supermarkets = [
    {
      id: "carrefour",
      name: "Carrefour",
      description: "Le leader français de la grande distribution avec plus de 12 000 produits référencés.",
      productCount: "15,230 produits",
      avgRating: 4.2,
      reviewCount: 2847,
      locations: [
        {
          address: "Carrefour Hypermarché, 456 Avenue des Champs",
          hours: "8h00 - 22h00",
          phone: "01 23 45 67 89"
        },
        {
          address: "Carrefour City, 789 Rue de la Paix",
          hours: "7h00 - 23h00",
          phone: "01 23 45 67 90"
        }
      ],
      specialties: ["Électronique", "Mode", "Alimentaire", "Maison"],
      color: "bg-blue-500"
    },
    {
      id: "leclerc",
      name: "Leclerc",
      description: "Des prix bas et une large gamme de produits dans tous les rayons.",
      productCount: "12,840 produits",
      avgRating: 4.4,
      reviewCount: 1923,
      locations: [
        {
          address: "Centre Commercial Leclerc, 123 Rue de la République",
          hours: "8h30 - 21h30",
          phone: "01 23 45 67 91"
        }
      ],
      specialties: ["Alimentaire", "Carburant", "Parapharmacie", "Bricolage"],
      color: "bg-green-500"
    },
    {
      id: "auchan",
      name: "Auchan",
      description: "Hypermarché proposant un large choix de produits à prix compétitifs.",
      productCount: "11,560 produits",
      avgRating: 4.1,
      reviewCount: 1456,
      locations: [
        {
          address: "Auchan Hypermarché, 321 Route Nationale",
          hours: "8h00 - 21h00",
          phone: "01 23 45 67 92"
        }
      ],
      specialties: ["Alimentaire", "Textile", "Multimédia", "Jardin"],
      color: "bg-red-500"
    },
    {
      id: "intermarche",
      name: "Intermarché",
      description: "Les mousquetaires de la distribution, proche de chez vous.",
      productCount: "10,920 produits",
      avgRating: 4.0,
      reviewCount: 1234,
      locations: [
        {
          address: "Intermarché Super, 789 Boulevard Central",
          hours: "8h00 - 20h00",
          phone: "01 23 45 67 93"
        }
      ],
      specialties: ["Alimentaire", "Produits frais", "Boucherie", "Poissonnerie"],
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Nos Supermarchés Partenaires</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez tous les supermarchés où nous comparons les prix pour vous faire économiser
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <p className="text-gray-600">Enseignes</p>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">50k+</div>
              <p className="text-gray-600">Produits</p>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
              <p className="text-gray-600">Magasins</p>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.2</div>
              <p className="text-gray-600">Note moyenne</p>
            </CardContent>
          </Card>
        </div>

        {/* Supermarkets Grid */}
        <div className="space-y-8">
          {supermarkets.map((supermarket) => (
            <Card key={supermarket.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Column - Main Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 rounded-full ${supermarket.color} flex items-center justify-center text-white font-bold text-xl`}>
                        {supermarket.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{supermarket.name}</h2>
                        <p className="text-gray-600 mb-4">{supermarket.description}</p>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <Badge variant="outline">{supermarket.productCount}</Badge>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(supermarket.avgRating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm font-medium ml-1">
                              {supermarket.avgRating} ({supermarket.reviewCount} avis)
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Spécialités :</h4>
                          <div className="flex flex-wrap gap-2">
                            {supermarket.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Locations */}
                    <div>
                      <h4 className="font-semibold mb-3">Magasins :</h4>
                      <div className="space-y-3">
                        {supermarket.locations.map((location, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{location.address}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{location.hours}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Phone className="h-4 w-4 mr-2" />
                                  <span>{location.phone}</span>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Directions
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Actions */}
                  <div className="space-y-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-0">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl mb-2">🛒</div>
                        <h4 className="font-bold mb-2">Comparer les prix</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Voir tous les produits disponibles chez {supermarket.name}
                        </p>
                        <Link to={`/?supermarket=${supermarket.id}`}>
                          <Button className="w-full">
                            Voir les produits
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>

                    <Card className="border-0">
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl mb-2">💰</div>
                        <h4 className="font-bold mb-2">Offres spéciales</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Découvrez les promotions en cours
                        </p>
                        <Button variant="outline" className="w-full">
                          Voir les promos
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Vous êtes un supermarché ?</h3>
            <p className="text-lg mb-6">
              Rejoignez notre plateforme et augmentez votre visibilité auprès de milliers de consommateurs
            </p>
            <Button size="lg" variant="secondary">
              Devenir partenaire
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Supermarkets;

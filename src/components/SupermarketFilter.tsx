
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface SupermarketFilterProps {
  selectedSupermarkets: string[];
  onSelectionChange: (selected: string[]) => void;
}

const supermarkets = [
  { name: "Carrefour", color: "bg-blue-500", count: "15,230 produits" },
  { name: "Leclerc", color: "bg-green-500", count: "12,840 produits" },
  { name: "Auchan", color: "bg-red-500", count: "11,560 produits" },
  { name: "Intermarché", color: "bg-orange-500", count: "10,920 produits" },
  { name: "Super U", color: "bg-purple-500", count: "9,780 produits" },
  { name: "Casino", color: "bg-pink-500", count: "8,650 produits" },
  { name: "Monoprix", color: "bg-indigo-500", count: "7,420 produits" },
  { name: "Franprix", color: "bg-teal-500", count: "6,890 produits" },
];

const SupermarketFilter = ({ selectedSupermarkets, onSelectionChange }: SupermarketFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSupermarketToggle = (supermarket: string) => {
    const newSelection = selectedSupermarkets.includes(supermarket)
      ? selectedSupermarkets.filter(s => s !== supermarket)
      : [...selectedSupermarkets, supermarket];
    
    onSelectionChange(newSelection);
  };

  const clearAllFilters = () => {
    onSelectionChange([]);
  };

  const selectAllSupermarkets = () => {
    onSelectionChange(supermarkets.map(s => s.name));
  };

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Filtrer par supermarché</h3>
            {selectedSupermarkets.length > 0 && (
              <Badge variant="secondary">
                {selectedSupermarkets.length} sélectionné{selectedSupermarkets.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {selectedSupermarkets.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4 mr-1" />
                Effacer
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800"
            >
              {isExpanded ? 'Réduire' : 'Voir tout'}
            </Button>
          </div>
        </div>

        {/* Selected filters display */}
        {selectedSupermarkets.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSupermarkets.map((supermarket) => {
              const supermarketInfo = supermarkets.find(s => s.name === supermarket);
              return (
                <Badge
                  key={supermarket}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                  onClick={() => handleSupermarketToggle(supermarket)}
                >
                  {supermarket}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              );
            })}
          </div>
        )}

        {/* Supermarket grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 ${
          !isExpanded ? 'max-h-32 overflow-hidden' : ''
        }`}>
          {supermarkets.slice(0, isExpanded ? supermarkets.length : 4).map((supermarket) => (
            <div
              key={supermarket.name}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedSupermarkets.includes(supermarket.name)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => handleSupermarketToggle(supermarket.name)}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`w-8 h-8 rounded-full ${supermarket.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {supermarket.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm">{supermarket.name}</p>
                  <p className="text-xs text-gray-500">{supermarket.count}</p>
                </div>
                <Checkbox
                  checked={selectedSupermarkets.includes(supermarket.name)}
                  onChange={() => handleSupermarketToggle(supermarket.name)}
                  className="absolute top-2 right-2"
                />
              </div>
            </div>
          ))}
        </div>

        {!isExpanded && supermarkets.length > 4 && (
          <div className="text-center mt-4">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(true)}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Voir {supermarkets.length - 4} supermarchés de plus
            </Button>
          </div>
        )}

        {/* Quick actions */}
        <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={selectAllSupermarkets}
            disabled={selectedSupermarkets.length === supermarkets.length}
          >
            Tout sélectionner
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            disabled={selectedSupermarkets.length === 0}
          >
            Tout désélectionner
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupermarketFilter;


import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useSupermarkets } from "@/hooks/useSupermarkets";

interface SupermarketFilterProps {
  selectedSupermarkets: string[];
  onSelectionChange: (selected: string[]) => void;
}

const SupermarketFilter = ({ selectedSupermarkets, onSelectionChange }: SupermarketFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: supermarkets = [], isLoading } = useSupermarkets();

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

  if (isLoading) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            {selectedSupermarkets.map((supermarket) => (
              <Badge
                key={supermarket}
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                onClick={() => handleSupermarketToggle(supermarket)}
              >
                {supermarket}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}

        {/* Supermarket grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 ${
          !isExpanded ? 'max-h-32 overflow-hidden' : ''
        }`}>
          {supermarkets.slice(0, isExpanded ? supermarkets.length : 4).map((supermarket) => (
            <div
              key={supermarket.id}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedSupermarkets.includes(supermarket.name)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => handleSupermarketToggle(supermarket.name)}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                  {supermarket.logo_url ? (
                    <img 
                      src={supermarket.logo_url} 
                      alt={supermarket.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${supermarket.color} flex items-center justify-center text-white font-bold text-sm`}>
                      {supermarket.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{supermarket.name}</p>
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

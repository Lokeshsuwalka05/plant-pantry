import { type Plant } from '../types/plant';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface PlantCardProps {
  plant: Plant;
}

export const PlantCard = ({ plant }: PlantCardProps) => {
  // Get the first category string and split it for display
  const categoryString = plant.categories[0] || '';
  const categoryArray = categoryString.split(',').map(cat => cat.trim());

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-botanical hover:-translate-y-1 bg-gradient-card border-border/50">
      <CardContent className="p-6 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-botanical transition-colors">
            {plant.name}
          </h3>
          <p className="text-lg font-bold text-botanical">
            {plant.price}
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {categoryArray.slice(0, 3).map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {categoryArray.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{categoryArray.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Badge
            variant={plant.inStock ? "default" : "destructive"}
            className={plant.inStock ? "bg-success hover:bg-success/90" : ""}
          >
            {plant.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>

        {plant.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {plant.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
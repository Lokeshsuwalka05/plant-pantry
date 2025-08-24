import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Plus, Leaf } from 'lucide-react';
import { type PlantFormData, PLANT_CATEGORIES } from '../types/plant';
import { toast } from 'sonner';

interface AddPlantFormProps {
  onAddPlant: (plantData: PlantFormData) => void;
}

export const AddPlantForm = ({ onAddPlant }: AddPlantFormProps) => {
  const [formData, setFormData] = useState<PlantFormData>({
    name: '',
    price: '',
    categories: [],
    inStock: true,
    description: ''
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const addCategory = () => {
    if (selectedCategory && !formData.categories.includes(selectedCategory)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, selectedCategory]
      }));
      setSelectedCategory('');
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Plant name is required");
      return;
    }

    if (!formData.price.trim()) {
      toast.error("Plant price is required");
      return;
    }

    if (formData.categories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    // Convert categories array to the format expected by backend
    const plantDataForBackend = {
      ...formData,
      categories: [formData.categories.join(',')]
    };

    onAddPlant(plantDataForBackend);

    // Reset form
    setFormData({
      name: '',
      price: '',
      categories: [],
      inStock: true,
      description: ''
    });

    toast.success("Plant added to catalog successfully");
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-botanical">
          <Leaf className="h-5 w-5" />
          Add New Plant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Plant Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Monstera Deliciosa"
              className="bg-card border-border/50 focus:border-botanical"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="e.g., ₹1499.50"
              className="bg-card border-border/50 focus:border-botanical"
            />
          </div>

          <div className="space-y-2">
            <Label>Categories *</Label>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1 bg-card border-border/50 focus:border-botanical">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  {PLANT_CATEGORIES.filter(cat => !formData.categories.includes(cat)).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={addCategory}
                disabled={!selectedCategory}
                variant="outline"
                size="icon"
                className="border-botanical text-botanical hover:bg-botanical hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the plant..."
              className="bg-card border-border/50 focus:border-botanical"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="inStock"
              checked={formData.inStock}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))}
            />
            <Label htmlFor="inStock">In Stock</Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-botanical hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Plant to Catalog
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
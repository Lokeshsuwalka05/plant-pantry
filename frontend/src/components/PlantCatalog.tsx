import { useEffect, useState } from 'react';
import { type PlantFormData } from '../types/plant';
import { PlantCard } from './PlantCard';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { AddPlantForm } from './AddPlantForm';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Plus, Grid, List, Loader2 } from 'lucide-react';
import { usePlants, useCreatePlant } from '../hooks/usePlants';
import { toast } from "sonner"

export const PlantCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // API hooks
  const { data: plants = [], isLoading, error } = usePlants({
    search: searchTerm,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
  });

  // Use plants directly since filtering is now handled by the API
  const filteredPlants = plants;



  const createPlantMutation = useCreatePlant();

  const handleAddPlant = async (plantData: PlantFormData) => {
    try {
      await createPlantMutation.mutateAsync(plantData);
      setShowAddForm(false);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };
  const showRenderWaitToast = () => {
    toast.custom(() => (
      <div className="bg-red-600 text-white px-4 py-2 rounded-md shadow-lg">
        ⚠️ You are on the free tier of Render. Please wait for some time!
      </div>
    ), { duration: 5000});
  };
  useEffect(() => {
    if (isLoading) {
      showRenderWaitToast();
    }
  }, [isLoading]);
  return (
    <div className="min-h-screen bg-gradient-nature">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-botanical">
            Plant Paradise
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of beautiful plants to transform your space into a green sanctuary
          </p>
        </div>



        {/* Controls */}
        <Card className="p-6 mb-8 bg-card/80 backdrop-blur border-border/50">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1 max-w-md">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search by name, description, or category..."
                />
              </div>
              <CategoryFilter
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-muted rounded-md p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-gradient-botanical hover:opacity-90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Plant
              </Button>
            </div>
          </div>
        </Card>

        {/* Add Plant Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddPlantForm onAddPlant={handleAddPlant} />
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {isLoading ? 'Loading plants...' : `Showing ${filteredPlants.length} plants`}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="p-12 text-center bg-card/80 backdrop-blur border-border/50">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p>Loading plants...</p>
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-12 text-center bg-card/80 backdrop-blur border-border/50">
            <div className="text-destructive">
              <p className="text-lg mb-2">Failed to load plants</p>
              <p className="text-sm">{error.message}</p>
            </div>
          </Card>
        )}

        {/* Plant Grid/List */}
        {!isLoading && !error && filteredPlants.length === 0 ? (
          <Card className="p-12 text-center bg-card/80 backdrop-blur border-border/50">
            <div className="text-muted-foreground">
              <p className="text-lg mb-2">No plants found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </Card>
        ) : !isLoading && !error ? (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredPlants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
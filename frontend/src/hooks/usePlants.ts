import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, type PlantFilters } from '../services/api';
import { type Plant, type PlantFormData, type CategoryWithCount } from '../types/plant';
import { toast } from 'sonner';

// Query keys
export const plantKeys = {
  all: ['plants'] as const,
  lists: () => [...plantKeys.all, 'list'] as const,
  list: (filters: PlantFilters) => [...plantKeys.lists(), filters] as const,
  details: () => [...plantKeys.all, 'detail'] as const,
  detail: (id: string) => [...plantKeys.details(), id] as const,
  categories: () => [...plantKeys.all, 'categories'] as const,
};

export const usePlants = (filters: PlantFilters = {}) => {
  return useQuery({
    queryKey: plantKeys.list(filters),
    queryFn: async () => {
      const response = await apiService.getPlants(filters);
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePlant = (id: string) => {
  return useQuery({
    queryKey: plantKeys.detail(id),
    queryFn: async () => {
      const response = await apiService.getPlant(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery<CategoryWithCount[]>({
    queryKey: plantKeys.categories(),
    queryFn: async () => {
      const response = await apiService.getCategories();
      return response.data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreatePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (plantData: PlantFormData) => {
      const response = await apiService.createPlant(plantData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plantKeys.lists() });
      toast.success('Plant added successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add plant: ${error.message}`);
    },
  });
};

export const useUpdatePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, plantData }: { id: string; plantData: Partial<Plant> }) => {
      const response = await apiService.updatePlant(id, plantData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: plantKeys.lists() });
      queryClient.invalidateQueries({ queryKey: plantKeys.detail(data._id) });
      toast.success('Plant updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update plant: ${error.message}`);
    },
  });
};

export const useDeletePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiService.deletePlant(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plantKeys.lists() });
      toast.success('Plant deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete plant: ${error.message}`);
    },
  });
};

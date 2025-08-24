export interface Plant {
  _id: string;
  name: string;
  price: string;
  categories: string[];
  inStock: boolean;
  description?: string;
}

export interface PlantFormData {
  name: string;
  price: string;
  categories: string[];
  inStock: boolean;
  description?: string;
}

export const PLANT_CATEGORIES = [
  'Indoor',
  'Outdoor',
  'Succulent',
  'Flowering',
  'Low Light',
  'Pet Safe',
  'Air Purifying',
  'Hanging',
  'Large',
  'Small'
] as const;

export type PlantCategory = typeof PLANT_CATEGORIES[number];

export interface CategoryWithCount {
  name: string;
  count: number;
}
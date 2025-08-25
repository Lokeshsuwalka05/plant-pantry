const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  message?: string;
  error?: string;
}

export interface PlantFilters {
  search?: string;
  category?: string;
  inStock?: boolean;
  sort?: string;
  order?: 'asc' | 'desc';
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get all plants with optional filters
  async getPlants(filters: PlantFilters = {}): Promise<ApiResponse<any[]>> {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.inStock !== undefined) params.append('inStock', filters.inStock.toString());
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.order) params.append('order', filters.order);

    const queryString = params.toString();
    const endpoint = `/plants${queryString ? `?${queryString}` : ''}`;

    return this.request<any[]>(endpoint);
  }

  // Get single plant by ID
  async getPlant(id: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/plants/${id}`);
  }

  // Create new plant
  async createPlant(plantData: any): Promise<ApiResponse<any>> {
    return this.request<any>('/plants', {
      method: 'POST',
      body: JSON.stringify(plantData),
    });
  }

  // Update plant
  async updatePlant(id: string, plantData: any): Promise<ApiResponse<any>> {
    return this.request<any>(`/plants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(plantData),
    });
  }

  // Delete plant
  async deletePlant(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/plants/${id}`, {
      method: 'DELETE',
    });
  }

  // Get categories with counts
  async getCategories(): Promise<ApiResponse<Array<{ name: string, count: number }>>> {
    return this.request<Array<{ name: string, count: number }>>('/plants/categories/list');
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.request<any>('/health');
  }
}

export const apiService = new ApiService();

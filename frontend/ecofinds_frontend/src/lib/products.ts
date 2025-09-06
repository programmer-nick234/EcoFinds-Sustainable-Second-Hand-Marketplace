import api from './api';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  image?: string;
  owner: number;
  owner_username: string;
  created_at: string;
  updated_at: string;
  is_available: boolean;
}

export interface CreateProductData {
  title: string;
  description: string;
  category: string;
  price: number;
  image?: File;
  is_available?: boolean;
}

export interface UpdateProductData {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  image?: File;
  is_available?: boolean;
}

export interface Category {
  value: string;
  label: string;
}

export interface SearchFilters {
  search?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
  page?: number;
  page_size?: number;
}

export interface SearchResponse {
  results: Product[];
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
}

// Helper function to get full image URL
export const getImageUrl = (imagePath?: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://localhost:8000${imagePath}`;
};

export const productsService = {
  async getProducts(filters?: SearchFilters): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
          }
        });
      }
      
      const response = await api.get(`/products/?${params.toString()}`);
      const data = response.data;
      // Ensure we always return an array
      return Array.isArray(data) ? data : ((data as { results?: Product[] }).results || []);
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.detail || (error as any).message 
        : 'Failed to fetch products';
      throw new Error(errorMessage || 'Failed to fetch products');
    }
  },

  async searchProducts(filters: SearchFilters): Promise<SearchResponse> {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      
      const response = await api.get(`/products/search/?${params.toString()}`);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.detail || (error as any).message 
        : 'Failed to search products';
      throw new Error(errorMessage || 'Failed to search products');
    }
  },

  async getProduct(id: number): Promise<Product> {
    try {
      const response = await api.get(`/products/${id}/`);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.detail || (error as any).message 
        : 'Failed to fetch product';
      throw new Error(errorMessage || 'Failed to fetch product');
    }
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', data.price.toString());
      if (data.image) {
        formData.append('image', data.image);
      }
      if (data.is_available !== undefined) {
        formData.append('is_available', data.is_available.toString());
      }

      const response = await api.post('/products/', formData);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.detail || (error as any).message 
        : 'Failed to create product';
      throw new Error(errorMessage || 'Failed to create product');
    }
  },

  async updateProduct(id: number, data: UpdateProductData): Promise<Product> {
    try {
      const formData = new FormData();
      if (data.title) formData.append('title', data.title);
      if (data.description) formData.append('description', data.description);
      if (data.category) formData.append('category', data.category);
      if (data.price !== undefined) formData.append('price', data.price.toString());
      if (data.image) formData.append('image', data.image);
      if (data.is_available !== undefined) formData.append('is_available', data.is_available.toString());

      const response = await api.patch(`/products/${id}/`, formData);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.detail || (error as any).message 
        : 'Failed to update product';
      throw new Error(errorMessage || 'Failed to update product');
    }
  },

  async deleteProduct(id: number): Promise<void> {
    try {
      await api.delete(`/products/${id}/`);
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.detail || (error as any).message 
        : 'Failed to delete product';
      throw new Error(errorMessage || 'Failed to delete product');
    }
  },

  async toggleProductAvailability(id: number): Promise<{ message: string; is_available: boolean }> {
    try {
      const response = await api.post(`/products/${id}/toggle-availability/`);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.detail || (error as any).message 
        : 'Failed to toggle product availability';
      throw new Error(errorMessage || 'Failed to toggle product availability');
    }
  },

  async getUserProducts(): Promise<Product[]> {
    try {
      const response = await api.get('/products/my-products/');
      const data = response.data;
      // Ensure we always return an array
      return Array.isArray(data) ? data : ((data as { results?: Product[] }).results || []);
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.detail || (error as any).message 
        : 'Failed to fetch user products';
      throw new Error(errorMessage || 'Failed to fetch user products');
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get('/products/categories/list/');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.detail || (error as any).message 
        : 'Failed to fetch categories';
      throw new Error(errorMessage || 'Failed to fetch categories');
    }
  }
};

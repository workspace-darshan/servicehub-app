/**
 * Service Service
 * Handles service and category-related API calls
 */

import { api } from './api';

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  _count?: {
    services: number;
  };
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  category?: ServiceCategory;
  _count?: {
    providers: number;
  };
}

class ServiceService {
  /**
   * Get all service categories
   */
  async getCategories() {
    return await api.get<ServiceCategory[]>('/services/categories');
  }

  /**
   * Get all services
   */
  async getServices(params?: {
    page?: number;
    pageSize?: number;
    categoryId?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.categoryId) queryParams.append('categoryId', params.categoryId);
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return await api.get<Service[]>(`/services${query ? `?${query}` : ''}`);
  }

  /**
   * Get service by ID
   */
  async getServiceById(id: string) {
    return await api.get<Service>(`/services/${id}`);
  }

  /**
   * Get services by category
   */
  async getServicesByCategory(categoryId: string, params?: {
    page?: number;
    pageSize?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    
    const query = queryParams.toString();
    return await api.get<Service[]>(
      `/services/category/${categoryId}${query ? `?${query}` : ''}`
    );
  }

  /**
   * Search services
   */
  async searchServices(query: string, params?: {
    page?: number;
    pageSize?: number;
  }) {
    const queryParams = new URLSearchParams({ q: query });
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    
    return await api.get<Service[]>(`/services/search?${queryParams.toString()}`);
  }
}

export const serviceService = new ServiceService();

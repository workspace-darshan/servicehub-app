/**
 * Provider Service
 * Handles provider-related API calls
 */

import { api } from './api';

export interface ProviderProfile {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  city: string;
  state: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  serviceArea: string;
  serviceRadius: number;
  verified: boolean;
  status: string;
  rating: number;
  totalReviews: number;
  workDays: string[];
  startTime?: string;
  endTime?: string;
  languages: string[];
  photos: string[];
  user?: {
    name: string;
    phone: string;
  };
  services?: any[];
  reviews?: any[];
}

export interface RegisterProviderData {
  businessName: string;
  description: string;
  street?: string;
  city: string;
  state: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  serviceArea: string;
  serviceRadius?: number;
  workDays?: string[];
  startTime?: string;
  endTime?: string;
  languages?: string[];
  services?: string[];
}

class ProviderService {
  /**
   * Register as provider
   */
  async registerProvider(data: RegisterProviderData) {
    return await api.post<ProviderProfile>('/providers/register', data);
  }

  /**
   * Get all providers
   */
  async getProviders(params?: {
    page?: number;
    pageSize?: number;
    city?: string;
    serviceId?: string;
    verified?: boolean;
    minRating?: number;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.city) queryParams.append('city', params.city);
    if (params?.serviceId) queryParams.append('serviceId', params.serviceId);
    if (params?.verified !== undefined) queryParams.append('verified', params.verified.toString());
    if (params?.minRating) queryParams.append('minRating', params.minRating.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return await api.get<ProviderProfile[]>(`/providers${query ? `?${query}` : ''}`);
  }

  /**
   * Search providers
   */
  async searchProviders(params: {
    latitude?: number;
    longitude?: number;
    radius?: number;
    serviceId?: string;
    city?: string;
    page?: number;
    pageSize?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params.latitude) queryParams.append('latitude', params.latitude.toString());
    if (params.longitude) queryParams.append('longitude', params.longitude.toString());
    if (params.radius) queryParams.append('radius', params.radius.toString());
    if (params.serviceId) queryParams.append('serviceId', params.serviceId);
    if (params.city) queryParams.append('city', params.city);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    
    return await api.get<ProviderProfile[]>(`/providers/search?${queryParams.toString()}`);
  }

  /**
   * Get provider by ID
   */
  async getProviderById(id: string) {
    return await api.get<ProviderProfile>(`/providers/${id}`);
  }

  /**
   * Update provider profile
   */
  async updateProfile(data: Partial<RegisterProviderData>) {
    return await api.put<ProviderProfile>('/providers/profile', data);
  }

  /**
   * Update provider services
   */
  async updateServices(services: Array<{
    serviceId: string;
    price?: number;
    description?: string;
  }>) {
    return await api.put('/providers/services', { services });
  }

  /**
   * Get provider reviews
   */
  async getProviderReviews(providerId: string, params?: {
    page?: number;
    pageSize?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    
    const query = queryParams.toString();
    return await api.get(`/providers/${providerId}/reviews${query ? `?${query}` : ''}`);
  }

  /**
   * Get dashboard stats
   */
  async getDashboardStats() {
    return await api.get('/providers/dashboard/stats');
  }
}

export const providerService = new ProviderService();

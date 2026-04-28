/**
 * User Service
 * Handles user-related API calls
 */

import { api } from './api';

class UserService {
  /**
   * Get user profile
   */
  async getProfile() {
    return await api.get('/users/profile');
  }

  /**
   * Update user profile
   */
  async updateProfile(data: {
    name?: string;
    phone?: string;
    location?: string;
  }) {
    return await api.put('/users/profile', data);
  }

  /**
   * Get search history
   */
  async getSearchHistory(params?: {
    page?: number;
    pageSize?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    
    const query = queryParams.toString();
    return await api.get(`/users/search-history${query ? `?${query}` : ''}`);
  }

  /**
   * Add search history
   */
  async addSearchHistory(query: string) {
    return await api.post('/users/search-history', { query });
  }

  /**
   * Clear search history
   */
  async clearSearchHistory() {
    return await api.delete('/users/search-history');
  }

  /**
   * Delete search history item
   */
  async deleteSearchHistoryItem(id: string) {
    return await api.delete(`/users/search-history/${id}`);
  }

  /**
   * Get saved providers
   */
  async getSavedProviders(params?: {
    page?: number;
    pageSize?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    
    const query = queryParams.toString();
    return await api.get(`/users/saved-providers${query ? `?${query}` : ''}`);
  }

  /**
   * Save provider
   */
  async saveProvider(providerId: string) {
    return await api.post(`/users/saved-providers/${providerId}`);
  }

  /**
   * Unsave provider
   */
  async unsaveProvider(providerId: string) {
    return await api.delete(`/users/saved-providers/${providerId}`);
  }

  /**
   * Get notifications
   */
  async getNotifications(params?: {
    page?: number;
    pageSize?: number;
    unreadOnly?: boolean;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.unreadOnly !== undefined) {
      queryParams.append('unreadOnly', params.unreadOnly.toString());
    }
    
    const query = queryParams.toString();
    return await api.get(`/users/notifications${query ? `?${query}` : ''}`);
  }

  /**
   * Mark notification as read
   */
  async markNotificationRead(id: string) {
    return await api.put(`/users/notifications/${id}/read`);
  }

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsRead() {
    return await api.put('/users/notifications/read-all');
  }
}

export const userService = new UserService();

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  location: string;
  role: string;
  isProvider: boolean;
  createdAt: string;
}

export interface LoginResponse {
  user: User;
  providerProfile?: any;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
  location: string;
}

class AuthService {
  /**
   * Register new user
   */
  async register(data: RegisterData) {
    const response = await api.post<LoginResponse>('/auth/register', data);
    
    if (response.success && response.data) {
      // Save tokens
      await AsyncStorage.setItem('@auth_token', response.data.tokens.accessToken);
      await AsyncStorage.setItem('@refresh_token', response.data.tokens.refreshToken);
      
      // Save user data
      await AsyncStorage.setItem('@user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  /**
   * Login user
   */
  async login(email: string, password: string) {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    
    if (response.success && response.data) {
      // Save tokens
      await AsyncStorage.setItem('@auth_token', response.data.tokens.accessToken);
      await AsyncStorage.setItem('@refresh_token', response.data.tokens.refreshToken);
      
      // Save user data
      await AsyncStorage.setItem('@user', JSON.stringify(response.data.user));
      
      // Save provider profile if exists
      if (response.data.providerProfile) {
        await AsyncStorage.setItem(
          '@user_provider_profile',
          JSON.stringify(response.data.providerProfile)
        );
      }
    }
    
    return response;
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      const refreshToken = await AsyncStorage.getItem('@refresh_token');
      
      // Call logout API
      await api.post('/auth/logout', { refreshToken });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage
      await AsyncStorage.multiRemove([
        '@auth_token',
        '@refresh_token',
        '@user',
        '@user_provider_profile',
      ]);
    }
  }

  /**
   * Get current user
   */
  async getMe() {
    const response = await api.get<{ user: User; providerProfile?: any }>('/auth/me');
    
    if (response.success && response.data) {
      // Update stored user data
      await AsyncStorage.setItem('@user', JSON.stringify(response.data.user));
      
      if (response.data.providerProfile) {
        await AsyncStorage.setItem(
          '@user_provider_profile',
          JSON.stringify(response.data.providerProfile)
        );
      }
    }
    
    return response;
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string) {
    return await api.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  /**
   * Refresh access token
   */
  async refreshToken() {
    try {
      const refreshToken = await AsyncStorage.getItem('@refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }
      
      const response = await api.post<{ accessToken: string }>('/auth/refresh', {
        refreshToken,
      });
      
      if (response.success && response.data) {
        await AsyncStorage.setItem('@auth_token', response.data.accessToken);
      }
      
      return response;
    } catch (error) {
      // If refresh fails, logout user
      await this.logout();
      throw error;
    }
  }
}

export const authService = new AuthService();

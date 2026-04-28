/**
 * API Service
 * Centralized API configuration and HTTP client
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, API_ENDPOINTS, STORAGE_KEYS, HTTP_STATUS } from '../config';
import { retry, cleanObject } from '../utils';

interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: any;
  errors?: any[];
  timestamp: string;
}

class ApiService {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Get auth token from storage
   */
  private async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  /**
   * Make HTTP request with retry logic
   */
  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const makeRequest = async (): Promise<ApiResponse<T>> => {
      try {
        const token = await this.getToken();
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          ...options.headers,
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(`${this.baseURL}${endpoint}`, {
          ...options,
          headers,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
          // Handle 401 Unauthorized - token expired
          if (response.status === HTTP_STATUS.UNAUTHORIZED) {
            await this.handleUnauthorized();
          }

          throw {
            ...data,
            statusCode: response.status,
          };
        }

        return data;
      } catch (error: any) {
        if (error.name === 'AbortError') {
          throw {
            success: false,
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Request timeout',
            timestamp: new Date().toISOString(),
          };
        }

        console.error('API Error:', error);
        throw error;
      }
    };

    // Retry logic for failed requests
    return retry(makeRequest, API_CONFIG.RETRY_ATTEMPTS, API_CONFIG.RETRY_DELAY);
  }

  /**
   * Handle unauthorized error (token expired)
   */
  private async handleUnauthorized(): Promise<void> {
    try {
      // Clear tokens
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER,
      ]);
      
      // Optionally trigger logout event
      // You can emit an event here to notify the app
    } catch (error) {
      console.error('Error handling unauthorized:', error);
    }
  }

  /**
   * GET request
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    let url = endpoint;
    
    if (params) {
      const cleanParams = cleanObject(params);
      const queryString = new URLSearchParams(cleanParams as any).toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    return this.request<T>(url, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const api = new ApiService();
export type { ApiResponse };
export { API_ENDPOINTS, STORAGE_KEYS, HTTP_STATUS };

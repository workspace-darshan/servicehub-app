/**
 * API Configuration
 * Centralized API endpoints and configuration
 */

import { Platform } from 'react-native';

// Environment-based API URL
const getApiUrl = () => {
  if (__DEV__) {
    // Development
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5001/api/v1'; // Android Emulator
    } else if (Platform.OS === 'ios') {
      return 'http://localhost:5001/api/v1'; // iOS Simulator
    } else {
      return 'http://localhost:5001/api/v1'; // Web
    }
  } else {
    // Production - Replace with your production API URL
    return 'https://api.servicehub.com/api/v1';
  }
};

export const API_CONFIG = {
  BASE_URL: getApiUrl(),
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  
  // Users
  USERS: {
    PROFILE: '/users/profile',
    SEARCH_HISTORY: '/users/search-history',
    SAVED_PROVIDERS: '/users/saved-providers',
    NOTIFICATIONS: '/users/notifications',
  },
  
  // Services
  SERVICES: {
    BASE: '/services',
    CATEGORIES: '/services/categories',
    SEARCH: '/services/search',
    BY_CATEGORY: (categoryId: string) => `/services/category/${categoryId}`,
    BY_ID: (id: string) => `/services/${id}`,
  },
  
  // Providers
  PROVIDERS: {
    BASE: '/providers',
    REGISTER: '/providers/register',
    SEARCH: '/providers/search',
    PROFILE: '/providers/profile',
    SERVICES: '/providers/services',
    DASHBOARD_STATS: '/providers/dashboard/stats',
    BY_ID: (id: string) => `/providers/${id}`,
    REVIEWS: (id: string) => `/providers/${id}/reviews`,
  },
  
  // Enquiries
  ENQUIRIES: {
    BASE: '/enquiries',
    BY_ID: (id: string) => `/enquiries/${id}`,
    RESPOND: (id: string) => `/enquiries/${id}/respond`,
    STATUS: (id: string) => `/enquiries/${id}/status`,
  },
  
  // Reviews
  REVIEWS: {
    BASE: '/reviews',
    BY_ID: (id: string) => `/reviews/${id}`,
    BY_PROVIDER: (providerId: string) => `/reviews/provider/${providerId}`,
    RESPOND: (id: string) => `/reviews/${id}/respond`,
    HELPFUL: (id: string) => `/reviews/${id}/helpful`,
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  REFRESH_TOKEN: '@refresh_token',
  USER: '@user',
  PROVIDER_PROFILE: '@user_provider_profile',
  ONBOARDING_SEEN: '@has_seen_onboarding',
  THEME: '@theme_preference',
  LANGUAGE: '@language_preference',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

export default API_CONFIG;

/**
 * Validation Utilities
 * Reusable validation functions
 */

import { APP_CONFIG } from '../config';

export const validation = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number (Indian format)
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate password strength
   */
  isValidPassword: (password: string): { valid: boolean; message?: string } => {
    if (password.length < APP_CONFIG.MIN_PASSWORD_LENGTH) {
      return {
        valid: false,
        message: `Password must be at least ${APP_CONFIG.MIN_PASSWORD_LENGTH} characters`,
      };
    }

    if (password.length > APP_CONFIG.MAX_PASSWORD_LENGTH) {
      return {
        valid: false,
        message: `Password must not exceed ${APP_CONFIG.MAX_PASSWORD_LENGTH} characters`,
      };
    }

    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        message: 'Password must contain at least one uppercase letter',
      };
    }

    if (!/[a-z]/.test(password)) {
      return {
        valid: false,
        message: 'Password must contain at least one lowercase letter',
      };
    }

    if (!/[0-9]/.test(password)) {
      return {
        valid: false,
        message: 'Password must contain at least one number',
      };
    }

    return { valid: true };
  },

  /**
   * Validate name
   */
  isValidName: (name: string): boolean => {
    return (
      name.length >= APP_CONFIG.MIN_NAME_LENGTH &&
      name.length <= APP_CONFIG.MAX_NAME_LENGTH
    );
  },

  /**
   * Validate rating
   */
  isValidRating: (rating: number): boolean => {
    return rating >= APP_CONFIG.MIN_RATING && rating <= APP_CONFIG.MAX_RATING;
  },

  /**
   * Validate required field
   */
  isRequired: (value: any): boolean => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  /**
   * Validate URL
   */
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate number range
   */
  isInRange: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  },
};

export default validation;

/**
 * Application Configuration
 * Global app settings and constants
 */

export const APP_CONFIG = {
  // App Info
  APP_NAME: 'ServiceHub',
  APP_VERSION: '1.0.0',
  APP_BUILD: '100',
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Search
  MIN_SEARCH_LENGTH: 2,
  SEARCH_DEBOUNCE_MS: 500,
  MAX_RECENT_SEARCHES: 10,
  
  // Images
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_GALLERY_IMAGES: 6,
  
  // Validation
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 1000,
  
  // Provider
  DEFAULT_SERVICE_RADIUS: 10, // km
  MAX_SERVICE_RADIUS: 50, // km
  MIN_RATING: 0,
  MAX_RATING: 5,
  
  // Enquiry
  ENQUIRY_STATUSES: [
    'PENDING',
    'VIEWED',
    'RESPONDED',
    'ACCEPTED',
    'REJECTED',
    'COMPLETED',
    'CANCELLED',
  ] as const,
  
  // Days of week
  DAYS_OF_WEEK: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const,
  
  // Languages
  SUPPORTED_LANGUAGES: ['English', 'Hindi', 'Gujarati', 'Marathi'] as const,
  
  // Contact
  SUPPORT_EMAIL: 'support@servicehub.com',
  SUPPORT_PHONE: '+91-1234567890',
  
  // Social Media
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/servicehub',
    TWITTER: 'https://twitter.com/servicehub',
    INSTAGRAM: 'https://instagram.com/servicehub',
    LINKEDIN: 'https://linkedin.com/company/servicehub',
  },
  
  // Legal
  PRIVACY_POLICY_URL: 'https://servicehub.com/privacy',
  TERMS_URL: 'https://servicehub.com/terms',
  
  // Features
  FEATURES: {
    ENABLE_NOTIFICATIONS: true,
    ENABLE_LOCATION: true,
    ENABLE_ANALYTICS: false,
    ENABLE_CRASH_REPORTING: false,
  },
};

export type EnquiryStatus = typeof APP_CONFIG.ENQUIRY_STATUSES[number];
export type DayOfWeek = typeof APP_CONFIG.DAYS_OF_WEEK[number];
export type SupportedLanguage = typeof APP_CONFIG.SUPPORTED_LANGUAGES[number];

export default APP_CONFIG;

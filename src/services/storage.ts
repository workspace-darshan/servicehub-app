import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
const KEYS = {
  USER: '@user',
  AUTH_TOKEN: '@auth_token',
  SEARCH_HISTORY: '@search_history',
  SAVED_PROVIDERS: '@saved_providers',
  USER_PROVIDER_PROFILE: '@user_provider_profile',
  RECENT_BOOKINGS: '@recent_bookings',
  HAS_SEEN_ONBOARDING: '@has_seen_onboarding',
};

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  location: string;
  isProvider: boolean;
  createdAt: string;
}

export interface ProviderProfile {
  userId: string;
  businessName: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    googleMapsLink?: string;
  };
  services: string[];
  serviceArea: string;
  serviceRadius: number;
  rating: number;
  reviews: number;
  verified: boolean;
  photos: string[];
  workDays: string;
  workHours: string;
  languages: string[];
  price?: number;
  createdAt: string;
}

export interface SearchHistoryItem {
  query: string;
  timestamp: string;
}

export interface SavedProvider {
  id: string;
  name: string;
  service: string;
  rating: number;
  savedAt: string;
}

// Auth Functions
export const saveUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const user = await AsyncStorage.getItem(KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([KEYS.USER, KEYS.AUTH_TOKEN]);
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Search History Functions
export const addSearchHistory = async (query: string): Promise<void> => {
  try {
    const history = await getSearchHistory();
    const newItem: SearchHistoryItem = {
      query,
      timestamp: new Date().toISOString(),
    };
    
    // Remove duplicates and add to front
    const filtered = history.filter(item => item.query.toLowerCase() !== query.toLowerCase());
    const updated = [newItem, ...filtered].slice(0, 10); // Keep only 10 recent searches
    
    await AsyncStorage.setItem(KEYS.SEARCH_HISTORY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error adding search history:', error);
  }
};

export const getSearchHistory = async (): Promise<SearchHistoryItem[]> => {
  try {
    const history = await AsyncStorage.getItem(KEYS.SEARCH_HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

export const clearSearchHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEYS.SEARCH_HISTORY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
};

// Saved Providers Functions
export const saveProvider = async (provider: SavedProvider): Promise<void> => {
  try {
    const saved = await getSavedProviders();
    const exists = saved.find(p => p.id === provider.id);
    
    if (!exists) {
      const updated = [{ ...provider, savedAt: new Date().toISOString() }, ...saved];
      await AsyncStorage.setItem(KEYS.SAVED_PROVIDERS, JSON.stringify(updated));
    }
  } catch (error) {
    console.error('Error saving provider:', error);
  }
};

export const unsaveProvider = async (providerId: string): Promise<void> => {
  try {
    const saved = await getSavedProviders();
    const updated = saved.filter(p => p.id !== providerId);
    await AsyncStorage.setItem(KEYS.SAVED_PROVIDERS, JSON.stringify(updated));
  } catch (error) {
    console.error('Error unsaving provider:', error);
  }
};

export const getSavedProviders = async (): Promise<SavedProvider[]> => {
  try {
    const saved = await AsyncStorage.getItem(KEYS.SAVED_PROVIDERS);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error getting saved providers:', error);
    return [];
  }
};

export const isProviderSaved = async (providerId: string): Promise<boolean> => {
  try {
    const saved = await getSavedProviders();
    return saved.some(p => p.id === providerId);
  } catch (error) {
    console.error('Error checking if provider is saved:', error);
    return false;
  }
};

// Provider Profile Functions
export const saveProviderProfile = async (profile: ProviderProfile): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.USER_PROVIDER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving provider profile:', error);
  }
};

export const getProviderProfile = async (): Promise<ProviderProfile | null> => {
  try {
    const profile = await AsyncStorage.getItem(KEYS.USER_PROVIDER_PROFILE);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error('Error getting provider profile:', error);
    return null;
  }
};

export const updateUserToProvider = async (): Promise<void> => {
  try {
    const user = await getUser();
    if (user) {
      user.isProvider = true;
      await saveUser(user);
    }
  } catch (error) {
    console.error('Error updating user to provider:', error);
  }
};

export const toggleProviderMode = async (isProvider: boolean): Promise<void> => {
  try {
    const user = await getUser();
    if (user) {
      user.isProvider = isProvider;
      await saveUser(user);
    }
  } catch (error) {
    console.error('Error toggling provider mode:', error);
  }
};

export const deactivateProviderAccount = async (): Promise<void> => {
  try {
    const user = await getUser();
    if (user) {
      user.isProvider = false;
      await saveUser(user);
    }
  } catch (error) {
    console.error('Error deactivating provider account:', error);
  }
};

// Clear all data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};

// Onboarding Functions
export const setHasSeenOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.HAS_SEEN_ONBOARDING, 'true');
  } catch (error) {
    console.error('Error setting onboarding flag:', error);
  }
};

export const getHasSeenOnboarding = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(KEYS.HAS_SEEN_ONBOARDING);
    return value === 'true';
  } catch (error) {
    console.error('Error getting onboarding flag:', error);
    return false;
  }
};

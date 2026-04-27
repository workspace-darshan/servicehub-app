import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SavedProvider,
  SearchHistoryItem,
  ProviderProfile,
  getSavedProviders,
  saveProvider as storageSaveProvider,
  unsaveProvider as storageUnsaveProvider,
  getSearchHistory,
  addSearchHistory as storageAddSearchHistory,
  clearSearchHistory as storageClearSearchHistory,
  getProviderProfile,
  saveProviderProfile as storageSaveProviderProfile,
  updateUserToProvider,
} from '../services/storage';

interface AppContextType {
  savedProviders: SavedProvider[];
  searchHistory: SearchHistoryItem[];
  providerProfile: ProviderProfile | null;
  saveProvider: (provider: SavedProvider) => Promise<void>;
  unsaveProvider: (providerId: string) => Promise<void>;
  isProviderSaved: (providerId: string) => boolean;
  addSearchHistory: (query: string) => Promise<void>;
  clearSearchHistory: () => Promise<void>;
  saveProviderProfile: (profile: ProviderProfile) => Promise<void>;
  becomeProvider: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [savedProviders, setSavedProviders] = useState<SavedProvider[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [providerProfile, setProviderProfile] = useState<ProviderProfile | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [saved, history, profile] = await Promise.all([
        getSavedProviders(),
        getSearchHistory(),
        getProviderProfile(),
      ]);
      setSavedProviders(saved);
      setSearchHistory(history);
      setProviderProfile(profile);
    } catch (error) {
      console.error('Error loading app data:', error);
    }
  };

  const saveProvider = async (provider: SavedProvider) => {
    try {
      await storageSaveProvider(provider);
      setSavedProviders(prev => [provider, ...prev]);
    } catch (error) {
      console.error('Error saving provider:', error);
    }
  };

  const unsaveProvider = async (providerId: string) => {
    try {
      await storageUnsaveProvider(providerId);
      setSavedProviders(prev => prev.filter(p => p.id !== providerId));
    } catch (error) {
      console.error('Error unsaving provider:', error);
    }
  };

  const isProviderSaved = (providerId: string): boolean => {
    return savedProviders.some(p => p.id === providerId);
  };

  const addSearchHistory = async (query: string) => {
    try {
      await storageAddSearchHistory(query);
      const updated = await getSearchHistory();
      setSearchHistory(updated);
    } catch (error) {
      console.error('Error adding search history:', error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      await storageClearSearchHistory();
      setSearchHistory([]);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  const saveProviderProfile = async (profile: ProviderProfile) => {
    try {
      await storageSaveProviderProfile(profile);
      setProviderProfile(profile);
    } catch (error) {
      console.error('Error saving provider profile:', error);
    }
  };

  const becomeProvider = async () => {
    try {
      await updateUserToProvider();
    } catch (error) {
      console.error('Error becoming provider:', error);
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  return (
    <AppContext.Provider
      value={{
        savedProviders,
        searchHistory,
        providerProfile,
        saveProvider,
        unsaveProvider,
        isProviderSaved,
        addSearchHistory,
        clearSearchHistory,
        saveProviderProfile,
        becomeProvider,
        refreshData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

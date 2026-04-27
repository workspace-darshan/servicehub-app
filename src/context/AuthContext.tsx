import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getUser, saveUser, saveAuthToken, logout as storageLogout } from '../services/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string, phone: string, location: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  toggleProviderMode: (isProvider: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user database (in real app, this would be a backend)
const MOCK_USERS_KEY = '@mock_users_db';

const getMockUsers = async (): Promise<any[]> => {
  try {
    const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
    const users = await AsyncStorage.getItem(MOCK_USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    return [];
  }
};

const saveMockUsers = async (users: any[]): Promise<void> => {
  try {
    const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
    await AsyncStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving mock users:', error);
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await getUser();
      setUser(savedUser);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Get mock users
      const users = await getMockUsers();
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        await saveUser(userWithoutPassword);
        await saveAuthToken('mock-token-' + Date.now());
        setUser(userWithoutPassword);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phone: string,
    location: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Get existing users
      const users = await getMockUsers();
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        return { success: false, error: 'Email already registered' };
      }

      // Create new user
      const newUser: User = {
        id: 'user-' + Date.now(),
        email,
        name,
        phone,
        location,
        isProvider: false,
        createdAt: new Date().toISOString(),
      };

      // Save to mock database
      users.push({ ...newUser, password });
      await saveMockUsers(users);

      // Save to current session
      await saveUser(newUser);
      await saveAuthToken('mock-token-' + Date.now());
      setUser(newUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await storageLogout();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...updates };
        await saveUser(updatedUser);
        setUser(updatedUser);

        // Update in mock database
        const users = await getMockUsers();
        const index = users.findIndex((u: any) => u.id === user.id);
        if (index !== -1) {
          users[index] = { ...users[index], ...updates };
          await saveMockUsers(users);
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const toggleProviderMode = async (isProvider: boolean) => {
    try {
      if (user) {
        const updatedUser = { ...user, isProvider };
        await saveUser(updatedUser);
        setUser(updatedUser);

        // Update in mock database
        const users = await getMockUsers();
        const index = users.findIndex((u: any) => u.id === user.id);
        if (index !== -1) {
          users[index] = { ...users[index], isProvider };
          await saveMockUsers(users);
        }
      }
    } catch (error) {
      console.error('Error toggling provider mode:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
        toggleProviderMode,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

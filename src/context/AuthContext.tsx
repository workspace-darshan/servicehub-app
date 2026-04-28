import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, User } from '../services';
import { getUser, saveUser } from '../services/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string, phone: string, location: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  toggleProviderMode: (isProvider: boolean) => Promise<void>;
  refreshUser: () => Promise<void>;
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

  const refreshUser = async () => {
    try {
      const response = await authService.getMe();
      if (response.success && response.data) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authService.login(email, password);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed. Please try again.' 
      };
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
      const response = await authService.register({
        email,
        password,
        name,
        phone,
        location,
      });
      
      if (response.success && response.data) {
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, error: response.message || 'Registration failed' };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      // Still clear user even if API call fails
      setUser(null);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...updates };
        await saveUser(updatedUser);
        setUser(updatedUser);
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
        
        // Refresh user data from server
        await refreshUser();
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
        refreshUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

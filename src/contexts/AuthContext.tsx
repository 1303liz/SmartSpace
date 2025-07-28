import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginUser, logoutUser, type LoginResponse, type LogoutData } from '../services/auth';

interface User {
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user?: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  setUser: () => {},
  setTokens: () => {},
  logout: async () => {},
  isAuthenticated: false,
  login: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing tokens on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && refresh && userData) {
      try {
        const user = JSON.parse(userData);
        setAccessToken(token);
        setRefreshToken(refresh);
        setUserState(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
      }
    }
    setLoading(false);
  }, []);

  const setUser = (userData?: User) => {
    if (userData) {
      setUserState(userData);
      localStorage.setItem('user_data', JSON.stringify(userData));
    }
  };

  const setTokens = (access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: LoginResponse = await loginUser({ email, password });
      
      // Set tokens
      setTokens(response.access_token, response.refresh_token);
      
      // Set user data
      const userData: User = {
        email: response.email,
        fullName: response.full_name,
      };
      setUser(userData);
      
    } catch (error: any) {
      setError(error.detail || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (refreshToken) {
        const logoutData: LogoutData = { refresh_token: refreshToken };
        await logoutUser(logoutData);
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local state
      setUserState(null);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
    }
  };

  const isAuthenticated = !!accessToken && !!user;

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      refreshToken,
      loading,
      error,
      setUser,
      setTokens,
      logout,
      login,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

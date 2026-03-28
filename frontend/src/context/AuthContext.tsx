import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  title?: string;
  bio?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          // You might need a /me or /profile endpoint that doesn't require an ID if you're the owner
          // For now, let's assume we store the user ID in localStorage as well
          const userId = localStorage.getItem('userId');
          if (userId) {
            const { data } = await api.get(`/users/profile/${userId}`);
            setUser(data);
          }
        } catch (error) {
          console.error('Failed to fetch user profile', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userId');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('userId', data._id);
  };

  const register = async (name: string, email: string, password: string) => {
    console.log(name, email, password,'reached context');
    const { data } = await api.post('/auth/register', { name, email, password });
    console.log(data);
    setUser(data);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('userId', data._id);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  };

  const updateProfile = async (profileData: Partial<User>) => {
      const { data } = await api.put('/users/profile', profileData);
      setUser(data);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

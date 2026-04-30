// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, AuthProfile } from '@/src/services/authService';

interface AuthContextType {
  user: AuthProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  loginWithOTP: (phone: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const user = await authService.signInWithGoogle();
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const loginWithOTP = async (phone: string, code: string) => {
    try {
      const user = await authService.signInWithOTP(phone, code);
      setUser(user);
    } catch (error) {
      console.error("OTP Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithOTP, logout }}>
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

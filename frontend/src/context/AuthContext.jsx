import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi, tokenStore } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!tokenStore.get()) {
      setUser(null);
      setLoading(false);
      return null;
    }
    try {
      const { user } = await authApi.me();
      setUser(user);
      return user;
    } catch {
      tokenStore.clear();
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    if (res?.token) tokenStore.set(res.token);
    setUser(res.user ?? null);
    return res;
  };

  const register = async (payload) => {
    const res = await authApi.register(payload);
    if (res?.token) tokenStore.set(res.token);
    setUser(res.user ?? null);
    return res;
  };

  const logout = () => {
    tokenStore.clear();
    setUser(null);
  };

  const updateProfile = async (formData) => {
    const res = await authApi.updateProfile(formData);
    if (res?.user) setUser(res.user);
    return res;
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    login,
    register,
    logout,
    refresh,
    updateProfile,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

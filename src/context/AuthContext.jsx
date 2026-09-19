import React, { createContext, useState, useEffect, useMemo } from 'react';
import { STORAGE_KEYS, USER_ROLES } from '../utils/constants';
import { storage } from '../utils/storage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.get(STORAGE_KEYS.USER_DATA, null));
  const [token, setToken] = useState(() => storage.get(STORAGE_KEYS.AUTH_TOKEN, null));
  const [loading, setLoading] = useState(false);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    storage.set(STORAGE_KEYS.USER_DATA, userData);
    storage.set(STORAGE_KEYS.AUTH_TOKEN, authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.remove(STORAGE_KEYS.USER_DATA);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  };

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAuthenticated: !!token,
    role: user?.role || USER_ROLES.BUYER,
    login,
    logout,
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

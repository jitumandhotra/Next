'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch('/api/user/check-auth');
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error('Error fetching auth status:', error);
      }
    };

    fetchAuthStatus();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };
 
  const logout = () => {
    document.cookie = 'site-logged=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

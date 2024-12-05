import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    // Simulate API call
    try {
      // In a real app, this would be an API call
      setUser({ name: credentials.email });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setHasPaid(false);
  };

  const handlePayment = () => {
    // Simulate payment process
    setHasPaid(true);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        hasPaid, 
        login, 
        logout, 
        handlePayment 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 
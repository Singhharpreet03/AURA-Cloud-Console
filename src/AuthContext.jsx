import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Valid users
  const validUsers = [
    { 
      username: 'harpreet', 
      password: '1111', 
      fullName: 'Harpreet Singh',
      email: 'harpreet.singh@company.com',
      role: 'Administrator'
    },
    { 
      username: 'rashmeet', 
      password: '1111', 
      fullName: 'Rashmeet Singh',
      email: 'rashmeet.singh@company.com',
      role: 'Administrator'
    },
    { 
      username: 'prerna', 
      password: '1111', 
      fullName: 'Prerna Saxena',
      email: 'prerna.saxena@company.com',
      role: 'Administrator'
    }
  ];

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('aura_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('aura_user');
      }
    }
    setLoading(false);
  }, []);


  const login = async (username, password) => {
    // If you call a real API, wrap it in try/catch and return a shaped object.
    try {
      // Example: local users array (or replace with your fetch)
      const foundUser = validUsers.find(
        (u) => u.username === (username || "").trim() && u.password === password
      );

      if (!foundUser) {
        return { success: false, error: "Invalid username or password" };
      }

      const { password: _p, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("aura_user", JSON.stringify(userWithoutPassword));

      // Always return this shape so callers can rely on it
      return { success: true, user: userWithoutPassword };
    } catch (err) {
      console.error("AuthContext.login error:", err);
      return { success: false, error: "Login failed (internal error)" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aura_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
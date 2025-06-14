import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default credentials (in real app, this would be from backend)
  const defaultCredentials = {
    username: "admin",
    password: "admin123",
  };

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // Simple authentication (in real app, this would be API call)
    if (
      username === defaultCredentials.username &&
      password === defaultCredentials.password
    ) {
      const token = btoa(`${username}:${password}:${Date.now()}`);
      const userData = {
        username: username,
        role: "admin",
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      return { success: true };
    } else {
      return { success: false, error: "Invalid username or password" };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

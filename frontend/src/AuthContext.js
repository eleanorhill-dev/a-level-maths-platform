import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [xp, setXp] = useState(0);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/profile", {
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(true);
        fetchXp(); // Fetch XP when user is authenticated
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setIsAuthenticated(false);
    }
  };

  const fetchXp = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_user_xp", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setXp(data.total_xp);
      } else {
        console.error("Failed to fetch XP");
      }
    } catch (error) {
      console.error("Error fetching XP:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (token) => {
    sessionStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    fetchXp(); // Optional: Fetch XP on manual login
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setXp(0); // Clear XP on logout
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, xp, setXp, fetchXp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

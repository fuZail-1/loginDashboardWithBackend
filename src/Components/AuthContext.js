import React, { createContext, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedInFromLocalStorage =
    localStorage.getItem("isLoggedIn") === "true";
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInFromLocalStorage);

  const login = () => {
    // Perform login actions (e.g., validate credentials)
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform logout actions (e.g., clear tokens, reset state)
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const signup = (data, token) => {
    const result = { ...data, token };
    localStorage.setItem("user", JSON.stringify(result));
  };
  const login = (data, token) => {
    const result = { ...data, token };
    localStorage.setItem("user", JSON.stringify(result));
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const authorize = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  return (
    <AuthContext.Provider value={{ authorize, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

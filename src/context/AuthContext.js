import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    // Listen for changes in login status or username
    setIsLoggedIn(Boolean(localStorage.getItem("token")));
    setUsername(localStorage.getItem("username") || "");
  }, []);

  const login = (user) => {
    console.log("Login function triggered", user); // Log user data to check
    localStorage.setItem("token", user.token); // Store token in localStorage explicitly
      localStorage.setItem("username", user.name); // Store username in localStorage
      localStorage.setItem("userId", user.id); // Store email in localStorage
    setIsLoggedIn(true);
    setUsername(user.name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

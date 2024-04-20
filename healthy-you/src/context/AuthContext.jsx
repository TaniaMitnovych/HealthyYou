import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false);
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
  };
  const getUser = () => {
    return user;
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, loading, user, updateUser, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

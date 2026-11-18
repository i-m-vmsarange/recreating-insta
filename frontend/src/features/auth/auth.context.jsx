import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await login(username, password);
      console.log(response);
      setUser(response.user);
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async (username, email, password, bio) => {
    setLoading(true);
    try {
      const response = await register(username, email, password, bio);
      setUser(response.user);
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getMe();
      setUser(response.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

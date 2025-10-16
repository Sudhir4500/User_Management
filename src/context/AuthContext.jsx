import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem("auth")) || null);

  const login = async (username, password) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });
      localStorage.setItem("auth", JSON.stringify(res.data));
      setAuth(res.data);
    } catch (err) {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("theme");
    localStorage.removeItem("itemsPerPage");
    localStorage.removeItem("favorites");
    setAuth(null);
  };

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
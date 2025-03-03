import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";
import { getToken, saveToken, removeToken } from "../utils/auth";

// Create authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token }); 
    }
  }, []);

  // Function to log in a user
  const login = async (email, password) => {
    const res = await loginUser({ email, password }); 
    saveToken(res.data.token); 
    setUser(res.data); 
  };

  // Function to log out a user
  const logout = () => {
    removeToken(); 
    setUser(null); 
    window.location.href = "/login"; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

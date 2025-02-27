import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";
import { getToken, saveToken, removeToken } from "../utils/auth";

// Create authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to store user authentication details
  const [user, setUser] = useState(null);

  // Check if a token exists in local storage when the component mounts
  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token }); // Set user state if a valid token is found
    }
  }, []);

  // Function to log in a user
  const login = async (email, password) => {
    const res = await loginUser({ email, password }); // Send login request
    saveToken(res.data.token); // Save token in local storage
    setUser(res.data); 
  };

  // Function to log out a user
  const logout = () => {
    removeToken(); // Remove token from local storage
    setUser(null); // Clear user state
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

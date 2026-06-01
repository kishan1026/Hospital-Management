import { createContext, useState } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";

  // ✅ Load token from localStorage
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  // ✅ Load user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
  
      // If no user OR value is literally "undefined" or "null"
      if (
        !savedUser ||
        savedUser === "undefined" ||
        savedUser === "null"
      ) {
        return null;
      }
  
      return JSON.parse(savedUser);
    } catch (error) {
      console.log("Invalid user data in localStorage:", error);
  
      // Remove corrupted data
      localStorage.removeItem("user");
  
      return null;
    }
  });

  // ✅ Login function
  // Save token + user in localStorage and state
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(newToken);
    setUser(userData);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const value = {
    doctors,
    currencySymbol,
    token,
    user,
    setToken,
    setUser,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
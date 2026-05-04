import { createContext, useState, useEffect } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const currencySymbol = '$';

  // ✅ TOKEN (real auth)
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ USER DATA (optional future use)
  const [user, setUser] = useState(null);

  // 🔥 Fetch user (optional - future use)
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [token]);

  // ✅ LOGIN (store token only)
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    user,
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
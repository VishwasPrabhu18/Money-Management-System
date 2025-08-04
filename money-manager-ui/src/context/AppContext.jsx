import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAuth = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AppContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  }

  const contextValue = {
    user,
    setUser,
    logout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
} 
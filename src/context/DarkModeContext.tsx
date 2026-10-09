import type { FC, ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within DarkModeProvider");
  }
  return context;
};

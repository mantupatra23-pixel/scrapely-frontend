"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  token: string | null;
  user: any;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  login: (token: string, user: any) => void;
  logout: () => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("scrapely_token");
      const savedUser = localStorage.getItem("scrapely_user");
      const savedSidebar = localStorage.getItem("scrapely_sidebar");
      const savedSearches = localStorage.getItem("scrapely_searches");

      if (savedToken) setToken(savedToken);
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedSidebar !== null) setSidebarCollapsed(savedSidebar === "true");
      if (savedSearches) setRecentSearches(JSON.parse(savedSearches));
    } catch (e) {
      console.error("Hydrate error:", e);
    }
  }, []);

  const login = (authToken: string, userData: any) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem("scrapely_token", authToken);
    localStorage.setItem("scrapely_user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("scrapely_token");
    localStorage.removeItem("scrapely_user");
  };

  const addRecentSearch = (query: string) => {
    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("scrapely_searches", JSON.stringify(updated));
  };

  const toggleSidebar = (v: boolean) => {
    setSidebarCollapsed(v);
    localStorage.setItem("scrapely_sidebar", String(v));
  };

  return (
    <AppContext.Provider
      value={{
        token,
        user,
        sidebarCollapsed,
        setSidebarCollapsed: toggleSidebar,
        login,
        logout,
        recentSearches,
        addRecentSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    return {
      token: null,
      user: null,
      sidebarCollapsed: false,
      setSidebarCollapsed: () => {},
      login: () => {},
      logout: () => {},
      recentSearches: [],
      addRecentSearch: () => {},
    };
  }
  return ctx;
};

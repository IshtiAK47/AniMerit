"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ApiProviderType = "jikan" | "anilist";

interface ApiProviderContextType {
  apiProvider: ApiProviderType;
  setApiProvider: (provider: ApiProviderType) => void;
  toggleApiProvider: () => void;
}

const ApiProviderContext = createContext<ApiProviderContextType | undefined>(undefined);

const STORAGE_KEY = "animerit_api_provider";

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [apiProvider, setApiProviderState] = useState<ApiProviderType>("jikan");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ApiProviderType;
      if (stored === "jikan" || stored === "anilist") {
        setApiProviderState(stored);
      }
    } catch (e) {}
  }, []);

  const setApiProvider = (provider: ApiProviderType) => {
    setApiProviderState(provider);
    try {
      localStorage.setItem(STORAGE_KEY, provider);
    } catch (e) {}
  };

  const toggleApiProvider = () => {
    setApiProvider(apiProvider === "jikan" ? "anilist" : "jikan");
  };

  return (
    <ApiProviderContext.Provider value={{ apiProvider, setApiProvider, toggleApiProvider }}>
      {children}
    </ApiProviderContext.Provider>
  );
}

export function useApiProvider() {
  const context = useContext(ApiProviderContext);
  if (!context) {
    throw new Error("useApiProvider must be used within an ApiProvider");
  }
  return context;
}

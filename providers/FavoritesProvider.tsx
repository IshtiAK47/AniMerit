"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Anime, CharacterDetail } from "@/types/jikan";

export interface SavedAnimeItem {
  mal_id: number;
  title: string;
  image_url: string;
  score?: number | null;
  episodes?: number | null;
  type?: string;
  savedAt: number;
}

export interface SavedCharacterItem {
  mal_id: number;
  name: string;
  image_url: string;
  savedAt: number;
}

interface ToastMessage {
  id: string;
  text: string;
  type: "add" | "remove" | "info";
}

interface FavoritesContextType {
  favoriteAnime: SavedAnimeItem[];
  favoriteCharacters: SavedCharacterItem[];
  isAnimeFavorite: (id: number) => boolean;
  isCharacterFavorite: (id: number) => boolean;
  toggleFavoriteAnime: (anime: Anime) => void;
  toggleFavoriteCharacter: (character: { mal_id: number; name: string; images: any }) => void;
  clearAllFavorites: () => void;
  importFavorites: (dataJson: string) => boolean;
  exportFavoritesJson: () => string;
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteAnime, setFavoriteAnime] = useState<SavedAnimeItem[]>([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState<SavedCharacterItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const storedAnime = localStorage.getItem("animerit_fav_anime");
      const storedChar = localStorage.getItem("animerit_fav_char");
      if (storedAnime) setFavoriteAnime(JSON.parse(storedAnime));
      if (storedChar) setFavoriteCharacters(JSON.parse(storedChar));
    } catch (e) {
      console.error("Failed to parse favorites from localStorage", e);
    }
  }, []);

  // Save changes to localStorage
  const saveAnimeList = (newList: SavedAnimeItem[]) => {
    setFavoriteAnime(newList);
    try {
      localStorage.setItem("animerit_fav_anime", JSON.stringify(newList));
    } catch (e) {}
  };

  const saveCharList = (newList: SavedCharacterItem[]) => {
    setFavoriteCharacters(newList);
    try {
      localStorage.setItem("animerit_fav_char", JSON.stringify(newList));
    } catch (e) {}
  };

  const showToast = (text: string, type: "add" | "remove" | "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const isAnimeFavorite = (id: number) => {
    return favoriteAnime.some((item) => item.mal_id === id);
  };

  const isCharacterFavorite = (id: number) => {
    return favoriteCharacters.some((item) => item.mal_id === id);
  };

  const toggleFavoriteAnime = (anime: Anime) => {
    if (isAnimeFavorite(anime.mal_id)) {
      const updated = favoriteAnime.filter((a) => a.mal_id !== anime.mal_id);
      saveAnimeList(updated);
      showToast(`Removed "${anime.title}" from library`, "remove");
    } else {
      const newItem: SavedAnimeItem = {
        mal_id: anime.mal_id,
        title: anime.title,
        image_url: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || "",
        score: anime.score,
        episodes: anime.episodes,
        type: anime.type,
        savedAt: Date.now(),
      };
      saveAnimeList([newItem, ...favoriteAnime]);
      showToast(`Added "${anime.title}" to library`, "add");
    }
  };

  const toggleFavoriteCharacter = (character: { mal_id: number; name: string; images: any }) => {
    if (isCharacterFavorite(character.mal_id)) {
      const updated = favoriteCharacters.filter((c) => c.mal_id !== character.mal_id);
      saveCharList(updated);
      showToast(`Removed "${character.name}" from favorites`, "remove");
    } else {
      const newItem: SavedCharacterItem = {
        mal_id: character.mal_id,
        name: character.name,
        image_url: character.images?.jpg?.image_url || "",
        savedAt: Date.now(),
      };
      saveCharList([newItem, ...favoriteCharacters]);
      showToast(`Added "${character.name}" to favorites`, "add");
    }
  };

  const clearAllFavorites = () => {
    saveAnimeList([]);
    saveCharList([]);
    showToast("Cleared all saved favorites", "info");
  };

  const exportFavoritesJson = () => {
    return JSON.stringify({ anime: favoriteAnime, characters: favoriteCharacters }, null, 2);
  };

  const importFavorites = (dataJson: string): boolean => {
    try {
      const parsed = JSON.parse(dataJson);
      if (Array.isArray(parsed.anime)) {
        saveAnimeList(parsed.anime);
      }
      if (Array.isArray(parsed.characters)) {
        saveCharList(parsed.characters);
      }
      showToast("Successfully imported library data", "add");
      return true;
    } catch (e) {
      showToast("Invalid JSON file provided", "remove");
      return false;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteAnime,
        favoriteCharacters,
        isAnimeFavorite,
        isCharacterFavorite,
        toggleFavoriteAnime,
        toggleFavoriteCharacter,
        clearAllFavorites,
        exportFavoritesJson,
        importFavorites,
        toasts,
        removeToast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl glass-panel shadow-2xl text-xs sm:text-sm font-medium border flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
              toast.type === "add"
                ? "border-cyan-500/40 text-cyan-200"
                : toast.type === "remove"
                ? "border-rose-500/40 text-rose-200"
                : "border-zinc-700 text-zinc-300"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                toast.type === "add"
                  ? "bg-cyan-400 glow-cyan"
                  : toast.type === "remove"
                  ? "bg-rose-400 glow-rose"
                  : "bg-zinc-400"
              }`}
            />
            {toast.text}
          </div>
        ))}
      </div>
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

"use client";

import { useEffect, useState } from "react";
import { Anime } from "@/types/jikan";

export interface RecentlyViewedItem {
  mal_id: number;
  title: string;
  image_url: string;
  type?: string;
  score?: number | null;
  viewedAt: number;
}

const STORAGE_KEY = "animerit_recent_viewed";
const MAX_RECENT = 12;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const addRecentlyViewed = (anime: Anime) => {
    if (!anime || !anime.mal_id) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.mal_id !== anime.mal_id);
      const newItem: RecentlyViewedItem = {
        mal_id: anime.mal_id,
        title: anime.title,
        image_url: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || "",
        type: anime.type,
        score: anime.score,
        viewedAt: Date.now(),
      };
      const updated = [newItem, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  return { recentlyViewed, addRecentlyViewed, clearRecentlyViewed };
}

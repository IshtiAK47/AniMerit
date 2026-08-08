"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Star, Flame, ChevronRight, Clock, Trash2, ArrowRight } from "lucide-react";
import { searchAnime } from "@/services/jikanApi";
import { Anime } from "@/types/jikan";
import { useDebounce } from "@/hooks/useDebounce";
import { useTheme } from "@/providers/ThemeProvider";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = "animerit_recent_searches";

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { playUiSound } = useTheme();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch (e) {}
  }, []);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await searchAnime({ q: debouncedQuery, limit: 6 });
        setResults(res.data || []);
      } catch (e) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const saveRecentSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    const filtered = recentSearches.filter((s) => s.toLowerCase() !== searchTerm.toLowerCase());
    const updated = [searchTerm, ...filtered].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearRecents = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {}
  };

  const handleFullSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query);
    playUiSound("click");
    onClose();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl glass-panel rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <form onSubmit={handleFullSearchSubmit} className="relative flex items-center p-3.5 sm:p-4 border-b border-zinc-800 bg-zinc-950/80">
          <Search className="w-5 h-5 text-cyan-400 ml-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AniMerit by title, Japanese name, studio..."
            autoFocus
            className="w-full bg-transparent px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Modal Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto flex flex-col gap-4">
          {/* Recent Searches */}
          {!query && (
            <div className="flex flex-col gap-3">
              {recentSearches.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold px-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Recent Searches
                    </span>
                    <button
                      onClick={handleClearRecents}
                      className="text-[11px] text-zinc-400 hover:text-rose-400 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setQuery(term);
                          playUiSound("click");
                        }}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 text-xs text-zinc-300 hover:text-white transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Genre Suggestions */}
              <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800/60">
                <span className="text-xs text-zinc-400 font-semibold px-1 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Popular Categories
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 1, name: "Action" },
                    { id: 10, name: "Fantasy" },
                    { id: 22, name: "Romance" },
                    { id: 24, name: "Sci-Fi" },
                  ].map((g) => (
                    <Link
                      key={g.id}
                      href={`/genre/${g.id}`}
                      onClick={() => {
                        playUiSound("click");
                        onClose();
                      }}
                      className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500 text-xs font-semibold text-zinc-300 hover:text-cyan-300 transition-all flex items-center justify-between"
                    >
                      <span>{g.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-zinc-400 text-xs">
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <span>Searching AniMerit...</span>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
                Top Matches ({results.length})
              </span>
              <div className="flex flex-col gap-2">
                {results.map((anime) => (
                  <Link
                    key={anime.mal_id}
                    href={`/anime/${anime.mal_id}`}
                    onClick={() => {
                      saveRecentSearch(anime.title);
                      playUiSound("click");
                      onClose();
                    }}
                    className="group p-2 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-cyan-500/50 flex items-center gap-3 transition-all"
                  >
                    <div className="relative w-12 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                      <Image
                        src={anime.images?.jpg?.image_url || "/placeholder.jpg"}
                        alt={anime.title}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-bold text-xs sm:text-sm text-zinc-100 group-hover:text-cyan-400 transition-colors truncate">
                        {anime.title}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                        {anime.type && <span className="uppercase text-cyan-400 font-semibold">{anime.type}</span>}
                        {anime.score && (
                          <span className="flex items-center gap-1 text-amber-400 font-semibold">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {anime.score.toFixed(1)}
                          </span>
                        )}
                        <span>{anime.year ? `${anime.year}` : anime.status}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition-colors mr-2" />
                  </Link>
                ))}
              </div>

              <button
                onClick={handleFullSearchSubmit}
                className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-rose-600 hover:from-cyan-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>See All Results for "{query}"</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="py-8 text-center text-zinc-400 text-xs flex flex-col items-center gap-2">
              <p>No anime titles matching "{query}" found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

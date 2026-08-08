"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useApiProvider } from "@/providers/ApiProviderContext";
import { fetchSearchAnime } from "@/services/unifiedApi";
import AnimeCard from "@/components/ui/AnimeCard";
import { AnimeCardSkeleton } from "@/components/ui/Skeleton";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const { playUiSound } = useTheme();
  const { apiProvider } = useApiProvider();

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [type, setType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [minScore, setMinScore] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  // Debounce search query input (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const queryParams: any = {
    page,
    limit: 24,
    order_by: "popularity",
    sort: "asc",
  };
  if (debouncedQuery.trim()) queryParams.q = debouncedQuery.trim();
  if (type !== "all") queryParams.type = type;
  if (status !== "all") queryParams.status = status;
  if (minScore > 0) queryParams.min_score = minScore;

  const { data, isLoading } = useQuery({
    queryKey: ["searchPage", apiProvider, debouncedQuery, type, status, minScore, page],
    queryFn: () => fetchSearchAnime(apiProvider, queryParams),
  });

  const totalPages = data?.pagination?.last_visible_page || 1;

  const handlePageChange = (newPage: number) => {
    playUiSound("click");
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    playUiSound("click");
    setQuery("");
    setType("all");
    setStatus("all");
    setMinScore(0);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header & Search Bar Input */}
      <div className="flex flex-col gap-4 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-cyan-400">
          <Search className="w-4 h-4" />
          Discovery Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Search Anime Database</h1>

        {/* Input Field */}
        <div className="relative w-full max-w-3xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Type anime title, character or keyword (searching via ${apiProvider.toUpperCase()} API)...`}
            className="w-full bg-zinc-900/90 text-white placeholder-zinc-500 pl-12 pr-10 py-3.5 rounded-2xl border border-zinc-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm font-medium transition-all shadow-xl"
          />
          {query && (
            <button
              onClick={() => {
                playUiSound("click");
                setQuery("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-zinc-300">Format:</span>
          <select
            value={type}
            onChange={(e) => {
              playUiSound("click");
              setType(e.target.value);
              setPage(1);
            }}
            className="bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Formats</option>
            <option value="tv">TV Series</option>
            <option value="movie">Movie</option>
            <option value="ova">OVA</option>
            <option value="ona">ONA</option>
          </select>

          <span className="text-xs font-bold text-zinc-300 ml-2">Status:</span>
          <select
            value={status}
            onChange={(e) => {
              playUiSound("click");
              setStatus(e.target.value);
              setPage(1);
            }}
            className="bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="airing">Airing</option>
            <option value="complete">Complete</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        {(query || type !== "all" || status !== "all" || minScore > 0) && (
          <button
            onClick={handleClearFilters}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 self-end md:self-auto"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
          {data.data.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-zinc-400 text-sm glass-panel rounded-3xl p-8">
          No matching anime found for "{debouncedQuery}". Try refining your search query.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-8 border-t border-zinc-800">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl glass-panel border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <div className="text-xs font-bold text-zinc-400 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800">
            Page <span className="text-cyan-400 font-extrabold">{page}</span> of {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-xl glass-panel border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-40 flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-400">
          Loading search engine...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}

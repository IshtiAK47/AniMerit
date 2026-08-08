"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiProvider } from "@/providers/ApiProviderContext";
import { fetchTopAnime } from "@/services/unifiedApi";
import AnimeCard from "@/components/ui/AnimeCard";
import { AnimeCardSkeleton } from "@/components/ui/Skeleton";
import { Flame, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function TopAnimePage() {
  const { playUiSound } = useTheme();
  const { apiProvider } = useApiProvider();
  const [type, setType] = useState<string>("all");
  const [filter, setFilter] = useState<"airing" | "upcoming" | "bypopularity" | "favorite" | "all">("all");
  const [page, setPage] = useState<number>(1);

  const queryParams: any = {
    page,
    limit: 24,
  };
  if (type !== "all") queryParams.type = type;
  if (filter !== "all") queryParams.filter = filter;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["topAnimePage", apiProvider, type, filter, page],
    queryFn: () => fetchTopAnime(apiProvider, queryParams),
  });

  const totalPages = data?.pagination?.last_visible_page || 1;

  const handleTypeChange = (newType: string) => {
    playUiSound("click");
    setType(newType);
    setPage(1);
  };

  const handleFilterChange = (newFilter: any) => {
    playUiSound("click");
    setFilter(newFilter);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    playUiSound("click");
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const typeOptions = [
    { key: "all", label: "All Formats" },
    { key: "tv", label: "TV Series" },
    { key: "movie", label: "Movies" },
    { key: "ova", label: "OVA" },
    { key: "ona", label: "ONA" },
    { key: "special", label: "Special" },
  ];

  const filterOptions = [
    { key: "all", label: "Top Score" },
    { key: "bypopularity", label: "Most Popular" },
    { key: "favorite", label: "Most Favorited" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 border-b border-zinc-800 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-cyan-400 glow-cyan" />
          Hall of Fame
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Top Rated Anime</h1>
        <p className="text-sm text-zinc-400">
          Browse top ranked anime fetched live from <span className="text-cyan-400 font-bold uppercase">{apiProvider} API</span>.
        </p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-zinc-800">
        {/* Format Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {typeOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleTypeChange(opt.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                type === opt.key
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sort Filter Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleFilterChange(opt.key)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filter === opt.key
                    ? "bg-gradient-to-r from-cyan-600 to-rose-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Anime Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="py-16 text-center text-zinc-400 text-sm glass-panel rounded-3xl p-8">
          Failed to fetch anime data. Please try refreshing.
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
          {data.data.map((anime, idx) => (
            <AnimeCard
              key={anime.mal_id}
              anime={anime}
              rank={(page - 1) * 24 + idx + 1}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-zinc-400 text-sm glass-panel rounded-3xl p-8">
          No anime results matching the selected criteria.
        </div>
      )}

      {/* Pagination Controls */}
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

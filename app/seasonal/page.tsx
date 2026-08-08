"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiProvider } from "@/providers/ApiProviderContext";
import { fetchSeasonalAnime } from "@/services/unifiedApi";
import AnimeCard from "@/components/ui/AnimeCard";
import { AnimeCardSkeleton } from "@/components/ui/Skeleton";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const SEASONS = ["winter", "spring", "summer", "fall"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1990 + 1 }, (_, i) => CURRENT_YEAR - i);

export default function SeasonalPage() {
  const { playUiSound } = useTheme();
  const { apiProvider } = useApiProvider();
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);
  const [selectedSeason, setSelectedSeason] = useState<string>("winter");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ["seasonalPage", apiProvider, selectedYear, selectedSeason, page],
    queryFn: () => fetchSeasonalAnime(apiProvider, selectedYear, selectedSeason, { page, limit: 24 }),
  });

  const totalPages = data?.pagination?.last_visible_page || 1;

  const handleSeasonChange = (s: string) => {
    playUiSound("click");
    setSelectedSeason(s);
    setPage(1);
  };

  const handleYearChange = (y: number) => {
    playUiSound("click");
    setSelectedYear(y);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    playUiSound("click");
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-zinc-800 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-cyan-400" />
          Archive Vault
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Seasonal Anime Archive</h1>
        <p className="text-sm text-zinc-400">
          Browse anime lineups by broadcast season fetched live via <span className="text-cyan-400 font-bold uppercase">{apiProvider} API</span>.
        </p>
      </div>

      {/* Year & Season Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-zinc-800">
        {/* Season Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Season:</span>
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            {SEASONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSeasonChange(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  selectedSeason === s
                    ? "bg-gradient-to-r from-cyan-600 to-rose-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Year Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Year:</span>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            className="bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
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
          No seasonal anime records found for {selectedSeason} {selectedYear}.
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

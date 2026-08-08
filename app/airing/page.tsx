"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiProvider } from "@/providers/ApiProviderContext";
import { fetchAiringAnime } from "@/services/unifiedApi";
import AnimeCard from "@/components/ui/AnimeCard";
import { AnimeCardSkeleton } from "@/components/ui/Skeleton";
import { ChevronLeft, ChevronRight, Radio } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function AiringPage() {
  const { playUiSound } = useTheme();
  const { apiProvider } = useApiProvider();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["airingPage", apiProvider, page],
    queryFn: () => fetchAiringAnime(apiProvider, { page, limit: 24 }),
  });

  const totalPages = data?.pagination?.last_visible_page || 1;

  const handlePageChange = (newPage: number) => {
    playUiSound("click");
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-rose-400">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse glow-rose" />
          <Radio className="w-4 h-4" />
          Live Broadcast Schedule
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Currently Airing Anime</h1>
        <p className="text-sm text-zinc-400">
          Discover active anime series broadcasting weekly episodes fetched live via <span className="text-cyan-400 font-bold uppercase">{apiProvider} API</span>.
        </p>
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
          No currently airing anime data found.
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
            Page <span className="text-rose-400 font-extrabold">{page}</span> of {totalPages}
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useApiProvider } from "@/providers/ApiProviderContext";
import {
  fetchTopAnime,
  fetchAiringAnime,
  fetchTopMovies,
  fetchSeasonalAnime,
} from "@/services/unifiedApi";
import HeroCarousel from "@/components/ui/HeroCarousel";
import AnimeCard from "@/components/ui/AnimeCard";
import TrailerModal from "@/components/ui/TrailerModal";
import QuoteWidget from "@/components/ui/QuoteWidget";
import RandomAnimeModal from "@/components/ui/RandomAnimeModal";
import { AnimeCardSkeleton, HeroSkeleton } from "@/components/ui/Skeleton";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useTheme } from "@/providers/ThemeProvider";
import {
  Flame,
  Tv,
  Film,
  Calendar,
  ChevronRight,
  Clock,
  Swords,
  Heart,
  Wand2,
  Smile,
  Rocket,
  Ghost,
  Trophy,
} from "lucide-react";

const GENRES_LIST = [
  { id: 1, name: "Action", icon: Swords, color: "from-red-500/20 to-orange-500/20 text-orange-400 border-orange-500/30" },
  { id: 10, name: "Fantasy", icon: Wand2, color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30" },
  { id: 22, name: "Romance", icon: Heart, color: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30" },
  { id: 24, name: "Sci-Fi", icon: Rocket, color: "from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/30" },
  { id: 4, name: "Comedy", icon: Smile, color: "from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30" },
  { id: 37, name: "Supernatural", icon: Ghost, color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30" },
  { id: 30, name: "Sports", icon: Trophy, color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30" },
];

export default function HomePage() {
  const { playUiSound } = useTheme();
  const { apiProvider } = useApiProvider();
  const { recentlyViewed } = useRecentlyViewed();

  // Trailer modal state
  const [trailer, setTrailer] = useState<{ open: boolean; youtubeId: string | null; title: string }>({
    open: false,
    youtubeId: null,
    title: "",
  });

  // Unified Queries responding dynamically to apiProvider change
  const { data: topData, isLoading: topLoading } = useQuery({
    queryKey: ["topAnimeHome", apiProvider],
    queryFn: () => fetchTopAnime(apiProvider, { limit: 10 }),
  });

  const { data: airingData, isLoading: airingLoading } = useQuery({
    queryKey: ["airingAnimeHome", apiProvider],
    queryFn: () => fetchAiringAnime(apiProvider, { limit: 10 }),
  });

  const { data: moviesData, isLoading: moviesLoading } = useQuery({
    queryKey: ["topMoviesHome", apiProvider],
    queryFn: () => fetchTopMovies(apiProvider, { limit: 10 }),
  });

  const { data: seasonalData, isLoading: seasonalLoading } = useQuery({
    queryKey: ["seasonalAnimeHome", apiProvider],
    queryFn: () => fetchSeasonalAnime(apiProvider, undefined, undefined, { limit: 10 }),
  });

  const handleOpenTrailer = (youtubeId: string, title: string) => {
    setTrailer({ open: true, youtubeId, title });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Featured Hero Banner */}
      {topLoading ? (
        <HeroSkeleton />
      ) : topData?.data ? (
        <HeroCarousel items={topData.data.slice(0, 5)} onOpenTrailer={handleOpenTrailer} />
      ) : null}

      {/* Top 10 Today Section */}
      <section className="mt-8 sm:mt-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
              <Flame className="w-5 h-5 glow-cyan" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">Top 10 Today</h2>
              <p className="text-xs text-zinc-400 font-medium hidden sm:block">
                Powered by <span className="text-cyan-400 font-bold uppercase">{apiProvider} API</span>
              </p>
            </div>
          </div>
          <Link
            href="/top"
            onClick={() => playUiSound("click")}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {topLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6">
            {topData?.data?.slice(0, 10).map((anime, idx) => (
              <AnimeCard key={`${anime.mal_id}-${idx}`} anime={anime} rank={idx + 1} priority={idx < 4} />
            ))}
          </div>
        )}
      </section>

      {/* Quote of the Day Widget */}
      <QuoteWidget />

      {/* Trending Airing Series */}
      <section className="mt-8 sm:mt-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
              <Tv className="w-5 h-5 glow-rose" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">Currently Airing</h2>
              <p className="text-xs text-zinc-400 font-medium hidden sm:block">Fresh weekly episodes broadcasting now</p>
            </div>
          </div>
          <Link
            href="/airing"
            onClick={() => playUiSound("click")}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 group"
          >
            <span>Schedule</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {airingLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6">
            {airingData?.data?.slice(0, 10).map((anime, idx) => (
              <AnimeCard key={`airing-${anime.mal_id}-${idx}`} anime={anime} />
            ))}
          </div>
        )}
      </section>

      {/* Random Anime Spinner Generator */}
      <RandomAnimeModal />

      {/* Top Anime Movies */}
      <section className="mt-8 sm:mt-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">Masterpiece Anime Movies</h2>
              <p className="text-xs text-zinc-400 font-medium hidden sm:block">Highest-rated theatrical feature films</p>
            </div>
          </div>
          <Link
            href="/movies"
            onClick={() => playUiSound("click")}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            <span>Movies</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {moviesLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6">
            {moviesData?.data?.slice(0, 10).map((anime, idx) => (
              <AnimeCard key={`movies-${anime.mal_id}-${idx}`} anime={anime} />
            ))}
          </div>
        )}
      </section>

      {/* Popular This Season */}
      <section className="mt-8 sm:mt-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">Popular This Season</h2>
              <p className="text-xs text-zinc-400 font-medium hidden sm:block">Fan favorite seasonal blockbusters</p>
            </div>
          </div>
          <Link
            href="/seasonal"
            onClick={() => playUiSound("click")}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            <span>Seasons</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {seasonalLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6">
            {seasonalData?.data?.slice(0, 10).map((anime, idx) => (
              <AnimeCard key={`seasonal-${anime.mal_id}-${idx}`} anime={anime} />
            ))}
          </div>
        )}
      </section>

      {/* Explore by Genre Section */}
      <section className="mt-12 sm:mt-16">
        <div className="flex flex-col gap-1 mb-4 sm:mb-6">
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            Category Explorer
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">Explore Anime by Favorite Genres</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2.5 sm:gap-3">
          {GENRES_LIST.map((genre) => {
            const Icon = genre.icon;
            return (
              <Link
                key={genre.id}
                href={`/genre/${genre.id}`}
                onClick={() => playUiSound("click")}
                className={`glass-panel p-3 sm:p-4 rounded-2xl border bg-gradient-to-br ${genre.color} hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 group`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                <span className="font-bold text-xs text-white">{genre.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recently Viewed Slider */}
      {recentlyViewed.length > 0 && (
        <section className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-zinc-800/80">
          <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">Recently Viewed Anime</h2>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2">
            {recentlyViewed.map((item) => (
              <Link
                key={item.mal_id}
                href={`/anime/${item.mal_id}`}
                onClick={() => playUiSound("click")}
                className="relative w-24 sm:w-28 shrink-0 flex flex-col gap-1.5 group"
              >
                <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-zinc-800 border border-zinc-800 group-hover:border-cyan-500 transition-colors">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-xs font-semibold text-zinc-300 truncate group-hover:text-cyan-400">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trailer Video Player Modal */}
      <TrailerModal
        isOpen={trailer.open}
        onClose={() => setTrailer({ open: false, youtubeId: null, title: "" })}
        youtubeId={trailer.youtubeId}
        title={trailer.title}
      />
    </div>
  );
}

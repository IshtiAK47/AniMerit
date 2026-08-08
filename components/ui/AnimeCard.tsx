"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Play } from "lucide-react";
import { Anime } from "@/types/jikan";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useTheme, CardDensity } from "@/providers/ThemeProvider";

interface AnimeCardProps {
  anime: Anime;
  rank?: number;
  priority?: boolean;
}

const DENSITY_HEIGHT_MAP: Record<CardDensity, string> = {
  compact: "aspect-[3/4]",
  normal: "aspect-[2/3]",
  spacious: "aspect-[2/3.2]",
};

export default function AnimeCard({ anime, rank, priority = false }: AnimeCardProps) {
  const { cardDensity, playUiSound } = useTheme();
  const { isAnimeFavorite, toggleFavoriteAnime } = useFavorites();
  const [imageError, setImageError] = useState(false);

  const isFav = isAnimeFavorite(anime.mal_id);
  const posterUrl = imageError
    ? "/placeholder.jpg"
    : anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || "/placeholder.jpg";

  const heightClass = DENSITY_HEIGHT_MAP[cardDensity] || DENSITY_HEIGHT_MAP.normal;

  return (
    <div className="group relative flex flex-col gap-2">
      {/* Poster Container */}
      <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden glass-card shadow-lg`}>
        {/* Cover Image */}
        <Image
          src={posterUrl}
          alt={anime.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          priority={priority}
          onError={() => setImageError(true)}
          className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges: Format / Rank */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {anime.type && (
            <span className="px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-extrabold uppercase text-zinc-200 tracking-wider">
              {anime.type}
            </span>
          )}

          {rank !== undefined && (
            <span className="px-2 py-0.5 rounded-lg theme-bg-primary text-white text-[10px] font-black shadow-md theme-glow">
              #{rank}
            </span>
          )}
        </div>

        {/* Favorite Button Overlay */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            playUiSound("favorite");
            toggleFavoriteAnime(anime);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFav
              ? "bg-rose-600 text-white shadow-lg shadow-rose-600/40 scale-110"
              : "bg-black/60 text-zinc-300 hover:text-rose-400 hover:bg-black/80 opacity-0 group-hover:opacity-100"
          }`}
          aria-label={isFav ? "Remove from Library" : "Save to Library"}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-white" : ""}`} />
        </button>

        {/* Hover Quick View Trigger Link */}
        <Link
          href={`/anime/${anime.mal_id}`}
          onClick={() => playUiSound("click")}
          aria-label={anime.title}
          className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="p-3 rounded-full theme-bg-primary text-white shadow-2xl theme-glow scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </Link>

        {/* Bottom Info Bar: Score & Episodes */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none text-xs font-semibold text-zinc-300">
          <div className="flex items-center gap-1 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 text-amber-400 font-extrabold text-[11px]">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{anime.score ? anime.score.toFixed(1) : "N/A"}</span>
          </div>

          {anime.episodes && (
            <span className="text-[10px] text-zinc-400 bg-black/60 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
              {anime.episodes} eps
            </span>
          )}
        </div>
      </div>

      {/* Anime Title & Genres */}
      <Link
        href={`/anime/${anime.mal_id}`}
        onClick={() => playUiSound("click")}
        className="flex flex-col gap-0.5"
      >
        <h3 className="font-bold text-xs sm:text-sm text-zinc-100 group-hover:theme-text-primary transition-colors line-clamp-1">
          {anime.title}
        </h3>
        <p className="text-[11px] text-zinc-400 truncate">
          {anime.genres && anime.genres.length > 0
            ? anime.genres.map((g) => g.name).slice(0, 2).join(" • ")
            : anime.status || "Anime"}
        </p>
      </Link>
    </div>
  );
}

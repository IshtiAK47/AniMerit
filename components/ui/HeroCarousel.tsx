"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info, Star, ChevronLeft, ChevronRight, Flame, Heart } from "lucide-react";
import { Anime } from "@/types/jikan";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useTheme } from "@/providers/ThemeProvider";

interface HeroCarouselProps {
  items: Anime[];
  onOpenTrailer: (youtubeId: string, title: string) => void;
}

export default function HeroCarousel({ items, onOpenTrailer }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isAnimeFavorite, toggleFavoriteAnime } = useFavorites();
  const { playUiSound } = useTheme();

  // Auto slide every 7 seconds
  useEffect(() => {
    if (!items || items.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  const currentAnime = items[currentIndex];
  const backdropUrl =
    currentAnime.trailer?.images?.maximum_image_url ||
    currentAnime.images?.jpg?.large_image_url ||
    currentAnime.images?.jpg?.image_url;
  const isFav = isAnimeFavorite(currentAnime.mal_id);

  const prevSlide = () => {
    playUiSound("click");
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    playUiSound("click");
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative w-full h-[480px] sm:h-[580px] rounded-3xl overflow-hidden glass-panel border border-zinc-800/80 shadow-2xl group my-4 sm:my-6">
      {/* Background Image with Ambient Blur */}
      <div className="absolute inset-0 bg-zinc-950">
        <Image
          key={currentAnime.mal_id}
          src={backdropUrl}
          alt={currentAnime.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-35 scale-105 transition-all duration-1000 blur-[2px]"
        />
        {/* Gradient Overlays for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/80 to-transparent w-full md:w-3/4" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-10 flex flex-col justify-end pb-10 sm:pb-14">
        <div className="flex flex-col gap-3 sm:gap-4 max-w-2xl animate-in fade-in slide-in-from-left-6 duration-500">
          {/* Top Pill Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-cyan-600/30 border border-cyan-500/50 text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 glow-cyan">
              <Flame className="w-3.5 h-3.5 text-cyan-400" />
              Featured Trending
            </span>
            {currentAnime.type && (
              <span className="px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-300 text-xs font-bold uppercase">
                {currentAnime.type}
              </span>
            )}
            {currentAnime.score && (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {currentAnime.score.toFixed(1)} Rating
              </span>
            )}
          </div>

          {/* Anime Title */}
          <h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-tight line-clamp-2">
            {currentAnime.title}
          </h1>

          {/* Japanese Native Title & Season */}
          <p className="text-xs sm:text-sm text-zinc-400 font-medium">
            {currentAnime.title_japanese && (
              <span className="text-cyan-400 mr-2 font-mono">{currentAnime.title_japanese}</span>
            )}
            {currentAnime.year ? `${currentAnime.season || ""} ${currentAnime.year}` : ""}
          </p>

          {/* Synopsis Snippet */}
          <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-xl font-normal">
            {currentAnime.synopsis || "No detailed synopsis available for this featured anime title."}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            {currentAnime.trailer?.youtube_id ? (
              <button
                onClick={() => {
                  playUiSound("click");
                  onOpenTrailer(currentAnime.trailer!.youtube_id!, currentAnime.title);
                }}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-rose-600 hover:from-cyan-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                Watch Trailer
              </button>
            ) : null}

            <Link
              href={`/anime/${currentAnime.mal_id}`}
              onClick={() => playUiSound("click")}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105"
            >
              <Info className="w-4 h-4 text-cyan-400" />
              View Details
            </Link>

            <button
              onClick={() => {
                playUiSound("favorite");
                toggleFavoriteAnime(currentAnime);
              }}
              className={`p-2.5 sm:p-3 rounded-2xl border transition-all ${
                isFav
                  ? "bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-500/40"
                  : "bg-zinc-900/90 border-zinc-700 text-zinc-400 hover:text-white hover:border-rose-500"
              }`}
              aria-label="Bookmark anime"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFav ? "fill-white" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full glass-panel border border-zinc-700 text-zinc-300 hover:text-white hover:border-cyan-500 opacity-0 group-hover:opacity-100 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full glass-panel border border-zinc-700 text-zinc-300 hover:text-white hover:border-cyan-500 opacity-0 group-hover:opacity-100 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Carousel Dots */}
      <div className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              playUiSound("click");
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-6 bg-cyan-500 shadow-md shadow-cyan-500/50" : "w-2 bg-zinc-700"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

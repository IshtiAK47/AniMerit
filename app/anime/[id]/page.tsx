"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useApiProvider } from "@/providers/ApiProviderContext";
import { fetchAnimeDetails, fetchAnimeCharacters } from "@/services/unifiedApi";
import {
  getAnimeRecommendations,
  getAnimeRelations,
  getAnimeThemes,
  getAnimePictures,
} from "@/services/jikanApi";
import CharacterCard from "@/components/ui/CharacterCard";
import TrailerModal from "@/components/ui/TrailerModal";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { DetailsSkeleton } from "@/components/ui/Skeleton";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useTheme } from "@/providers/ThemeProvider";
import {
  Star,
  Heart,
  Play,
  Share2,
  ExternalLink,
  Info,
  Users,
  Music,
  ImageIcon,
  ChevronDown,
  ChevronUp,
  Check,
  Flame,
} from "lucide-react";

export default function AnimeDetailsPage() {
  const params = useParams();
  const animeId = Number(params?.id);
  const { playUiSound } = useTheme();
  const { apiProvider } = useApiProvider();
  const { isAnimeFavorite, toggleFavoriteAnime } = useFavorites();
  const { addRecentlyViewed } = useRecentlyViewed();

  // UI States
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Queries
  const { data: animeData, isLoading: animeLoading } = useQuery({
    queryKey: ["animeDetails", apiProvider, animeId],
    queryFn: () => fetchAnimeDetails(apiProvider, animeId),
    enabled: !isNaN(animeId),
  });

  const { data: charData } = useQuery({
    queryKey: ["animeCharacters", apiProvider, animeId],
    queryFn: () => fetchAnimeCharacters(apiProvider, animeId),
    enabled: !isNaN(animeId),
  });

  const { data: recData } = useQuery({
    queryKey: ["animeRecs", animeId],
    queryFn: () => getAnimeRecommendations(animeId),
    enabled: !isNaN(animeId),
  });

  const { data: relData } = useQuery({
    queryKey: ["animeRelations", animeId],
    queryFn: () => getAnimeRelations(animeId),
    enabled: !isNaN(animeId),
  });

  const { data: themeData } = useQuery({
    queryKey: ["animeThemes", animeId],
    queryFn: () => getAnimeThemes(animeId),
    enabled: !isNaN(animeId),
  });

  const { data: picturesData } = useQuery({
    queryKey: ["animePictures", animeId],
    queryFn: () => getAnimePictures(animeId),
    enabled: !isNaN(animeId),
  });

  const anime = animeData?.data;
  const isFav = anime ? isAnimeFavorite(anime.mal_id) : false;

  useEffect(() => {
    if (anime) {
      addRecentlyViewed(anime);
    }
  }, [anime]);

  if (animeLoading) return <DetailsSkeleton />;
  if (!anime) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-400">
        <h2 className="text-2xl font-bold text-white mb-2">Anime Not Found</h2>
        <p className="text-sm">The requested anime record could not be loaded from {apiProvider.toUpperCase()} API.</p>
        <Link href="/" className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs">
          Return Home
        </Link>
      </div>
    );
  }

  const posterUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || "/placeholder.jpg";
  const backdropUrl = anime.trailer?.images?.maximum_image_url || posterUrl;
  const galleryImages = picturesData?.data?.map((p) => p.jpg.large_image_url || p.jpg.image_url) || [];

  const handleShare = () => {
    playUiSound("click");
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="pb-16">
      {/* Dynamic Hero Banner Backdrop */}
      <div className="relative w-full h-[320px] sm:h-[480px] overflow-hidden">
        <Image
          src={backdropUrl}
          alt={anime.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/60 via-transparent to-[#09090B]" />
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-44 sm:-mt-64 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Poster & Quick Actions */}
          <div className="flex flex-col gap-6 items-center lg:items-start">
            {/* Poster Card */}
            <div className="relative w-56 sm:w-72 lg:w-full aspect-[2/3] rounded-3xl overflow-hidden glass-panel border border-zinc-700 shadow-2xl group">
              <Image
                src={posterUrl}
                alt={anime.title}
                fill
                sizes="(max-width: 1024px) 288px, 25vw"
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {galleryImages.length > 0 && (
                <button
                  onClick={() => {
                    playUiSound("click");
                    setLightboxIndex(0);
                    setLightboxOpen(true);
                  }}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-cyan-600 transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>{galleryImages.length} Photos</span>
                </button>
              )}
            </div>

            {/* Quick Action Buttons Bar */}
            <div className="w-full flex flex-col gap-2.5">
              <button
                onClick={() => {
                  playUiSound("favorite");
                  toggleFavoriteAnime(anime);
                }}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
                  isFav
                    ? "bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-500/30"
                    : "bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-rose-500 hover:text-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
                <span>{isFav ? "Saved in Library" : "Add to Library"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500 text-zinc-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <a
                  href={anime.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiSound("click")}
                  className="flex-1 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500 text-zinc-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>{apiProvider === "anilist" ? "AniList Page" : "MyAnimeList"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Side Information Box */}
            <div className="w-full glass-panel p-5 rounded-3xl border border-zinc-800 flex flex-col gap-4 text-xs">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
                Anime Information
              </h3>

              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Data Source:</span>
                  <span className="font-bold text-cyan-400 uppercase">{apiProvider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Format:</span>
                  <span className="font-bold text-zinc-200 uppercase">{anime.type || "TV"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Episodes:</span>
                  <span className="font-bold text-zinc-200">{anime.episodes || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Status:</span>
                  <span className="font-bold text-zinc-200">{anime.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Aired:</span>
                  <span className="font-bold text-zinc-200 text-right">{anime.aired?.string || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Duration:</span>
                  <span className="font-bold text-zinc-200">{anime.duration || "24 min"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Studio:</span>
                  <span className="font-bold text-cyan-400 text-right">
                    {anime.studios?.map((s) => s.name).join(", ") || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Rating:</span>
                  <span className="font-bold text-zinc-200">{anime.rating || "PG-13"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Ratings, Synopsis, Characters */}
          <div className="lg:col-span-3 flex flex-col gap-6 sm:gap-8">
            {/* Title & Tag Section */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                {anime.type && (
                  <span className="px-3 py-1 rounded-full bg-cyan-600/30 border border-cyan-500/50 text-cyan-300 text-xs font-bold uppercase">
                    {anime.type}
                  </span>
                )}
                {anime.status && (
                  <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold">
                    {anime.status}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {anime.title}
              </h1>

              {anime.title_english && anime.title_english !== anime.title && (
                <p className="text-xs sm:text-sm text-zinc-400 font-semibold">{anime.title_english}</p>
              )}
              {anime.title_japanese && (
                <p className="text-xs text-cyan-400 font-mono">{anime.title_japanese}</p>
              )}
            </div>

            {/* Score & Ranking Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider">Score</span>
                <div className="flex items-center gap-1 mt-1 text-xl sm:text-2xl font-black text-amber-400">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400" />
                  <span>{anime.score ? anime.score.toFixed(2) : "N/A"}</span>
                </div>
                <span className="text-[10px] text-zinc-500 mt-0.5">Average Rating</span>
              </div>

              <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider">Ranked</span>
                <span className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">
                  {anime.rank ? `#${anime.rank}` : "N/A"}
                </span>
                <span className="text-[10px] text-zinc-500 mt-0.5">Global Rank</span>
              </div>

              <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider">Popularity</span>
                <span className="text-xl sm:text-2xl font-black text-rose-400 mt-1">
                  {anime.popularity ? `#${anime.popularity}` : "N/A"}
                </span>
                <span className="text-[10px] text-zinc-500 mt-0.5">Member Interest</span>
              </div>

              <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider">Favorites</span>
                <span className="text-xl sm:text-2xl font-black text-sky-400 mt-1">
                  {anime.favorites ? `${(anime.favorites / 1000).toFixed(0)}k` : "N/A"}
                </span>
                <span className="text-[10px] text-zinc-500 mt-0.5">Total Favorites</span>
              </div>
            </div>

            {/* Trailer Action Trigger */}
            {anime.trailer?.youtube_id && (
              <div className="relative w-full rounded-2xl bg-gradient-to-r from-cyan-950/60 to-rose-950/60 p-4 border border-cyan-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-600/30 text-cyan-300">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white">Watch Official Trailer</h4>
                    <p className="text-[11px] text-zinc-400 hidden sm:block">HD trailer available on YouTube</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    playUiSound("click");
                    setTrailerOpen(true);
                  }}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/40 transition-all"
                >
                  Play Video
                </button>
              </div>
            )}

            {/* Synopsis Section */}
            <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-zinc-800 flex flex-col gap-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                Synopsis
              </h3>
              <p
                className={`text-xs sm:text-sm text-zinc-300 leading-relaxed ${
                  !synopsisExpanded ? "line-clamp-4" : ""
                }`}
              >
                {anime.synopsis || "No description provided."}
              </p>
              {anime.synopsis && anime.synopsis.length > 280 && (
                <button
                  onClick={() => {
                    playUiSound("click");
                    setSynopsisExpanded(!synopsisExpanded);
                  }}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start mt-1"
                >
                  <span>{synopsisExpanded ? "Show Less" : "Read Full Synopsis"}</span>
                  {synopsisExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Genres & Theme Chips */}
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Genres & Categories</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres?.map((g) => (
                  <Link
                    key={g.mal_id}
                    href={`/genre/${g.mal_id}`}
                    onClick={() => playUiSound("click")}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-semibold text-cyan-300 hover:bg-cyan-600 hover:text-white transition-all"
                  >
                    {g.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Characters & Voice Actors Grid */}
            {charData?.data && charData.data.length > 0 && (
              <div className="flex flex-col gap-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    Characters & Voice Cast
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {charData.data.slice(0, 6).map((item) => (
                    <CharacterCard key={item.character.mal_id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        youtubeId={anime.trailer?.youtube_id || null}
        title={anime.title}
      />

      {/* Gallery Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}

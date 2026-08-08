"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCharacterDetails } from "@/services/jikanApi";
import { Heart, User, Tv, Flame, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useTheme } from "@/providers/ThemeProvider";

export default function CharacterDetailsPage() {
  const params = useParams();
  const charId = Number(params?.id);
  const { playUiSound } = useTheme();
  const { isCharacterFavorite, toggleFavoriteCharacter } = useFavorites();
  const [bioExpanded, setBioExpanded] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["characterDetails", charId],
    queryFn: () => getCharacterDetails(charId),
    enabled: !isNaN(charId),
  });

  const char = data?.data;
  const isFav = char ? isCharacterFavorite(char.mal_id) : false;

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-6 animate-shimmer">
        <div className="w-48 h-64 bg-zinc-800 rounded-2xl" />
        <div className="h-8 w-1/3 bg-zinc-800 rounded-xl" />
        <div className="h-32 w-full bg-zinc-800 rounded-2xl" />
      </div>
    );
  }

  if (!char) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-zinc-400">
        <h2 className="text-xl font-bold text-white mb-2">Character Not Found</h2>
        <p className="text-xs">No character record found with ID #{charId}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
      {/* Header Profile Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        {/* Character Portrait */}
        <div className="relative w-48 h-64 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-700 shadow-xl shrink-0">
          <Image
            src={char.images?.jpg?.image_url || "/placeholder.jpg"}
            alt={char.name}
            fill
            sizes="192px"
            priority
            className="object-cover"
          />
        </div>

        {/* Info & Metadata */}
        <div className="flex flex-col gap-4 flex-1 text-center sm:text-left">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Flame className="w-3.5 h-3.5 text-cyan-400" />
              Anime Character Profile
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">{char.name}</h1>
            {char.name_kanji && (
              <p className="text-sm font-mono text-rose-400">{char.name_kanji}</p>
            )}
            {char.nicknames && char.nicknames.length > 0 && (
              <p className="text-xs text-zinc-400">AKA: {char.nicknames.join(", ")}</p>
            )}
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start pt-2">
            <button
              onClick={() => {
                playUiSound("favorite");
                toggleFavoriteCharacter({
                  mal_id: char.mal_id,
                  name: char.name,
                  images: char.images,
                });
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                isFav
                  ? "bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-500/40"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-rose-500"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
              <span>{isFav ? "Saved Character" : "Favorite Character"}</span>
            </button>

            {char.favorites !== undefined && (
              <span className="text-xs font-semibold text-zinc-400 bg-zinc-900 px-3.5 py-2.5 rounded-xl border border-zinc-800">
                {char.favorites.toLocaleString()} Member Favorites
              </span>
            )}
          </div>
        </div>
      </div>

      {/* About Biography Section */}
      {char.about && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col gap-3">
          <h3 className="font-extrabold text-base text-white">Character Biography</h3>
          <p
            className={`text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line ${
              !bioExpanded ? "line-clamp-6" : ""
            }`}
          >
            {char.about}
          </p>
          {char.about.length > 300 && (
            <button
              onClick={() => {
                playUiSound("click");
                setBioExpanded(!bioExpanded);
              }}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start mt-1"
            >
              <span>{bioExpanded ? "Show Less" : "Read Full Bio"}</span>
              {bioExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      )}

      {/* Voice Actors Section */}
      {char.voices && char.voices.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-rose-400" />
            Voice Actors (Seiyuu)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {char.voices.map((va, idx) => (
              <div key={idx} className="glass-panel p-3 rounded-2xl border border-zinc-800 flex items-center gap-3">
                <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                  {va.person.images?.jpg?.image_url ? (
                    <Image src={va.person.images.jpg.image_url} alt={va.person.name} fill sizes="48px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-xs text-zinc-100 truncate">{va.person.name}</span>
                  <span className="text-[10px] text-cyan-400 font-extrabold uppercase mt-0.5">{va.language}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anime Appearances Section */}
      {char.anime && char.anime.length > 0 && (
        <div className="flex flex-col gap-4 pt-4 border-t border-zinc-800">
          <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
            <Tv className="w-5 h-5 text-cyan-400" />
            Anime Appearances ({char.anime.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {char.anime.map((app, idx) => (
              <Link
                key={idx}
                href={`/anime/${app.anime.mal_id}`}
                onClick={() => playUiSound("click")}
                className="group glass-panel p-3 rounded-2xl border border-zinc-800 hover:border-cyan-500/50 flex items-center gap-3 transition-all"
              >
                <div className="relative w-12 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                  <Image
                    src={app.anime.images?.jpg?.image_url || "/placeholder.jpg"}
                    alt={app.anime.title}
                    fill
                    sizes="48px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-bold text-xs text-zinc-100 group-hover:text-cyan-400 transition-colors truncate">
                    {app.anime.title}
                  </span>
                  <span className="text-[10px] font-extrabold text-zinc-400 uppercase mt-1">
                    Role: <span className="text-cyan-300">{app.role}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, User } from "lucide-react";
import { AnimeCharacter } from "@/types/jikan";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useTheme } from "@/providers/ThemeProvider";

interface CharacterCardProps {
  item: AnimeCharacter;
}

export default function CharacterCard({ item }: CharacterCardProps) {
  const { isCharacterFavorite, toggleFavoriteCharacter } = useFavorites();
  const { playUiSound } = useTheme();

  const char = item.character;
  const mainVA = item.voice_actors?.find((va) => va.language === "Japanese") || item.voice_actors?.[0];
  const isFav = isCharacterFavorite(char.mal_id);

  return (
    <div className="group relative glass-card rounded-2xl p-2.5 flex flex-col gap-2.5 overflow-hidden">
      {/* Character Image & Voice Actor Dual Thumbnails */}
      <div className="flex items-center gap-3">
        {/* Character Portrait */}
        <Link
          href={`/character/${char.mal_id}`}
          onClick={() => playUiSound("click")}
          className="relative w-16 h-20 rounded-xl overflow-hidden bg-zinc-800 shrink-0 group-hover:scale-105 transition-transform"
        >
          {char.images?.jpg?.image_url ? (
            <Image
              src={char.images.jpg.image_url}
              alt={char.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">
              <User className="w-6 h-6" />
            </div>
          )}
        </Link>

        {/* Character Metadata */}
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <Link
              href={`/character/${char.mal_id}`}
              onClick={() => playUiSound("click")}
              className="font-bold text-xs sm:text-sm text-zinc-100 group-hover:text-violet-400 transition-colors truncate"
              title={char.name}
            >
              {char.name}
            </Link>
            <button
              onClick={() => {
                playUiSound("favorite");
                toggleFavoriteCharacter({
                  mal_id: char.mal_id,
                  name: char.name,
                  images: char.images,
                });
              }}
              aria-label="Favorite character"
              className={`p-1.5 rounded-full transition-colors ${
                isFav ? "text-pink-500 fill-pink-500" : "text-zinc-500 hover:text-pink-400"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-pink-500" : ""}`} />
            </button>
          </div>

          <span
            className={`inline-block px-2 py-0.5 mt-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase w-fit ${
              item.role === "Main"
                ? "bg-violet-600/30 text-violet-300 border border-violet-500/40"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {item.role}
          </span>

          {/* Voice Actor Snippet */}
          {mainVA && (
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-zinc-400">
              <span className="truncate">{mainVA.person.name}</span>
              <span className="text-[9px] px-1 rounded bg-zinc-800 text-zinc-400 uppercase">
                {mainVA.language.slice(0, 2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

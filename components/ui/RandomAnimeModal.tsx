"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dices, Flame, Star, RefreshCw, X, Info } from "lucide-react";
import { getRandomAnime } from "@/services/jikanApi";
import { Anime } from "@/types/jikan";
import { useTheme } from "@/providers/ThemeProvider";

export default function RandomAnimeModal() {
  const { playUiSound } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anime, setAnime] = useState<Anime | null>(null);

  const fetchRandom = async () => {
    playUiSound("click");
    setLoading(true);
    try {
      const res = await getRandomAnime();
      setAnime(res.data);
    } catch (e) {
      setAnime(null);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (!anime) fetchRandom();
  };

  return (
    <>
      {/* Launcher Banner Card */}
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-cyan-950/40 via-rose-950/30 to-zinc-950 p-5 sm:p-8 border border-cyan-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 my-6 sm:my-8 group overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-rose-500 p-0.5 shadow-xl shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300 shrink-0">
            <div className="w-full h-full bg-[#09090B] rounded-[14px] flex items-center justify-center">
              <Dices className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </div>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-rose-400 flex items-center justify-center sm:justify-start gap-1">
              <Flame className="w-3.5 h-3.5" />
              Anime Roulette
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white">Don't know what to watch next?</h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Spin the AniMerit random anime generator to discover hidden gems from over 25,000+ anime titles.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpen}
          className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-rose-600 hover:from-cyan-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
        >
          <Dices className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Spin & Discover</span>
        </button>
      </div>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-xl glass-panel rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl p-5 sm:p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Dices className="w-5 h-5 text-cyan-400" />
                <h3 className="font-extrabold text-base text-zinc-100">Random Anime Discovery</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3 text-zinc-400">
                <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin" />
                <span className="text-sm font-semibold">Picking a random anime for you...</span>
              </div>
            ) : anime ? (
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start">
                <div className="relative w-32 h-48 sm:w-36 sm:h-52 rounded-2xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700 shadow-xl">
                  <Image
                    src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || "/placeholder.jpg"}
                    alt={anime.title}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-3 flex-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                    {anime.type && (
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-extrabold uppercase">
                        {anime.type}
                      </span>
                    )}
                    {anime.score && (
                      <span className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {anime.score.toFixed(1)}
                      </span>
                    )}
                  </div>

                  <h4 className="font-black text-lg sm:text-xl text-white line-clamp-2">{anime.title}</h4>

                  <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                    {anime.synopsis || "No description provided."}
                  </p>

                  <div className="flex items-center gap-3 pt-2 justify-center sm:justify-start">
                    <Link
                      href={`/anime/${anime.mal_id}`}
                      onClick={() => setIsOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all"
                    >
                      <Info className="w-4 h-4" />
                      Full Details
                    </Link>

                    <button
                      onClick={fetchRandom}
                      className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 text-zinc-300 hover:text-white font-bold text-xs flex items-center gap-2 transition-all"
                    >
                      <RefreshCw className="w-4 h-4 text-cyan-400" />
                      Spin Again
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

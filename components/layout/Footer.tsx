"use client";

import React from "react";
import Link from "next/link";
import { Play, Heart, ExternalLink } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function Footer() {
  const { playUiSound } = useTheme();

  return (
    <footer className="relative mt-24 border-t border-zinc-800/80 bg-[#060608] text-zinc-400 overflow-hidden">
      {/* Glow highlight line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => playUiSound("click")}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-rose-500 p-[1px]">
                <div className="w-full h-full bg-[#09090B] rounded-[11px] flex items-center justify-center">
                  <Play className="w-4 h-4 text-cyan-400 fill-cyan-400 ml-0.5" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white">
                ANI<span className="text-gradient-primary">MERIT</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              An elegant, modern anime discovery platform built for anime fans worldwide. Powered by the public Jikan API v4.
            </p>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-1 text-rose-400">
                Crafted with <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> for anime fans
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Explore</h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link href="/" onClick={() => playUiSound("click")} className="hover:text-cyan-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/top" onClick={() => playUiSound("click")} className="hover:text-cyan-400 transition-colors">
                  Top Ranked Anime
                </Link>
              </li>
              <li>
                <Link href="/airing" onClick={() => playUiSound("click")} className="hover:text-cyan-400 transition-colors">
                  Currently Airing
                </Link>
              </li>
              <li>
                <Link href="/movies" onClick={() => playUiSound("click")} className="hover:text-cyan-400 transition-colors">
                  Top Anime Feature Films
                </Link>
              </li>
              <li>
                <Link href="/seasonal" onClick={() => playUiSound("click")} className="hover:text-cyan-400 transition-colors">
                  Seasonal Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Genres */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Popular Genres</h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link href="/genre/1" onClick={() => playUiSound("click")} className="hover:text-cyan-400 transition-colors">
                  Action & Adventure
                </Link>
              </li>
              <li>
                <Link href="/genre/10" onClick={() => playUiSound("click")} className="hover:text-cyan-400 transition-colors">
                  Fantasy & Magic
                </Link>
              </li>
              <li>
                <Link href="/genre/22" onClick={() => playUiSound("click")} className="hover:text-cyan-400 transition-colors">
                  Romance & Drama
                </Link>
              </li>
              <li>
                <Link href="/genre/24" onClick={() => playUiSound("click")} className="hover:text-cyan-400 transition-colors">
                  Sci-Fi & Cyberpunk
                </Link>
              </li>
              <li>
                <Link href="/genre/37" onClick={() => playUiSound("click")} className="hover:text-cyan-400 transition-colors">
                  Supernatural
                </Link>
              </li>
            </ul>
          </div>

          {/* API Attribution & Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">Data & Tech Stack</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All anime & character metadata is served directly by the official MyAnimeList wrapper API (Jikan API v4).
            </p>
            <a
              href="https://jikan.moe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium mt-1"
            >
              <span>Jikan API v4 Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} AniMerit. Production ready fan application.</p>
          <div className="flex items-center gap-4">
            <Link href="/favorites" onClick={() => playUiSound("click")} className="hover:text-white">
              My Library
            </Link>
            <Link href="/settings" onClick={() => playUiSound("click")} className="hover:text-white">
              Settings & Preference
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

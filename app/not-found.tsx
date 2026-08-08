"use client";

import Link from "next/link";
import { Play, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 gap-6">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-rose-500 p-[1px] shadow-2xl shadow-cyan-500/30 animate-bounce">
        <div className="w-full h-full bg-[#09090B] rounded-[23px] flex items-center justify-center">
          <Play className="w-9 h-9 text-cyan-400 fill-cyan-400 ml-0.5" />
        </div>
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-500">
          404
        </span>
        <h1 className="text-2xl font-extrabold text-white">Lost in another dimension?</h1>
        <p className="text-xs text-zinc-400 leading-relaxed">
          The page or anime dimension you were looking for could not be found in the AniMerit index.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-rose-600 hover:from-cyan-500 hover:to-rose-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/30 flex items-center gap-2 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/search"
          className="px-6 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500 text-zinc-200 hover:text-white font-bold text-xs flex items-center gap-2 transition-all"
        >
          <Search className="w-4 h-4 text-cyan-400" />
          <span>Search Anime</span>
        </Link>
      </div>
    </div>
  );
}

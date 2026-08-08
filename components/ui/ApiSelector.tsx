"use client";

import React from "react";
import { useApiProvider } from "@/providers/ApiProviderContext";
import { useTheme } from "@/providers/ThemeProvider";
import { Database, Zap } from "lucide-react";

export default function ApiSelector() {
  const { apiProvider, setApiProvider } = useApiProvider();
  const { playUiSound } = useTheme();

  return (
    <div className="flex items-center gap-1.5 glass-panel p-1 rounded-full border border-zinc-800 shadow-md">
      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold uppercase text-zinc-400 pl-2.5 pr-1">
        <Database className="w-3 h-3 text-cyan-400" />
        Source:
      </span>

      <button
        onClick={() => {
          playUiSound("toggle");
          setApiProvider("jikan");
        }}
        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 ${
          apiProvider === "jikan"
            ? "bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-md shadow-cyan-500/20"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <span>Jikan API</span>
      </button>

      <button
        onClick={() => {
          playUiSound("toggle");
          setApiProvider("anilist");
        }}
        className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 ${
          apiProvider === "anilist"
            ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-500/20"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
        <span>AniList GraphQL</span>
      </button>
    </div>
  );
}

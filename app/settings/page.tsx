"use client";

import React, { useState } from "react";
import { useTheme, PrimaryAccent, CardDensity } from "@/providers/ThemeProvider";
import { useApiProvider } from "@/providers/ApiProviderContext";
import { Settings, Palette, Grid, Volume2, VolumeX, Flame, Trash2, Check, ShieldCheck, Database, Zap } from "lucide-react";

const ACCENTS: Array<{ key: PrimaryAccent; name: string; class: string }> = [
  { key: "cyan", name: "Electric Cyan", class: "bg-cyan-500" },
  { key: "rose", name: "Crimson Rose", class: "bg-rose-500" },
  { key: "azure", name: "Azure Blue", class: "bg-sky-500" },
  { key: "emerald", name: "Emerald Green", class: "bg-emerald-500" },
  { key: "amber", name: "Golden Amber", class: "bg-amber-500" },
];

export default function SettingsPage() {
  const {
    accent,
    setAccent,
    cardDensity,
    setCardDensity,
    soundEnabled,
    setSoundEnabled,
    motionEnabled,
    setMotionEnabled,
    playUiSound,
  } = useTheme();

  const { apiProvider, setApiProvider } = useApiProvider();
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleClearCache = () => {
    playUiSound("click");
    localStorage.removeItem("animerit_recent_viewed");
    localStorage.removeItem("animerit_recent_searches");
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-zinc-800 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Settings className="w-4 h-4 text-cyan-400" />
          User Preferences
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">App Settings</h1>
        <p className="text-sm text-zinc-400">
          Customize API source provider, UI aesthetics, poster grid sizes, audio effects, and storage settings.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* API Provider Switcher Section */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-600/20 text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Default API Data Provider</h3>
              <p className="text-xs text-zinc-400">Choose your preferred backend API source for fetching anime metadata</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => {
                playUiSound("toggle");
                setApiProvider("jikan");
              }}
              className={`p-5 rounded-2xl border text-left flex flex-col gap-2 transition-all ${
                apiProvider === "jikan"
                  ? "border-cyan-500 bg-zinc-900 shadow-xl shadow-cyan-500/20 ring-1 ring-cyan-500"
                  : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  Jikan API v4
                </span>
                {apiProvider === "jikan" && <Check className="w-4 h-4 text-cyan-400" />}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Official REST API for MyAnimeList database with comprehensive scores, episodes, franchise relations, and staff.
              </p>
            </button>

            <button
              onClick={() => {
                playUiSound("toggle");
                setApiProvider("anilist");
              }}
              className={`p-5 rounded-2xl border text-left flex flex-col gap-2 transition-all ${
                apiProvider === "anilist"
                  ? "border-rose-500 bg-zinc-900 shadow-xl shadow-rose-500/20 ring-1 ring-rose-500"
                  : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  AniList GraphQL API
                </span>
                {apiProvider === "anilist" && <Check className="w-4 h-4 text-rose-400" />}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ultra-fast GraphQL endpoint with high-res cover art, real-time community popularity rankings, and modern seasonal filters.
              </p>
            </button>
          </div>
        </div>

        {/* Accent Color Section */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-600/20 text-cyan-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Primary Accent Color</h3>
              <p className="text-xs text-zinc-400">Choose your favorite UI glow tint</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {ACCENTS.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  playUiSound("toggle");
                  setAccent(item.key);
                }}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                  accent === item.key
                    ? "border-cyan-500 bg-zinc-900 shadow-lg shadow-cyan-500/20 scale-105"
                    : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                }`}
              >
                <div className={`w-5 h-5 rounded-full ${item.class} shrink-0 flex items-center justify-center`}>
                  {accent === item.key && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs font-bold text-zinc-200">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card Density Layout */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-600/20 text-rose-400">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Poster Card Aspect Ratio</h3>
              <p className="text-xs text-zinc-400">Adjust grid poster card height</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { key: "compact", name: "Compact (3:4)" },
              { key: "normal", name: "Balanced (2:3)" },
              { key: "spacious", name: "Tall Poster (2:3.2)" },
            ].map((d) => (
              <button
                key={d.key}
                onClick={() => {
                  playUiSound("toggle");
                  setCardDensity(d.key as CardDensity);
                }}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                  cardDensity === d.key
                    ? "border-rose-500 bg-zinc-900 text-white shadow-lg shadow-rose-500/20"
                    : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-white"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* Audio & Performance Toggles */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-600/20 text-cyan-400">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">UI Interaction Sound Effects</h3>
                <p className="text-xs text-zinc-400">Web Audio synth feedback on clicks & hover</p>
              </div>
            </div>
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playUiSound("toggle");
              }}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                soundEnabled ? "bg-cyan-600" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  soundEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="border-t border-zinc-800/60 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-600/20 text-emerald-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">GPU Motion & Smooth Animations</h3>
                <p className="text-xs text-zinc-400">Framer Motion transition effects</p>
              </div>
            </div>
            <button
              onClick={() => {
                playUiSound("toggle");
                setMotionEnabled(!motionEnabled);
              }}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                motionEnabled ? "bg-cyan-600" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  motionEnabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Clear Temporary Cache */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-600/20 text-red-400">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Clear Temporary Search & Viewing Cache</h3>
              <p className="text-xs text-zinc-400">Does not delete saved library items</p>
            </div>
          </div>

          <button
            onClick={handleClearCache}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500 text-xs font-bold text-zinc-300 hover:text-red-400 transition-all flex items-center gap-1.5"
          >
            {cacheCleared ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Cache Cleared</span>
              </>
            ) : (
              <span>Clear History</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

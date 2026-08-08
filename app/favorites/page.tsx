"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { Heart, Trash2, Download, Upload, Search, User, Star, Tv, Film, Sparkles, BookOpen } from "lucide-react";

export default function FavoritesPage() {
  const { playUiSound } = useTheme();
  const {
    favoriteAnime,
    favoriteCharacters,
    toggleFavoriteAnime,
    toggleFavoriteCharacter,
    clearAllFavorites,
    exportFavoritesJson,
    importFavorites,
  } = useFavorites();

  const [activeTab, setActiveTab] = useState<"anime" | "characters">("anime");
  const [searchQuery, setSearchQuery] = useState("");
  const [importing, setImporting] = useState(false);

  const filteredAnime = favoriteAnime.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCharacters = favoriteCharacters.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    playUiSound("click");
    const jsonStr = exportFavoritesJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `otakuverse-library-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importFavorites(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            Personal Anime Vault
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Saved Favorites</h1>
          <p className="text-sm text-zinc-400">
            Your custom anime watchlist and favorite characters stored locally without registration.
          </p>
        </div>

        {/* Export & Import Backup Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-violet-500 text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-violet-400" />
            <span>Backup Data</span>
          </button>

          <label className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-pink-500 text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-2 cursor-pointer transition-all">
            <Upload className="w-4 h-4 text-pink-400" />
            <span>Restore JSON</span>
            <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </label>

          {(favoriteAnime.length > 0 || favoriteCharacters.length > 0) && (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to clear all saved library data?")) {
                  clearAllFavorites();
                }
              }}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 text-zinc-400 hover:text-red-400 transition-all"
              title="Clear Library"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-zinc-800">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-zinc-950/80 p-1 rounded-xl border border-zinc-800 w-full sm:w-auto">
          <button
            onClick={() => {
              playUiSound("click");
              setActiveTab("anime");
            }}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "anime"
                ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Saved Anime ({favoriteAnime.length})</span>
          </button>

          <button
            onClick={() => {
              playUiSound("click");
              setActiveTab("characters");
            }}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "characters"
                ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Favorite Characters ({favoriteCharacters.length})</span>
          </button>
        </div>

        {/* Search Saved Items Input */}
        <div className="relative flex items-center bg-zinc-950/80 rounded-xl border border-zinc-800 p-1.5 w-full sm:w-64">
          <Search className="w-4 h-4 text-violet-400 ml-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter saved items..."
            className="w-full bg-transparent px-3 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none font-medium"
          />
        </div>
      </div>

      {/* Anime Tab Display */}
      {activeTab === "anime" && (
        <>
          {filteredAnime.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {filteredAnime.map((item) => (
                <div key={item.mal_id} className="group relative flex flex-col glass-card rounded-2xl overflow-hidden p-2">
                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900">
                    <Image src={item.image_url} alt={item.title} fill sizes="200px" className="object-cover group-hover:scale-105 transition-transform" />
                    <button
                      onClick={() =>
                        toggleFavoriteAnime({
                          mal_id: item.mal_id,
                          title: item.title,
                          images: { jpg: { large_image_url: item.image_url } },
                        } as any)
                      }
                      className="absolute top-2 right-2 p-2 rounded-full bg-black/70 backdrop-blur-md text-pink-500 hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link href={`/anime/${item.mal_id}`} className="font-bold text-xs text-zinc-100 group-hover:text-violet-400 truncate">
                      {item.title}
                    </Link>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      {item.type && <span className="uppercase text-violet-400 font-semibold">{item.type}</span>}
                      {item.score && (
                        <span className="flex items-center gap-0.5 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {item.score}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-zinc-400 text-sm glass-panel rounded-3xl p-8 flex flex-col items-center gap-3">
              <Heart className="w-12 h-12 text-zinc-700" />
              <p className="font-bold text-base text-zinc-200">No Saved Anime Yet</p>
              <p className="text-xs max-w-sm">
                Explore top anime or search your favorite titles and click the heart icon to save them to your local library.
              </p>
              <Link href="/top" className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs mt-2">
                Browse Top Anime
              </Link>
            </div>
          )}
        </>
      )}

      {/* Characters Tab Display */}
      {activeTab === "characters" && (
        <>
          {filteredCharacters.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {filteredCharacters.map((char) => (
                <div key={char.mal_id} className="group relative flex flex-col glass-card rounded-2xl overflow-hidden p-2">
                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900">
                    <Image src={char.image_url} alt={char.name} fill sizes="200px" className="object-cover group-hover:scale-105 transition-transform" />
                    <button
                      onClick={() =>
                        toggleFavoriteCharacter({
                          mal_id: char.mal_id,
                          name: char.name,
                          images: { jpg: { image_url: char.image_url } },
                        })
                      }
                      className="absolute top-2 right-2 p-2 rounded-full bg-black/70 backdrop-blur-md text-pink-500 hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link href={`/character/${char.mal_id}`} className="font-bold text-xs text-zinc-100 group-hover:text-violet-400 truncate">
                      {char.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-zinc-400 text-sm glass-panel rounded-3xl p-8 flex flex-col items-center gap-3">
              <User className="w-12 h-12 text-zinc-700" />
              <p className="font-bold text-base text-zinc-200">No Saved Characters</p>
              <p className="text-xs max-w-sm">
                Visit any anime details page to save your favorite character profiles.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

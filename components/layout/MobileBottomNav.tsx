"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Tv, Search, Heart, Home } from "lucide-react";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useTheme } from "@/providers/ThemeProvider";

interface MobileBottomNavProps {
  onOpenSearch: () => void;
}

export default function MobileBottomNav({ onOpenSearch }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { favoriteAnime, favoriteCharacters } = useFavorites();
  const { playUiSound } = useTheme();

  const totalFavorites = favoriteAnime.length + favoriteCharacters.length;

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/top", label: "Top", icon: Flame },
    { href: "/airing", label: "Airing", icon: Tv },
    { href: "/favorites", label: "Library", icon: Heart, badge: totalFavorites > 0 ? totalFavorites : null },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#09090B]/95 backdrop-blur-xl border-t border-zinc-800/80 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {items.slice(0, 2).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => playUiSound("click")}
              className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all"
              style={{
                color: isActive ? "var(--primary)" : "#A1A1AA",
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}

        {/* Center Search Trigger */}
        <button
          onClick={() => {
            playUiSound("click");
            onOpenSearch();
          }}
          className="-mt-5 p-3 rounded-full theme-bg-primary text-white shadow-xl theme-glow border-2 border-[#09090B] flex items-center justify-center transition-transform active:scale-95"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {items.slice(2).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => playUiSound("click")}
              className="relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all"
              style={{
                color: isActive ? "var(--primary)" : "#A1A1AA",
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold">{item.label}</span>
              {item.badge !== null && item.badge !== undefined && (
                <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

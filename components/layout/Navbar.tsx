"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Settings, Menu, X, Flame, Tv, Film, Calendar, Play } from "lucide-react";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useTheme } from "@/providers/ThemeProvider";
import ApiSelector from "@/components/ui/ApiSelector";

interface NavbarProps {
  onOpenSearch: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const { favoriteAnime, favoriteCharacters } = useFavorites();
  const { playUiSound } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalFavorites = favoriteAnime.length + favoriteCharacters.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenSearch]);

  const navLinks = [
    { href: "/", label: "Home", icon: Flame },
    { href: "/top", label: "Top Anime", icon: Flame },
    { href: "/airing", label: "Airing", icon: Tv },
    { href: "/movies", label: "Movies", icon: Film },
    { href: "/seasonal", label: "Seasonal", icon: Calendar },
    { href: "/favorites", label: "Library", icon: Heart, badge: totalFavorites > 0 ? totalFavorites : null },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/80 py-2 shadow-xl shadow-black/50"
          : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - AniMerit */}
        <Link
          href="/"
          onClick={() => playUiSound("click")}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl theme-accent-gradient p-[1px] shadow-lg theme-glow group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#09090B] rounded-[11px] flex items-center justify-center">
              <Play className="w-4 h-4 theme-text-primary fill-current ml-0.5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              ANI<span className="text-gradient-primary">MERIT</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold -mt-1">
              Anime Discovery
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-950/60 p-1 rounded-full border border-zinc-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => playUiSound("click")}
                onMouseEnter={() => playUiSound("hover")}
                style={{
                  backgroundColor: isActive ? "var(--primary)" : undefined,
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-md shadow-cyan-500/20"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-zinc-400"}`} />
                <span>{link.label}</span>
                {link.badge !== null && link.badge !== undefined && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? "bg-white text-black" : "bg-rose-500 text-white"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar & API Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Interactive API Provider Switcher */}
          <ApiSelector />

          {/* Quick Search Button */}
          <button
            onClick={() => {
              playUiSound("click");
              onOpenSearch();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/50 text-zinc-300 hover:text-white transition-all duration-200 text-xs shadow-md group"
          >
            <Search className="w-4 h-4 theme-text-primary group-hover:scale-110 transition-transform" />
            <span className="hidden xl:inline font-medium">Search...</span>
            <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
              <span>Ctrl</span>
              <span>K</span>
            </kbd>
          </button>

          {/* Mobile Drawer Menu Toggle */}
          <button
            onClick={() => {
              playUiSound("click");
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pb-4 animate-in slide-in-from-top-4 duration-200">
          <div className="glass-panel p-3 rounded-2xl flex flex-col gap-1 border border-zinc-800">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    playUiSound("click");
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    backgroundColor: isActive ? "var(--primary)" : undefined,
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-300 hover:bg-zinc-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== null && link.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

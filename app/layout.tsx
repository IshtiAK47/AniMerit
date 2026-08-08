"use client";

import React, { useState } from "react";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { FavoritesProvider } from "@/providers/FavoritesProvider";
import { ApiProvider } from "@/providers/ApiProviderContext";
import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Footer from "@/components/layout/Footer";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import SearchModal from "@/components/ui/SearchModal";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <html lang="en" className="dark">
      <head>
        <title>AniMerit - Premium Anime Discovery Platform</title>
        <meta
          name="description"
          content="Discover top anime, movies, currently airing series, character profiles, and seasonal archives on AniMerit."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#09090B" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#09090B] text-zinc-100 min-h-screen flex flex-col font-sans antialiased selection:bg-cyan-500/30 selection:text-white pb-16 md:pb-0">
        <QueryProvider>
          <ApiProvider>
            <ThemeProvider>
              <FavoritesProvider>
                <ScrollProgress />
                <BackgroundBlobs />
                <Navbar onOpenSearch={() => setSearchModalOpen(true)} />
                <main className="flex-1 pt-16 md:pt-20">{children}</main>
                <Footer />
                <MobileBottomNav onOpenSearch={() => setSearchModalOpen(true)} />
                <BackToTop />
                <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
              </FavoritesProvider>
            </ThemeProvider>
          </ApiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

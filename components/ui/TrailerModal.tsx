"use client";

import React, { useEffect } from "react";
import { X, Film } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId: string | null;
  title: string;
}

export default function TrailerModal({ isOpen, onClose, youtubeId, title }: TrailerModalProps) {
  const { playUiSound } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !youtubeId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-100 line-clamp-1">{title} - Official Trailer</h3>
          </div>

          <button
            onClick={() => {
              playUiSound("click");
              onClose();
            }}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close trailer modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={`${title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}

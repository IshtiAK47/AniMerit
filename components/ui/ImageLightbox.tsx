"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
}: ImageLightboxProps) {
  const { playUiSound } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
      if (e.key === "ArrowRight") onIndexChange((currentIndex + 1) % images.length);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images, onClose, onIndexChange]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <button
        onClick={() => {
          playUiSound("click");
          onClose();
        }}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => {
              playUiSound("click");
              onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              playUiSound("click");
              onIndexChange((currentIndex + 1) % images.length);
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image Display */}
      <div className="relative w-full max-w-4xl max-h-[85vh] aspect-[3/4] sm:aspect-auto sm:h-[80vh] flex items-center justify-center">
        <Image
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          fill
          sizes="100vw"
          className="object-contain rounded-2xl"
        />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-zinc-400 bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

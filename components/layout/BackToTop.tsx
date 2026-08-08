"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { playUiSound } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    playUiSound("click");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 left-6 z-40 p-3 rounded-full glass-panel border border-violet-500/30 text-zinc-300 hover:text-white hover:border-violet-500 hover:bg-violet-600/20 shadow-lg hover:shadow-violet-500/30 transition-all duration-300 transform hover:scale-110 active:scale-95 group"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  );
}

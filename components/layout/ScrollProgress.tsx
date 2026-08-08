"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(236,72,153,0.7)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

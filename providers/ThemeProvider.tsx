"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type PrimaryAccent = "cyan" | "rose" | "azure" | "emerald" | "amber";
export type CardDensity = "compact" | "normal" | "spacious";

interface ThemeContextType {
  accent: PrimaryAccent;
  setAccent: (accent: PrimaryAccent) => void;
  cardDensity: CardDensity;
  setCardDensity: (density: CardDensity) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  motionEnabled: boolean;
  setMotionEnabled: (enabled: boolean) => void;
  playUiSound: (type?: "click" | "hover" | "toggle" | "favorite") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ACCENT_COLOR_MAP: Record<
  PrimaryAccent,
  { primary: string; hover: string; rgb: string; name: string }
> = {
  cyan: { primary: "#06B6D4", hover: "#0891B2", rgb: "6, 182, 212", name: "Electric Cyan" },
  rose: { primary: "#F43F5E", hover: "#E11D48", rgb: "244, 63, 94", name: "Crimson Rose" },
  azure: { primary: "#0284C7", hover: "#0369A1", rgb: "2, 132, 199", name: "Azure Blue" },
  emerald: { primary: "#10B981", hover: "#059669", rgb: "16, 185, 129", name: "Emerald Green" },
  amber: { primary: "#F59E0B", hover: "#D97706", rgb: "245, 158, 11", name: "Golden Amber" },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<PrimaryAccent>("cyan");
  const [cardDensity, setCardDensityState] = useState<CardDensity>("normal");
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [motionEnabled, setMotionEnabledState] = useState<boolean>(true);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedAccent = localStorage.getItem("animerit_accent") as PrimaryAccent;
      const savedDensity = localStorage.getItem("animerit_density") as CardDensity;
      const savedSound = localStorage.getItem("animerit_sound");
      const savedMotion = localStorage.getItem("animerit_motion");

      if (savedAccent && ACCENT_COLOR_MAP[savedAccent]) {
        applyAccentTheme(savedAccent);
      } else {
        applyAccentTheme("cyan");
      }
      if (savedDensity) setCardDensityState(savedDensity);
      if (savedSound !== null) setSoundEnabledState(savedSound === "true");
      if (savedMotion !== null) setMotionEnabledState(savedMotion === "true");
    } catch (e) {}
  }, []);

  const applyAccentTheme = (newAccent: PrimaryAccent) => {
    setAccentState(newAccent);
    const theme = ACCENT_COLOR_MAP[newAccent] || ACCENT_COLOR_MAP.cyan;
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--primary-hover", theme.hover);
    document.documentElement.style.setProperty("--primary-rgb", theme.rgb);
    document.documentElement.setAttribute("data-accent", newAccent);
  };

  const setAccent = (newAccent: PrimaryAccent) => {
    applyAccentTheme(newAccent);
    try {
      localStorage.setItem("animerit_accent", newAccent);
    } catch (e) {}
  };

  const setCardDensity = (density: CardDensity) => {
    setCardDensityState(density);
    try {
      localStorage.setItem("animerit_density", density);
    } catch (e) {}
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    try {
      localStorage.setItem("animerit_sound", String(enabled));
    } catch (e) {}
  };

  const setMotionEnabled = (enabled: boolean) => {
    setMotionEnabledState(enabled);
    try {
      localStorage.setItem("animerit_motion", String(enabled));
    } catch (e) {}
  };

  // Subtle synth audio FX using Web Audio API
  const playUiSound = (type: "click" | "hover" | "toggle" | "favorite" = "click") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "hover") {
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === "click") {
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "favorite") {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.06);
        osc.frequency.setValueAtTime(783.99, now + 0.12);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === "toggle") {
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {}
  };

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent,
        cardDensity,
        setCardDensity,
        soundEnabled,
        setSoundEnabled,
        motionEnabled,
        setMotionEnabled,
        playUiSound,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

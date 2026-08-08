"use client";

import React, { useState, useEffect } from "react";
import { Quote, RefreshCw, Copy, Check, Flame } from "lucide-react";
import { getRandomQuote } from "@/services/jikanApi";
import { AnimeQuote } from "@/types/jikan";
import { useTheme } from "@/providers/ThemeProvider";

const INITIAL_QUOTE: AnimeQuote = {
  quote: "People die if they are killed... but heroes never yield to fate.",
  character: "Shirou Emiya",
  anime: "Fate/stay night",
};

export default function QuoteWidget() {
  const { playUiSound } = useTheme();
  const [quoteItem, setQuoteItem] = useState<AnimeQuote>(INITIAL_QUOTE);
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setQuoteItem(getRandomQuote());
  }, []);

  const handleRefresh = () => {
    playUiSound("click");
    setSpinning(true);
    setTimeout(() => {
      setQuoteItem(getRandomQuote());
      setSpinning(false);
    }, 250);
  };

  const handleCopy = () => {
    playUiSound("click");
    navigator.clipboard.writeText(`"${quoteItem.quote}" — ${quoteItem.character} (${quoteItem.anime})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full rounded-3xl glass-panel p-5 sm:p-8 border border-zinc-800/80 shadow-2xl overflow-hidden my-6 sm:my-8 group">
      {/* Background glow accent */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cyan-600/10 blur-3xl group-hover:bg-cyan-600/20 transition-all duration-500" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
        <div className="flex gap-3 sm:gap-4 items-start">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-tr from-cyan-600/30 to-rose-500/30 border border-cyan-500/40 text-cyan-300 shrink-0">
            <Quote className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-cyan-400" />
              Anime Quote of the Moment
            </span>
            <blockquote className="text-sm sm:text-lg font-medium text-zinc-100 italic leading-relaxed">
              "{quoteItem.quote}"
            </blockquote>
            <p className="text-xs sm:text-sm font-semibold text-zinc-400 mt-0.5 sm:mt-1">
              — <span className="text-zinc-200">{quoteItem.character}</span>{" "}
              <span className="text-rose-400">({quoteItem.anime})</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            onClick={handleCopy}
            className="p-2.5 sm:p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 text-zinc-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-2"
            aria-label="Copy Quote"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleRefresh}
            className="p-2.5 sm:p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 text-zinc-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-2"
            aria-label="Next Quote"
          >
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${spinning ? "animate-spin" : ""}`} />
            <span>Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

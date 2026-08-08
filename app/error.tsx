"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("OtakuVerse Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 gap-6">
      <div className="p-4 rounded-3xl bg-red-600/10 border border-red-500/30 text-red-400">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h1 className="text-2xl font-extrabold text-white">Something went wrong</h1>
        <p className="text-xs text-zinc-400 leading-relaxed">
          An unexpected error occurred while fetching or rendering data. Please try again.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-xl shadow-violet-600/30 flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white font-bold text-xs flex items-center gap-2 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
}

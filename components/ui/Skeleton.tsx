import React from "react";

export function AnimeCardSkeleton() {
  return (
    <div className="rounded-2xl glass-panel p-2 flex flex-col gap-3 animate-shimmer overflow-hidden">
      <div className="w-full aspect-[2/3] rounded-xl bg-zinc-800/80" />
      <div className="flex flex-col gap-2 px-1 pb-1">
        <div className="h-4 w-3/4 bg-zinc-800 rounded-md" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-1/3 bg-zinc-800 rounded-md" />
          <div className="h-3 w-1/4 bg-zinc-800 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full h-[520px] rounded-3xl glass-panel animate-shimmer p-8 flex flex-col justify-end gap-4 overflow-hidden">
      <div className="h-6 w-32 bg-zinc-800 rounded-full" />
      <div className="h-10 w-2/3 bg-zinc-800 rounded-xl" />
      <div className="h-4 w-1/2 bg-zinc-800 rounded-md" />
      <div className="flex gap-4 mt-4">
        <div className="h-12 w-36 bg-zinc-800 rounded-xl" />
        <div className="h-12 w-36 bg-zinc-800 rounded-xl" />
      </div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8 animate-shimmer">
      <div className="w-full h-80 rounded-3xl bg-zinc-800/80" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="w-full aspect-[2/3] rounded-2xl bg-zinc-800" />
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="h-10 w-3/4 bg-zinc-800 rounded-xl" />
          <div className="h-6 w-1/3 bg-zinc-800 rounded-md" />
          <div className="h-32 w-full bg-zinc-800 rounded-2xl mt-4" />
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Dynamic Primary Accent Ambient Blob */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[140px] opacity-20 animate-blob-1"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      {/* Secondary Rose Ambient Blob */}
      <div
        className="absolute top-[35%] -right-[10%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full blur-[150px] opacity-15 animate-blob-2"
        style={{
          background: "radial-gradient(circle, rgba(244,63,94,0.7) 0%, rgba(225,29,72,0) 70%)",
        }}
      />
      {/* Grid overlay texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
}

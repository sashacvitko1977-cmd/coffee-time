"use client";

import { useEffect, useRef } from "react";
import { useVideoStory } from "./video-story-context";

export function VideoBackground() {
  const { reduce, registerVideo } = useVideoStory();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    registerVideo(ref.current);
    return () => registerVideo(null);
  }, [registerVideo]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {reduce ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/media/cof.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          ref={ref}
          className="h-full w-full object-cover"
          src="/media/cofe-scrub.mp4"
          poster="/media/cof.jpg"
          muted
          playsInline
          preload="auto"
        />
      )}
      {/* Lighter center so the cup stays visible for the pointer */}
      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/45" />
    </div>
  );
}

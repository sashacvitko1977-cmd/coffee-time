"use client";

import { useEffect, useRef } from "react";
import { useVideoStory, MARKS } from "./video-story-context";

/**
 * Fixed scrub video only — no still photos, posters, or plan images.
 */
export function VideoBackground() {
  const { registerVideo } = useVideoStory();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    registerVideo(ref.current);
    return () => registerVideo(null);
  }, [registerVideo]);

  // Land on the story start frame as soon as metadata is available
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const snapStart = () => {
      try {
        v.pause();
        v.currentTime = MARKS.start;
      } catch {
        /* ignore */
      }
    };

    if (v.readyState >= 1) snapStart();
    else v.addEventListener("loadedmetadata", snapStart, { once: true });

    return () => v.removeEventListener("loadedmetadata", snapStart);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#1e1e1e]"
      aria-hidden="true"
    >
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src="/media/cofe-scrub.mp4"
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/45" />
    </div>
  );
}

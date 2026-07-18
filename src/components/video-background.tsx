"use client";

import { useEffect, useRef, useState } from "react";
import { useVideoStory, MARKS } from "./video-story-context";

/**
 * Fixed background video for the story page.
 * Poster always sits underneath so mobile never shows a black void while
 * the scrub video is still downloading / seeking the first painted frame.
 */
export function VideoBackground() {
  const { reduce, registerVideo } = useVideoStory();
  const ref = useRef<HTMLVideoElement>(null);
  const [frameReady, setFrameReady] = useState(false);

  useEffect(() => {
    registerVideo(ref.current);
    return () => registerVideo(null);
  }, [registerVideo]);

  // Force a painted frame on iOS/Android: poster stays until video is ready.
  useEffect(() => {
    if (reduce) return;
    const v = ref.current;
    if (!v) return;

    let cancelled = false;

    const waitEvent = (type: string, ms = 4000) =>
      new Promise<void>((resolve) => {
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          v.removeEventListener(type, finish);
          resolve();
        };
        v.addEventListener(type, finish, { once: true });
        window.setTimeout(finish, ms);
      });

    const paintFirstFrame = async () => {
      try {
        if (v.readyState < 1) {
          await waitEvent("loadedmetadata");
        }
        if (cancelled) return;

        // Land on story start frame
        try {
          v.currentTime = MARKS.start;
        } catch {
          /* ignore */
        }
        await waitEvent("seeked", 2500);
        if (cancelled) return;

        // iOS/Android often won't paint a paused video until play() once
        v.muted = true;
        try {
          const p = v.play();
          if (p) await p;
          if (cancelled) return;
          // One frame is enough — freeze again at story start
          v.pause();
          try {
            v.currentTime = MARKS.start;
          } catch {
            /* ignore */
          }
        } catch {
          // Autoplay blocked — poster remains until data arrives
        }

        if (v.readyState < 2) {
          await waitEvent("loadeddata", 3000);
        }
        if (cancelled) return;

        setFrameReady(true);
      } catch {
        if (!cancelled) setFrameReady(true);
      }
    };

    void paintFirstFrame();

    // Never leave poster forever if events are flaky
    const fallback = window.setTimeout(() => {
      if (!cancelled) setFrameReady(true);
    }, 6000);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, [reduce]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Poster always present — fills screen until video paints */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/cof.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        fetchPriority="high"
      />

      {!reduce && (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
            frameReady ? "opacity-100" : "opacity-0"
          }`}
          src="/media/cofe-scrub.mp4"
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

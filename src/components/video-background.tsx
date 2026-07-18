"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useVideoStory, MARKS, VIDEO_MARKS } from "./video-story-context";

const STILLS = [
  "/media/plan1.jpg",
  "/media/plan2.jpg",
  "/media/plan3.jpg",
] as const;

/**
 * Fixed background for the story page.
 *
 * Mobile-safe stack:
 *  1) Still photo matching the current story beat (always visible instantly)
 *  2) Video faded in ONLY after a real frame is painted (never black over the still)
 *  3) Dim overlays on top
 */
export function VideoBackground() {
  const { reduce, registerVideo, phase, currentTime, playing } = useVideoStory();
  const ref = useRef<HTMLVideoElement>(null);
  const [frameReady, setFrameReady] = useState(false);
  const readyRef = useRef(false);

  const markReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    setFrameReady(true);
  }, []);

  useEffect(() => {
    registerVideo(ref.current);
    return () => registerVideo(null);
  }, [registerVideo]);

  // When the story actually plays a segment, video has a painted frame.
  useEffect(() => {
    if (playing) markReady();
  }, [playing, markReady]);

  useEffect(() => {
    if (reduce) return;
    const v = ref.current;
    if (!v) return;

    let cancelled = false;

    const waitEvent = (type: string, ms = 5000) =>
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

    const confirmPaint = () =>
      new Promise<void>((resolve) => {
        const anyV = v as HTMLVideoElement & {
          requestVideoFrameCallback?: (
            cb: () => void
          ) => number;
        };
        if (typeof anyV.requestVideoFrameCallback === "function") {
          anyV.requestVideoFrameCallback(() => resolve());
          window.setTimeout(resolve, 800);
        } else {
          // One rAF pair after play is usually enough
          requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve());
          });
        }
      });

    const unlockFrame = async () => {
      try {
        v.muted = true;
        v.defaultMuted = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");
        v.setAttribute("webkit-playsinline", "");
        v.preload = "auto";

        // Kick network early
        try {
          v.load();
        } catch {
          /* ignore */
        }

        if (v.readyState < 1) {
          await waitEvent("loadedmetadata");
        }
        if (cancelled) return;

        try {
          v.currentTime = MARKS.start;
        } catch {
          /* ignore */
        }
        await waitEvent("seeked", 3000);
        if (cancelled) return;

        // Many mobile browsers only paint after a real play()
        try {
          const p = v.play();
          if (p) await p;
          if (cancelled) return;
          await confirmPaint();
          if (cancelled) return;
          v.pause();
          try {
            v.currentTime = MARKS.start;
          } catch {
            /* ignore */
          }
          if (!cancelled) markReady();
        } catch {
          // Autoplay blocked — still stays on top; ready on first user-driven play
        }
      } catch {
        /* keep still visible */
      }
    };

    void unlockFrame();

    const onPlaying = () => markReady();
    const onLoadedData = () => {
      // Only mark ready if we already have dimensions (a real frame exists)
      if (v.videoWidth > 0 && v.readyState >= 2) {
        // Still need a paint on some iOS versions — try silently
        void (async () => {
          try {
            const p = v.play();
            if (p) await p;
            v.pause();
            try {
              v.currentTime = MARKS.start;
            } catch {
              /* ignore */
            }
            markReady();
          } catch {
            /* ignore */
          }
        })();
      }
    };

    v.addEventListener("playing", onPlaying);
    v.addEventListener("loadeddata", onLoadedData);

    return () => {
      cancelled = true;
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("loadeddata", onLoadedData);
    };
  }, [reduce, markReady]);

  // Still image for current beat (instant, no black gap)
  const stillIndex =
    currentTime >= VIDEO_MARKS.plan3 - 0.05
      ? 2
      : currentTime >= VIDEO_MARKS.plan2 - 0.05
        ? 1
        : phase >= 2
          ? 2
          : phase >= 1
            ? 1
            : 0;
  const stillSrc = STILLS[stillIndex] ?? STILLS[0];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#1e1e1e]"
      aria-hidden="true"
    >
      {/* Always-on still — never a blank screen on mobile */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={stillSrc}
        src={stillSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        fetchPriority="high"
      />

      {/* Fallback photo if plan stills fail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/cof.jpg"
        alt=""
        className="absolute inset-0 -z-[1] h-full w-full object-cover"
        decoding="async"
      />

      {!reduce && (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            frameReady ? "opacity-100" : "opacity-0"
          }`}
          src="/media/cofe-scrub.mp4"
          muted
          playsInline
          preload="auto"
          // Keep transparent so any unpainted frame doesn't paint black over stills
          style={{ backgroundColor: "transparent" }}
        />
      )}

      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/45" />
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useVideoStory, MARKS } from "./video-story-context";

/**
 * Mobile-safe background:
 * - Instant frame from the real video (video-start.jpg = exact start mark)
 * - Live video crossfades in as soon as a painted frame is available
 * - Never leaves a blank/black screen while the file buffers
 */
export function VideoBackground() {
  const { registerVideo, playing } = useVideoStory();
  const ref = useRef<HTMLVideoElement>(null);
  const [live, setLive] = useState(false);
  const liveRef = useRef(false);

  const goLive = useCallback(() => {
    if (liveRef.current) return;
    liveRef.current = true;
    setLive(true);
  }, []);

  useEffect(() => {
    registerVideo(ref.current);
    return () => registerVideo(null);
  }, [registerVideo]);

  // Story segment started → video is definitely painting
  useEffect(() => {
    if (playing) goLive();
  }, [playing, goLive]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let cancelled = false;

    const wait = (type: string, ms = 4000) =>
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

    const unlock = async () => {
      try {
        v.muted = true;
        v.defaultMuted = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "true");
        v.setAttribute("webkit-playsinline", "true");
        v.preload = "auto";

        // Start network immediately
        try {
          v.load();
        } catch {
          /* ignore */
        }

        if (v.readyState < 1) await wait("loadedmetadata");
        if (cancelled) return;

        try {
          v.currentTime = MARKS.start;
        } catch {
          /* ignore */
        }
        await wait("seeked", 2500);
        if (cancelled) return;

        // iOS/Android: only paint after a real play()
        try {
          const p = v.play();
          if (p) await p;
          if (cancelled) return;

          // Wait one painted frame if supported
          const anyV = v as HTMLVideoElement & {
            requestVideoFrameCallback?: (cb: () => void) => number;
          };
          if (typeof anyV.requestVideoFrameCallback === "function") {
            await new Promise<void>((resolve) => {
              anyV.requestVideoFrameCallback!(() => resolve());
              window.setTimeout(resolve, 600);
            });
          } else {
            await new Promise((r) => requestAnimationFrame(() => r(undefined)));
          }

          v.pause();
          try {
            v.currentTime = MARKS.start;
          } catch {
            /* ignore */
          }
          if (!cancelled) goLive();
        } catch {
          // Autoplay blocked: stay on start poster until user swipes (play)
          // still try to show video when enough data is buffered
          if (v.readyState >= 2 && !cancelled) goLive();
        }
      } catch {
        /* poster remains */
      }
    };

    void unlock();

    const onPlaying = () => goLive();
    const onCanPlay = () => {
      // If we already painted via unlock, fine; else reveal when buffered
      if (v.readyState >= 3) goLive();
    };

    v.addEventListener("playing", onPlaying);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("canplaythrough", onCanPlay);

    return () => {
      cancelled = true;
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("canplaythrough", onCanPlay);
    };
  }, [goLive]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#1e1e1e]"
      aria-hidden="true"
    >
      {/* Exact start frame of the scrub video — shows instantly on mobile */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/video-start.jpg"
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          live ? "opacity-0" : "opacity-100"
        }`}
        decoding="async"
        fetchPriority="high"
      />

      <video
        ref={ref}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          live ? "opacity-100" : "opacity-0"
        }`}
        src="/media/cofe-scrub.mp4"
        muted
        playsInline
        preload="auto"
        // poster as attribute helps Safari before JS runs
        poster="/media/video-start.jpg"
      />

      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/45" />
    </div>
  );
}

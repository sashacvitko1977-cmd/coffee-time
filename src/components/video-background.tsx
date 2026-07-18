"use client";

import { useEffect, useRef } from "react";
import { useVideoStory, MARKS } from "./video-story-context";

/**
 * Fixed background video for the story page.
 * Only the scrub video — no extra stills that don't match the current frame.
 */
export function VideoBackground() {
  const { reduce, registerVideo } = useVideoStory();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    registerVideo(ref.current);
    return () => registerVideo(null);
  }, [registerVideo]);

  // Unlock a painted frame on mobile (muted play → pause at story start)
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

    const unlockFrame = async () => {
      try {
        v.muted = true;
        v.defaultMuted = true;
        v.playsInline = true;
        v.setAttribute("playsinline", "");
        v.setAttribute("webkit-playsinline", "");
        v.preload = "auto";

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

        try {
          const p = v.play();
          if (p) await p;
          if (cancelled) return;
          v.pause();
          try {
            v.currentTime = MARKS.start;
          } catch {
            /* ignore */
          }
        } catch {
          /* autoplay blocked — first user swipe will paint */
        }
      } catch {
        /* ignore */
      }
    };

    void unlockFrame();
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#1e1e1e]"
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
          muted
          playsInline
          preload="auto"
        />
      )}

      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/45" />
    </div>
  );
}

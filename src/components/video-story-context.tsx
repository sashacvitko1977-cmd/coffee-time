"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";

export const VIDEO_MARKS = {
  plan1: 0.9,
  plan2: 4.2,
  plan3: 8.8,
  end: 9.9,
} as const;

export const MARKS = {
  start: VIDEO_MARKS.plan1,
  milk: VIDEO_MARKS.plan2,
  girl: VIDEO_MARKS.plan3,
} as const;

type Phase = 0 | 1 | 2;

type VideoStoryContextValue = {
  phase: Phase;
  playing: boolean;
  currentTime: number;
  reduce: boolean | null;
  playTo: (time: number) => Promise<void>;
  seekTo: (time: number) => void;
  setPhase: (p: Phase) => void;
  registerVideo: (el: HTMLVideoElement | null) => void;
};

const VideoStoryContext = createContext<VideoStoryContextValue | null>(null);

export function VideoStoryProvider({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playingRef = useRef(false);
  const queueRef = useRef<Promise<void>>(Promise.resolve());
  const [phase, setPhase] = useState<Phase>(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(VIDEO_MARKS.plan1);

  const registerVideo = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) {
      el.pause();
      const setStart = () => {
        try {
          el.currentTime = VIDEO_MARKS.plan1;
          setCurrentTime(VIDEO_MARKS.plan1);
        } catch {
          /* ignore */
        }
      };
      if (el.readyState >= 1) setStart();
      else el.addEventListener("loadedmetadata", setStart, { once: true });
    }
  }, []);

  // Smooth clock for UI fades tied to video time
  useEffect(() => {
    let id = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && Number.isFinite(v.currentTime)) {
        setCurrentTime(v.currentTime);
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const seekTo = useCallback((time: number) => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.pause();
      const t = Math.max(0, Math.min(time, (v.duration || VIDEO_MARKS.end) - 0.05));
      v.currentTime = t;
      setCurrentTime(t);
    } catch {
      /* ignore */
    }
  }, []);

  const playTo = useCallback(
    (time: number) => {
      queueRef.current = queueRef.current.then(async () => {
        const v = videoRef.current;
        if (!v || reduce) {
          seekTo(time);
          return;
        }

        if (v.readyState < 2) {
          await new Promise<void>((resolve) => {
            const done = () => resolve();
            v.addEventListener("canplay", done, { once: true });
            v.addEventListener("loadeddata", done, { once: true });
            window.setTimeout(done, 4000);
          });
        }

        const target = Math.min(time, (v.duration || VIDEO_MARKS.end) - 0.02);

        if (v.currentTime >= target - 0.08) {
          v.pause();
          try {
            v.currentTime = target;
            setCurrentTime(target);
          } catch {
            /* ignore */
          }
          return;
        }

        playingRef.current = true;
        setPlaying(true);
        v.playbackRate = 1;

        // Ease-out window before the stop frame (seconds)
        const EASE_LEN = 0.85;

        await new Promise<void>((resolve) => {
          let settled = false;
          let raf = 0;

          const finish = () => {
            if (settled) return;
            settled = true;
            cancelAnimationFrame(raf);
            v.pause();
            v.playbackRate = 1;
            try {
              v.currentTime = target;
              setCurrentTime(target);
            } catch {
              /* ignore */
            }
            v.removeEventListener("ended", onEnded);
            playingRef.current = false;
            setPlaying(false);
            resolve();
          };

          const onEnded = () => finish();

          const tick = () => {
            if (settled) return;
            const t = v.currentTime;
            setCurrentTime(t);
            const remaining = target - t;

            if (remaining <= 0.02) {
              finish();
              return;
            }

            // Плавное замедление к концу отрезка
            if (remaining < EASE_LEN) {
              const x = remaining / EASE_LEN; // 1 → 0
              // smooth ease-out rate: ~1.0 → ~0.18
              v.playbackRate = 0.18 + 0.82 * (x * x);
            } else {
              v.playbackRate = 1;
            }

            raf = requestAnimationFrame(tick);
          };

          v.addEventListener("ended", onEnded);

          const p = v.play();
          if (p) {
            p.catch(() => finish());
          }
          raf = requestAnimationFrame(tick);

          window.setTimeout(finish, 16000);
        });
      });

      return queueRef.current;
    },
    [reduce, seekTo]
  );

  const value = useMemo(
    () => ({
      phase,
      playing,
      currentTime,
      reduce: reduce ?? false,
      playTo,
      seekTo,
      setPhase,
      registerVideo,
    }),
    [phase, playing, currentTime, reduce, playTo, seekTo, registerVideo]
  );

  return (
    <VideoStoryContext.Provider value={value}>{children}</VideoStoryContext.Provider>
  );
}

export function useVideoStory() {
  const ctx = useContext(VideoStoryContext);
  if (!ctx) throw new Error("useVideoStory must be used within VideoStoryProvider");
  return ctx;
}

/** Smooth 0→1 fade in the last portion of a segment [from, to] */
export function segmentReveal(
  time: number,
  from: number,
  to: number,
  /** start fading at this fraction of the segment (0–1) */
  fadeStart = 0.62
): number {
  const span = Math.max(to - from, 0.001);
  const t = (time - from) / span;
  if (t <= fadeStart) return 0;
  if (t >= 1) return 1;
  const x = (t - fadeStart) / (1 - fadeStart);
  // smoothstep
  return x * x * (3 - 2 * x);
}

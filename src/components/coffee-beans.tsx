"use client";

import { motion, useReducedMotion } from "framer-motion";

const BEANS = [
  { x: "8%", y: "18%", delay: 0, cls: "bean-float", size: 18 },
  { x: "18%", y: "62%", delay: 0.4, cls: "bean-drift", size: 14 },
  { x: "78%", y: "22%", delay: 0.8, cls: "bean-float", size: 16 },
  { x: "88%", y: "58%", delay: 1.2, cls: "bean-drift", size: 20 },
  { x: "52%", y: "12%", delay: 0.2, cls: "bean-float", size: 12 },
  { x: "42%", y: "78%", delay: 1, cls: "bean-drift", size: 15 },
];

function BeanSvg({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 24 32"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="16" rx="9" ry="13" fill="currentColor" opacity="0.85" />
      <path
        d="M12 5c1.2 3.5 1.5 7 0 11s-1.5 7 0 11"
        stroke="#F5F1EB"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function CoffeeBeans() {
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BEANS.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute text-coffee/70 dark:text-coffee/50 ${b.cls}`}
          style={{ left: b.x, top: b.y, animationDelay: `${b.delay}s` }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + b.delay * 0.2, duration: 0.6 }}
        >
          <BeanSvg size={b.size} />
        </motion.div>
      ))}
    </div>
  );
}

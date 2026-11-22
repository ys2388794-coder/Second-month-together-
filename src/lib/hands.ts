import { useEffect, useRef, useState } from "react";

/** tiny seeded random so the "hand drawn" wobble is stable between renders */
export function rng(seed: number) {
  let s = (seed * 9301 + 49297) >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** a slightly shaky straight pencil line */
export function wobbleLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  seed: number,
  shake = 1.2
) {
  const r = rng(seed);
  const mx = (x1 + x2) / 2 + (r() - 0.5) * shake * 2;
  const my = (y1 + y2) / 2 + (r() - 0.5) * shake * 2;
  const a = (r() - 0.5) * shake;
  const b = (r() - 0.5) * shake;
  return `M${(x1 + a).toFixed(1)},${(y1 + b).toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(
    1
  )} ${(x2 + b).toFixed(1)},${(y2 + a).toFixed(1)}`;
}

/** an uneven round blob (used for coffee stains) */
export function blobPath(cx: number, cy: number, radius: number, seed: number, points = 14) {
  const r = rng(seed);
  const pts: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const ang = (i / points) * Math.PI * 2;
    const rad = radius * (0.86 + r() * 0.26);
    pts.push([cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad]);
  }
  let d = "";
  for (let i = 0; i < points; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % points];
    const mx = (p0[0] + p1[0]) / 2;
    const my = (p0[1] + p1[1]) / 2;
    d += i === 0 ? `M${mx.toFixed(1)},${my.toFixed(1)}` : "";
    const next = pts[(i + 1) % points];
    const nn = pts[(i + 2) % points];
    const nx = (next[0] + nn[0]) / 2;
    const ny = (next[1] + nn[1]) / 2;
    d += ` Q${next[0].toFixed(1)},${next[1].toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)}`;
  }
  return d + "Z";
}

/** jagged torn paper top edge across a 1200 x 40 box */
export function tornEdgePath(seed: number) {
  const r = rng(seed);
  let d = "M0,40 L0,14";
  let x = 0;
  while (x < 1200) {
    x += 12 + r() * 22;
    d += ` L${Math.min(x, 1200).toFixed(0)},${(4 + r() * 22).toFixed(0)}`;
  }
  return d + " L1200,40 Z";
}

/** fires once when the element scrolls into view */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

import { useId, type CSSProperties, type ReactNode } from "react";
import { blobPath, tornEdgePath, useReveal, wobbleLine } from "../lib/hands";
import { cn } from "../utils/cn";

/* ---------- scroll reveal wrapper ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, seen] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", seen && "in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- hand drawn heart (outline, a little crooked) ---------- */
export function Heart({
  size = 40,
  color = "#8b2e2e",
  className,
  style,
  filled = false,
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  filled?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 41 C12 32 5 25 6.5 16.5 C8 9 17 7 22 14 C23 15.5 24 16.5 24.5 16 C28 8.5 39 8 41 17 C42.5 25.5 33 33 24 41 Z"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : "none"}
        fillOpacity={filled ? 0.18 : 0}
      />
      <path
        d="M11 15 C12 12.5 14.5 11.5 16.5 12"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/* ---------- hand drawn curved arrow ---------- */
export function Arrow({
  className,
  color = "#6b4a3a",
  flip = false,
  style,
}: {
  className?: string;
  color?: string;
  flip?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg
      width="90"
      height="70"
      viewBox="0 0 90 70"
      fill="none"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }}
      aria-hidden="true"
    >
      <path
        d="M6 8 C30 4 62 18 66 52"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M52 44 C58 48 63 54 66 58 C70 52 75 46 80 41"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- scribbled underline ---------- */
export function Scribble({
  className,
  color = "#8b2e2e",
  width = 220,
}: {
  className?: string;
  color?: string;
  width?: number;
}) {
  return (
    <svg
      width={width}
      height="16"
      viewBox="0 0 220 16"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 9 C30 3 55 13 85 7 C115 2 140 13 170 7 C190 4 205 8 217 5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M20 13 C60 9 110 14 160 11 C185 10 200 12 210 11"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/* ---------- coffee stain ring ---------- */
export function CoffeeStain({
  size = 180,
  seed = 1,
  className,
  style,
}: {
  size?: number;
  seed?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const c = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("pointer-events-none absolute", className)}
      style={style}
      aria-hidden="true"
    >
      <path d={blobPath(c, c, c * 0.8, seed)} fill="#8a5a2b" fillOpacity="0.07" />
      <path
        d={blobPath(c, c, c * 0.78, seed)}
        fill="none"
        stroke="#7a4a1f"
        strokeOpacity="0.28"
        strokeWidth="5"
      />
      <path
        d={blobPath(c, c, c * 0.7, seed + 7)}
        fill="none"
        stroke="#7a4a1f"
        strokeOpacity="0.12"
        strokeWidth="2"
      />
      <circle cx={c * 1.72} cy={c * 0.3} r={size * 0.02} fill="#7a4a1f" fillOpacity="0.22" />
      <circle cx={c * 0.32} cy={c * 1.62} r={size * 0.014} fill="#7a4a1f" fillOpacity="0.2" />
    </svg>
  );
}

/* ---------- torn paper divider between sections ---------- */
export function TornEdge({
  from,
  to,
  seed = 3,
}: {
  from: string;
  to: string;
  seed?: number;
}) {
  return (
    <div style={{ backgroundColor: from }} className="relative -mb-px h-8 w-full overflow-hidden md:h-10">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path d={tornEdgePath(seed)} fill={to} />
      </svg>
    </div>
  );
}

/* ---------- rope (twisted strands, solid colours only) ---------- */
export function Rope({
  thickness = 14,
  vertical = false,
  className,
  style,
  tone = "#8b2e2e",
}: {
  thickness?: number;
  vertical?: boolean;
  className?: string;
  style?: CSSProperties;
  tone?: string;
}) {
  const id = useId().replace(/:/g, "");
  const size = Math.max(thickness, 6);
  return (
    <svg
      className={className}
      style={{
        width: vertical ? thickness : "100%",
        height: vertical ? "100%" : thickness,
        display: "block",
        ...style,
      }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width={size * 0.8}
          height={size * 0.8}
          patternUnits="userSpaceOnUse"
          patternTransform={vertical ? "rotate(-28)" : "rotate(62)"}
        >
          <rect width={size * 0.8} height={size * 0.8} fill={tone} />
          <rect width={size * 0.28} height={size * 0.8} fill="#4a1717" opacity="0.75" />
          <rect x={size * 0.42} width={size * 0.1} height={size * 0.8} fill="#c4837a" opacity="0.5" />
        </pattern>
      </defs>
      <rect
        x="0.75"
        y="0.75"
        width={vertical ? Math.max(thickness - 1.5, 1) : "99.4%"}
        height={vertical ? "99.4%" : Math.max(thickness - 1.5, 1)}
        rx={Math.min(thickness / 2.2, 6)}
        fill={`url(#${id})`}
        stroke="#3a1010"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* ---------- little shaky spiral / star scribbles ---------- */
export function Asterisk({
  className,
  size = 28,
  color = "#8b2e2e",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" className={className} fill="none" aria-hidden="true">
      <path d={wobbleLine(15, 3, 15, 27, 11, 1)} stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d={wobbleLine(4, 9, 26, 21, 12, 1)} stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d={wobbleLine(26, 9, 4, 21, 13, 1)} stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- raindrop streaks (Youssef side) ---------- */
export function RainStreaks({ className, color = "#8e979c" }: { className?: string; color?: string }) {
  const lines = [
    [14, 8, 8, 26],
    [44, 20, 38, 40],
    [80, 6, 73, 28],
    [112, 24, 106, 46],
    [150, 10, 143, 34],
    [28, 52, 22, 72],
    [96, 58, 90, 80],
    [136, 60, 130, 84],
  ];
  return (
    <svg width="170" height="100" viewBox="0 0 170 100" className={className} fill="none" aria-hidden="true">
      {lines.map((l, i) => (
        <path key={i} d={wobbleLine(l[0], l[1], l[2], l[3], i + 4, 0.8)} stroke={color} strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

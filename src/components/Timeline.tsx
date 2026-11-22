import type { ReactNode } from "react";
import { rng, wobbleLine } from "../lib/hands";
import { Arrow, CoffeeStain, Heart, Reveal, Rope, Scribble } from "./Doodle";

/* ---------- doodles drawn inside the "photos" ---------- */
function ChatDoodle() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" fill="none" aria-hidden="true">
      <path
        d="M22 22 C22 16 28 14 34 14 H112 C120 14 124 18 124 26 V58 C124 66 120 70 112 70 H62 L40 88 L42 70 H34 C26 70 22 66 22 58 Z"
        stroke="#f5eedd"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M40 34 H104 M40 50 H84" stroke="#f5eedd" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path
        d="M178 66 C178 60 172 58 166 58 H96 C88 58 84 62 84 70 V102 C84 110 88 114 96 114 H146 L164 130 L162 114 H166 C172 114 178 110 178 104 Z"
        stroke="#c98a80"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M100 78 H160 M100 94 H140" stroke="#c98a80" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M150 20 l2 8 l8 2 l-8 2 l-2 8 l-2 -8 l-8 -2 l8 -2 z" stroke="#f5eedd" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function CakeDoodle() {
  const sprinkles = [
    [62, 96, 70, 92],
    [88, 108, 96, 104],
    [120, 94, 128, 99],
    [140, 108, 146, 102],
  ];
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" fill="none" aria-hidden="true">
      <path d="M40 100 H160 V122 C160 126 156 128 152 128 H48 C44 128 40 126 40 122 Z" stroke="#5a3328" strokeWidth="3" strokeLinejoin="round" />
      <path d="M46 100 V82 C46 78 50 76 54 76 H146 C150 76 154 78 154 82 V100" stroke="#5a3328" strokeWidth="3" strokeLinejoin="round" />
      <path d="M46 84 C56 94 62 84 72 92 C82 100 90 86 100 92 C110 98 118 86 128 92 C138 98 146 88 154 86" stroke="#8b2e2e" strokeWidth="3" strokeLinecap="round" />
      {sprinkles.map((s, i) => (
        <path key={i} d={wobbleLine(s[0], s[1], s[2], s[3], i + 30, 0.5)} stroke="#5a3328" strokeWidth="2.4" strokeLinecap="round" />
      ))}
      {[78, 100, 122].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 76 V54`} stroke="#5a3328" strokeWidth="3.2" strokeLinecap="round" />
          <path
            d={`M${x} 52 C${x - 7} 44 ${x - 2} 36 ${x} 30 C${x + 3} 36 ${x + 8} 44 ${x} 52 Z`}
            stroke="#8b2e2e"
            strokeWidth="2.4"
            strokeLinejoin="round"
            fill="#8b2e2e"
            fillOpacity={0.18 + i * 0.05}
          />
        </g>
      ))}
      <path d="M22 30 l1.6 6 l6 1.6 l-6 1.6 l-1.6 6 l-1.6 -6 l-6 -1.6 l6 -1.6 z" stroke="#5a3328" strokeWidth="2" strokeLinejoin="round" />
      <path d="M176 44 l1.4 5 l5 1.4 l-5 1.4 l-1.4 5 l-1.4 -5 l-5 -1.4 l5 -1.4 z" stroke="#5a3328" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function Wave({ color = "#1f3d2b" }: { color?: string }) {
  const r = rng(77);
  const bars = Array.from({ length: 26 }).map((_, i) => 6 + r() * 24 * Math.sin((i / 26) * Math.PI + 0.3));
  return (
    <svg viewBox="0 0 200 40" className="h-9 w-full" fill="none" aria-hidden="true">
      {bars.map((h, i) => (
        <path key={i} d={wobbleLine(6 + i * 7.4, 20 - h / 2, 6 + i * 7.4, 20 + h / 2, i, 0.4)} stroke={color} strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/* ---------- hanging item shell ---------- */
function Hang({
  children,
  rot,
  delay,
  w = 250,
}: {
  children: ReactNode;
  rot: number;
  delay: number;
  w?: number;
}) {
  return (
    <div className="relative shrink-0 pt-[34px]" style={{ width: w }}>
      <div className="peg" style={{ top: 8 }} />
      <div
        className="sway"
        style={{
          ["--r" as string]: `${rot}deg`,
          transform: `rotate(${rot}deg)`,
          animationDelay: `${delay}s`,
          filter: "drop-shadow(2px 5px 4px rgba(60,40,20,.3))",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Polaroid({
  photoBg,
  children,
  date,
  caption,
}: {
  photoBg: string;
  children: ReactNode;
  date: string;
  caption: string;
}) {
  return (
    <div className="grain-paper bg-cream px-3 pb-5 pt-9">
      <div className="h-[150px] w-full p-2" style={{ backgroundColor: photoBg }}>
        {children}
      </div>
      <p className="font-title mt-3 text-4xl font-bold leading-none text-rope">{date}</p>
      <p className="font-hand mt-2 text-[0.95rem] leading-7 text-[#3b2a22]">{caption}</p>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="memories" className="relative overflow-hidden pb-20 pt-16 md:pt-24">
      <CoffeeStain size={200} seed={51} style={{ top: 20, left: -60 }} />
      <CoffeeStain size={140} seed={58} style={{ bottom: 20, right: 30 }} />

      <Reveal className="relative mb-10 px-4 text-center">
        <h2 className="ink-title text-5xl text-[#2b1d17] md:text-7xl">حاجات صغيرة فاكرها</h2>
        <Scribble className="mx-auto mt-1" width={220} />
        <p className="font-hand mt-4 text-sm text-cocoa md:hidden">
          * اسحبي يمين وشمال، الحبل أطول من الشاشة
        </p>
      </Reveal>

      <div className="relative overflow-x-auto overflow-y-hidden pb-10 [scrollbar-width:thin]" dir="rtl">
        <div className="relative mx-auto flex w-max items-start gap-6 px-8 pb-6">
          {/* the rope everything hangs from */}
          <div className="absolute inset-x-0 top-[14px] z-[1]">
            <Rope thickness={12} />
          </div>

          <Hang rot={-2} delay={0}>
            <Polaroid photoBg="#1f3d2b" date="24/9" caption="أول يوم عرفنا فيه بعض">
              <ChatDoodle />
            </Polaroid>
          </Hang>

          <Hang rot={2.4} delay={-1.5} w={262}>
            <div className="grain-paper ruled relative bg-blush px-5 pb-6 pt-9" style={{ clipPath: "polygon(0 0,100% 0,100% 97%,92% 99.5%,84% 97%,74% 99.5%,62% 97.4%,50% 99.6%,38% 97%,26% 99.5%,14% 97%,6% 99.4%,0 97%)" }}>
              <p className="font-title text-4xl font-bold leading-none text-rope">24/10</p>
              <p className="font-hand mt-3 text-[0.95rem] font-semibold leading-7 text-[#3b2a22]">كملنا شهر</p>
              <p className="font-hand mt-3 text-[1rem] font-medium leading-8 text-[#4a3128]">
                هي قالت:
                <span className="mt-1 block bg-cream/90 px-3 py-1 text-[1.02rem] font-semibold text-rope" style={{ transform: "rotate(-1deg)" }}>
                  "نفسي نكمل سوا ونتجوز"
                </span>
              </p>
              <Heart size={34} className="mt-3" filled />
            </div>
          </Hang>

          <Hang rot={-1.6} delay={-3}>
            <Polaroid photoBg="#f2d7d5" date="14/11" caption="عيد ميلادها. عملتلها مفاجأة، وفرحتها كانت أحلى من أي حاجة.">
              <CakeDoodle />
            </Polaroid>
          </Hang>

          <Hang rot={1.8} delay={-4.5} w={262}>
            <div className="grain-paper bg-[#ddbf94] px-5 pb-7 pt-9" style={{ clipPath: "polygon(0 0,100% 0,100% 100%,22px 100%,0 calc(100% - 22px))" }}>
              <p className="font-title text-4xl font-bold leading-none text-[#2b1d17]">كل يوم</p>
              <div className="mt-4 bg-cream/70 px-2 py-1">
                <Wave />
              </div>
              <ul className="font-hand mt-4 space-y-1 text-[0.98rem] font-medium leading-7 text-[#33261f]">
                <li>* ريكوردات</li>
                <li>* أغاني</li>
                <li>* "هتوحشني"</li>
                <li>* "خدي بالك من نفسك"</li>
              </ul>
            </div>
          </Hang>
        </div>
      </div>

      <div className="relative mx-auto mt-2 flex max-w-xl justify-center px-4">
        <Arrow className="hidden rotate-[-20deg] md:block" flip />
        <p className="font-hand px-3 text-lg text-cocoa">والباقي لسه بنكتبه، يوم ورا يوم.</p>
      </div>
    </section>
  );
}

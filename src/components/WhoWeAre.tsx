import type { ReactNode } from "react";
import { rng, wobbleLine } from "../lib/hands";
import { Arrow, Asterisk, CoffeeStain, Heart, RainStreaks, Reveal, Rope, Scribble } from "./Doodle";

/* ---------- tally marks: each stroke = 10 times ---------- */
function Tally({ count, unit = 10, color = "#2b2420" }: { count: number; unit?: number; color?: string }) {
  const full = Math.floor(count / unit);
  const rem = count % unit;
  const total = full + (rem > 0 ? 1 : 0);
  const groups = Math.ceil(total / 5);
  const r = rng(count);

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1" aria-hidden="true">
      {Array.from({ length: groups }).map((_, g) => {
        const strokesInGroup = Math.min(5, total - g * 5);
        const vertical = Math.min(4, strokesInGroup);
        return (
          <svg key={g} width="44" height="42" viewBox="0 0 44 42" fill="none">
            {Array.from({ length: vertical }).map((__, i) => {
              const idx = g * 5 + i;
              const isPartial = rem > 0 && idx === total - 1;
              const h = isPartial ? Math.max(8, 38 * (rem / unit)) : 38;
              const x = 7 + i * 9 + (r() - 0.5) * 1.6;
              return (
                <path
                  key={i}
                  d={wobbleLine(x, 40, x + (r() - 0.5) * 2, 40 - h, idx + count, 1)}
                  stroke={color}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              );
            })}
            {strokesInGroup === 5 && (
              <path
                d={wobbleLine(1, 32, 43, 10, g + count + 99, 1.4)}
                stroke="#8b2e2e"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

const STATS = [
  { word: "بحبك", verb: "اتقالت", n: 605 },
  { word: "كتكوتي", verb: "اتقالت", n: 268 },
  { word: "ريكورد", verb: "اتقال", n: 255 },
  { word: "هنتجوز", verb: "اتقالت", n: 124 },
];

function Item({
  children,
  star = "*",
  quote = false,
  dark = false,
}: {
  children: ReactNode;
  star?: string;
  quote?: boolean;
  dark?: boolean;
}) {
  return (
    <li className="flex gap-3">
      <span className={`font-hand mt-[2px] text-lg ${dark ? "text-[#c98a80]" : "text-rope"}`}>{star}</span>
      {quote ? (
        <span
          className={`font-hand inline-block px-3 py-1 text-[1.02rem] font-semibold md:text-lg ${
            dark ? "bg-pine text-[#f5eedd]" : "bg-cream text-[#5a3a30]"
          }`}
          style={{ transform: "rotate(-1.2deg)" }}
        >
          {children}
        </span>
      ) : (
        <span className="text-[1.02rem] leading-8 md:text-[1.08rem]">{children}</span>
      )}
    </li>
  );
}

export default function WhoWeAre() {
  return (
    <section id="who" className="relative overflow-hidden px-4 pb-24 pt-14 md:pt-20">
      <CoffeeStain size={190} seed={31} style={{ top: 10, left: -50 }} />

      <div className="relative mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center">
          <h2 className="ink-title text-5xl text-[#2b1d17] md:text-7xl">إحنا مين</h2>
          <Scribble className="mx-auto mt-1" width={180} />
          <p className="font-hand mt-4 text-lg text-cocoa">كل واحد فينا زي ما هو، من غير تجميل</p>
        </Reveal>

        <div className="flex flex-col items-center md:flex-row md:items-stretch md:justify-center">
          {/* YOUSSEF */}
          <Reveal className="relative w-full max-w-md md:w-[44%]" delay={50}>
            <div style={{ transform: "rotate(-1.4deg)", filter: "drop-shadow(3px 6px 5px rgba(0,0,0,.35))" }} className="h-full">
              <div className="tape left-1/2 -top-3 -translate-x-1/2 rotate-[-4deg]" style={{ zIndex: 8 }} />
              <div
                className="stitch stitch-lift torn-b1 grain-dark h-full bg-ink px-7 pb-14 pt-10 text-[#e8e2d2]"
                style={{ ["--stitch" as string]: "#3f7a58" }}
              >
                <RainStreaks className="absolute left-3 top-3 opacity-70" />
                <h3 className="font-title relative text-5xl font-bold text-[#f5eedd]">يوسف</h3>
                <p className="font-hand relative mb-5 text-base text-[#9ba3a7]">الليل، والمطر، والسكوت</p>
                <ul className="relative space-y-3">
                  <Item dark>بيحب الشتا والمطر والليل</Item>
                  <Item dark>بيحب الموسيقى والراب</Item>
                  <Item dark>بيحب الريكوردات، وبيحب يهزر ويغلّس عليكي</Item>
                  <Item dark quote star="-">خدي بالك من نفسك</Item>
                  <Item dark>لما بيتضايق بيقول كلام قاسي، وبعدين بيندم</Item>
                  <Item dark>لما بيتضغط بيسكت</Item>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* ROPE between cards */}
          <div className="relative z-10 flex items-center justify-center md:w-[12%]">
            <div className="relative -my-3 h-24 w-4 md:hidden">
              <Rope vertical thickness={16} />
            </div>
            <div className="relative -mx-4 hidden w-full md:block">
              <Rope thickness={16} />
            </div>
            <div
              className="font-hand absolute left-1/2 top-1/2 flex items-center gap-1 bg-cream px-2 py-[2px] text-sm text-rope paper-shadow"
              style={{ transform: "translate(-50%,-50%) rotate(-6deg)" }}
            >
              <Heart size={20} /> <span>&lt;3</span>
            </div>
          </div>

          {/* HAJAR */}
          <Reveal className="relative w-full max-w-md md:w-[44%]" delay={150}>
            <div style={{ transform: "rotate(1.3deg)", filter: "drop-shadow(3px 6px 5px rgba(80,40,30,.28))" }} className="h-full">
              <div className="tape left-1/2 -top-3 -translate-x-1/2 rotate-[5deg]" style={{ zIndex: 8 }} />
              <div
                className="stitch stitch-lift torn-b2 grain-paper h-full bg-blush px-7 pb-14 pt-10 text-[#4a3128]"
                style={{ ["--stitch" as string]: "#8a5e4a" }}
              >
                <Heart size={40} className="absolute left-4 top-4 rotate-[10deg]" />
                <h3 className="font-title relative text-5xl font-bold text-[#5a3328]">هاجر</h3>
                <p className="font-hand relative mb-5 text-base text-[#9a6f60]">القلب الطيب اللي بيقلق</p>
                <ul className="relative space-y-3">
                  <Item>حساسة، وبتقلق بسرعة</Item>
                  <Item>بتعيط من الأغاني</Item>
                  <Item>بتحب تبعت ريكوردات وتغني</Item>
                  <Item>صوتها بيخلي الأغاني أحلى</Item>
                  <Item quote star="-">خد علاج، نام، صلي</Item>
                  <Item>بتخاف من المكالمات عشان بتتوتر، فبتفضل الريكوردات</Item>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* TALLY BOARD */}
        <Reveal className="relative mx-auto mt-20 max-w-3xl">
          <Arrow className="absolute -top-14 left-4 hidden rotate-[-10deg] md:block" />
          <div style={{ filter: "drop-shadow(2px 5px 4px rgba(60,40,20,.28))", transform: "rotate(0.6deg)" }}>
            <div className="tape -top-3 right-10 rotate-[8deg]" />
            <div className="torn-b1 grain-paper ruled bg-paper-dark px-5 pb-12 pt-8 md:px-10">
              <h3 className="font-title mb-1 text-3xl font-bold text-[#2b1d17] md:text-4xl">
                من الشات بتاعنا، بالأرقام الحقيقية
              </h3>
              <p className="font-hand mb-5 text-sm text-cocoa">كل شرطة = 10 مرات، والشرطة القصيرة هي الباقي</p>
              <ul>
                {STATS.map((s) => (
                  <li
                    key={s.word}
                    className="flex flex-col gap-1 py-3 md:flex-row md:items-center md:gap-6"
                  >
                    <div className="shrink-0 md:w-52">
                      <p className="font-hand text-lg font-semibold leading-tight text-[#2b1d17] md:text-xl">
                        "{s.word}" {s.verb}
                      </p>
                      <p className="font-num text-4xl leading-none text-rope">{s.n} <span className="font-hand text-base">مرة</span></p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <Tally count={s.n} />
                    </div>
                  </li>
                ))}
              </ul>
              <Asterisk className="absolute bottom-4 left-5" size={22} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

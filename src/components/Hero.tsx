import { useEffect, useState } from "react";
import { Arrow, Asterisk, CoffeeStain, Heart, Scribble } from "./Doodle";

// 24 September 2026, local midnight
const START = new Date(2026, 8, 24, 0, 0, 0).getTime();

function useSince() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, now - START);
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Slip({
  value,
  label,
  bg,
  fg,
  rot,
  pad = 2,
  tapeSide,
}: {
  value: number;
  label: string;
  bg: string;
  fg: string;
  rot: number;
  pad?: number;
  tapeSide: "l" | "r";
}) {
  return (
    <div
      className="relative"
      style={{ transform: `rotate(${rot}deg)`, filter: "drop-shadow(2px 4px 3px rgba(50,30,10,.28))" }}
    >
      <div className="tape" style={{ top: -12, [tapeSide === "l" ? "left" : "right"]: 10, width: 54, height: 20, transform: `rotate(${tapeSide === "l" ? -8 : 7}deg)` }} />
      <div
        className="torn-b2 grain-paper flex min-h-[116px] flex-col items-center justify-center px-2 pb-4 pt-3 md:min-h-[150px]"
        style={{ backgroundColor: bg, color: fg }}
      >
        <span
          className="font-num text-[3.6rem] leading-none md:text-[5.2rem]"
          style={{ minWidth: `${pad}ch` }}
        >
          {String(value)}
        </span>
        <span className="font-hand mt-1 text-lg font-semibold md:text-xl">{label}</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const t = useSince();

  return (
    <header className="relative overflow-hidden px-5 pb-20 pt-14 md:pt-20">
      <CoffeeStain size={230} seed={4} style={{ top: -50, left: -60 }} />
      <CoffeeStain size={150} seed={9} style={{ bottom: 60, right: -30 }} />
      <CoffeeStain size={110} seed={2} style={{ top: 330, left: "58%" }} />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-hand text-xl text-cocoa md:text-2xl">
          من يوسف، لـ
        </p>

        <div className="relative inline-block">
          <h1 className="ink-title text-[8.5rem] leading-[1.1] text-[#2b1d17] md:text-[14rem]">
            هاجر
          </h1>
          <Scribble className="absolute -bottom-1 left-1/2 w-[75%] -translate-x-1/2" width={300} />
          <Heart size={46} className="absolute -top-1 -left-8 rotate-[-14deg] md:-left-14 md:size-[64px]" />
          <Heart size={28} className="absolute bottom-10 -right-7 rotate-[12deg] md:-right-12" filled />
          <Asterisk className="absolute top-6 -right-4 md:-right-10" size={26} />
        </div>

        <div className="relative mx-auto mt-10 max-w-xl">
          <div className="tape -top-3 right-8 rotate-[6deg]" />
          <div className="torn-b1 grain-paper ruled bg-cream px-6 pb-8 pt-7 paper-shadow" style={{ transform: "rotate(-1.2deg)" }}>
            <p className="font-hand text-[1.18rem] font-medium leading-[2.5rem] text-[#3b2a22] md:text-[1.4rem]">
              ده مش موقع عادي، ده كل اللي معرفتش اقولهولك في الكلام
            </p>
            <p className="font-hand mt-1 text-right text-lg text-rope">- يوسف</p>
          </div>
        </div>

        {/* live counter */}
        <div className="relative mx-auto mt-16 max-w-2xl">
          <div className="stitch bg-cream/80 px-4 pb-8 pt-8 md:px-8" style={{ ["--stitch" as string]: "#6b4a3a" }}>
            <h2 className="font-title text-3xl font-bold text-[#2b1d17] md:text-4xl">
              احنا نعرف بعض بقالنا:
            </h2>
            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 md:gap-4">
              <Slip value={t.days} label="يوم" bg="#1e1e1e" fg="#f5eedd" rot={-2.5} pad={2} tapeSide="r" />
              <Slip value={t.hours} label="ساعة" bg="#f2d7d5" fg="#5a3a30" rot={1.8} tapeSide="l" />
              <Slip value={t.minutes} label="دقيقة" bg="#1f3d2b" fg="#f5eedd" rot={-1.4} tapeSide="r" />
              <Slip value={t.seconds} label="ثانية" bg="#fbf5e6" fg="#8b2e2e" rot={2.6} tapeSide="l" />
            </div>
          </div>

          <div className="mt-6 flex items-start justify-center gap-1 md:justify-start">
            <div className="relative">
              <Arrow className="absolute -top-14 right-[-62px] hidden rotate-[8deg] md:block" flip />
              <p
                className="font-hand inline-block bg-blush px-4 py-2 text-base font-medium text-[#5a3a30] paper-shadow md:text-lg"
                style={{ transform: "rotate(-2deg)" }}
              >
                من يوم 24 / 9 واحنا بنحاول
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

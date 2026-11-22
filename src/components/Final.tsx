import { useMemo, useRef, useState } from "react";
import { rng } from "../lib/hands";
import { Arrow, Asterisk, Heart, Reveal, Scribble } from "./Doodle";

const MESSAGES = [
  "أنا عارف إني غلطت، وعارف إنك زعلانة. بس أنا لسه هنا، ومش رايح في حتة.",
  "صوتك في الريكوردات هو أحلى حاجة في يومي. ارجعي ابعتيلي واحد، أنا مستنيه.",
  "لو قلت كلام وجعك وأنا متضايق، فمكانش قصدي. وأنا بندم عليه أكتر منك.",
  "مفيش حد مكانك يا كتكوتي. ولا نور، ولا يارا، ولا أي حد. انتي، وبس.",
  "خدي بالك من نفسك. اشربي ميه، ونامي كويس، وأنا هنا لو احتاجتيني.",
  "مش باتأخر عشان بحبك أقل. باتأخر عشان الدنيا مزنقاني، وانتي دايما في دماغي.",
  "هنتجوز. مش بقولها وخلاص، أنا فعلا عايز كده، وبفكر فيه كتير.",
  "لو سكتّ، اعرفي إن سكوتي مش بعد عنك. ده تعب بس، وانتي مش السبب.",
  "قلب بابا، سامحيني. هتعلم أرد أسرع وأتكلم أكتر، وأوعدك أحاول بجد.",
  "لسه فاكر أول يوم، ولسه بعدّ الأيام. وكل يوم بحبك أكتر من اللي قبله.",
];

function shuffle(n: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Rain() {
  const drops = useMemo(() => {
    const r = rng(2026);
    return Array.from({ length: 34 }).map((_, i) => ({
      id: i,
      left: r() * 100,
      h: 36 + r() * 56,
      dur: 1.4 + r() * 1.8,
      delay: -r() * 3,
    }));
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="rain-drop"
          style={{ left: `${d.left}%`, height: d.h, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }}
        />
      ))}
    </div>
  );
}

export default function Final() {
  const [msg, setMsg] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const deck = useRef<number[]>([]);
  const last = useRef<number | null>(null);

  const next = () => {
    if (deck.current.length === 0) {
      deck.current = shuffle(MESSAGES.length);
      // don't repeat the previous message right after reshuffling
      if (deck.current[deck.current.length - 1] === last.current && deck.current.length > 1) {
        deck.current.unshift(deck.current.pop() as number);
      }
    }
    const i = deck.current.pop() as number;
    last.current = i;
    setMsg(i);
    setTick((t) => t + 1);
  };

  return (
    <section id="final" className="grain-dark relative overflow-hidden bg-ink px-5 pb-10 pt-20 text-[#f5eedd] md:pt-28">
      <Rain />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="relative inline-block">
            <h2 className="ink-title text-[2.9rem] leading-[1.35] text-[#f5eedd] md:text-[5.4rem]">
              انا لسه هنا،
              <br />
              ولسه بحبك
            </h2>
            <Heart size={44} color="#c4655b" className="absolute -left-5 -top-4 rotate-[-12deg] md:-left-12" />
            <Asterisk className="absolute -right-5 bottom-2 md:-right-12" color="#c4655b" size={30} />
          </div>
          <Scribble className="mx-auto mt-1" color="#c4655b" width={260} />
        </Reveal>

        <Reveal className="relative mt-14" delay={100}>
          <div className="relative inline-block">
            <Arrow className="absolute -right-24 -top-12 hidden md:block" color="#9ba3a7" flip />
            <button
              type="button"
              onClick={next}
              className="font-hand relative cursor-pointer border-0 bg-blush px-8 py-5 text-[1.1rem] font-bold text-[#6b2323] transition-transform hover:-rotate-1 active:scale-95 md:text-[1.3rem]"
              style={{
                clipPath:
                  "polygon(0 4%, 6% 0, 14% 3%, 25% 0, 38% 3%, 52% 0, 66% 3%, 80% 0, 92% 3%, 100% 0, 100% 96%, 93% 100%, 82% 97%, 70% 100%, 55% 97%, 40% 100%, 26% 97%, 12% 100%, 5% 97%, 0 100%)",
                transform: "rotate(-1deg)",
              }}
            >
              لو زعلانة مني، دوسي هنا
            </button>
          </div>
        </Reveal>

        <div className="relative mx-auto mt-12 min-h-[220px] max-w-xl" aria-live="polite">
          {msg === null ? (
            <p className="font-hand text-base text-[#9ba3a7]">- فيه 10 رسايل مستنيينك -</p>
          ) : (
            <div
              key={tick}
              className="pop-in relative mx-auto"
              style={{ ["--r" as string]: `${tick % 2 === 0 ? 1.4 : -1.4}deg`, transform: `rotate(${tick % 2 === 0 ? 1.4 : -1.4}deg)`, filter: "drop-shadow(3px 6px 5px rgba(0,0,0,.5))" }}
            >
              <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
              <div className="torn-b1 grain-paper ruled bg-cream px-6 pb-10 pt-9 text-right">
                <p className="font-hand text-[1.12rem] font-medium leading-[40px] text-[#33261f] md:text-[1.3rem]">
                  {MESSAGES[msg]}
                </p>
                <p className="font-hand mt-1 flex items-center gap-2 text-lg text-rope">
                  - يوسف <Heart size={24} />
                </p>
              </div>
            </div>
          )}
        </div>

        <footer className="relative mt-16 border-t-2 border-dashed border-[#3f3f3f] pb-4 pt-6">
          <p className="font-hand text-sm text-[#9ba3a7] md:text-base">
            اتعمل بحب، مش بالذكاء الاصطناعي - يوسف
          </p>
          <p className="font-hand mt-1 text-xs text-[#6b7378]">&lt;3</p>
        </footer>
      </div>
    </section>
  );
}

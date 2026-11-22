import { useState } from "react";
import { wobbleLine } from "../lib/hand";
import { Asterisk, CoffeeStain, Heart, Reveal, Rope, Scribble } from "./Doodles";

type Promise_ = {
  title: string;
  line: string;
  detail: string;
  kept: boolean;
};

const PROMISES: Promise_[] = [
  {
    title: "مش هنام واحنا زعلانين",
    line: "مهما زعلنا، مبنقفلش قبل ما نصالح بعض.",
    detail:
      "ولا ليلة نمنا فيها وفي قلبنا حاجة من بعض. ده أهم وعد بينا، وأنا فخور إنه لسه ماسك.",
    kept: true,
  },
  {
    title: "هفضل جنبك",
    line: "حتى وأنا ساكت، أنا جنبك.",
    detail:
      "جنبك مش بالكلام بس. جنبك في بالي وفي دعايا، حتى لو الرسايل قليلة.",
    kept: true,
  },
  {
    title: "هفتكر عيد ميلادك واعملك مفاجأة",
    line: "14/11 مكانش يوم عادي، وعمره ما هيبقى.",
    detail:
      "فكرت فيه من بدري، وشفت فرحتك. وعد اتنفذ، وأنا فاكر كل لحظة فيه.",
    kept: true,
  },
  {
    title: "هسمعك للاخر",
    line: "قولي، أنا سامعك، ومش هقاطعك.",
    detail:
      "بسمع لحد آخر كلمة، حتى لو الريكورد عشر دقايق. بالعكس، أنا بحبها طويلة.",
    kept: true,
  },
  {
    title: "هنتكلم كتير زي الاول",
    line: "الكلام قل، بس الحب لأ.",
    detail:
      "المدرسة والضغط سرقوا مننا ريكوردات كتير. هرجع أبعتلك ريكورد كل يوم، حتى لو دقيقة واحدة.",
    kept: false,
  },
  {
    title: "هنظبط نومنا",
    line: "انتي بتنامي بدري وأنا بسهر، وبنفوّت على بعض.",
    detail:
      "نومنا معكوس. هحاول أنام أبكر شوية، وانتي سيبيلي ريكورد الصبح أصحى ألاقيه.",
    kept: false,
  },
  {
    title: "مش هتأخر في الرد",
    line: "لما بتأخر، ده مش معناه إني نسيتك.",
    detail:
      "اللابتوب والواتساب وقفوا معايا كتير. هقولك قبلها لو هتأخر، عشان متقلقيش ومتفتكريش حاجة غلط.",
    kept: false,
  },
  {
    title: "هنبطل غيرة وتفكير زيادة",
    line: "إحنا الاتنين بنفكر زيادة. محتاجين نصدق بعض أكتر.",
    detail:
      "نور، يارا، أي حد... مفيش حد مكانك. وانتي كمان اسأليني بدل ما تفضلي تفكري لوحدك.",
    kept: false,
  },
];

/* ---------- knots ---------- */
function TightKnot() {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" aria-hidden="true">
      <path
        d="M42 14 C62 12 72 28 70 44 C68 62 54 72 40 70 C22 68 12 56 14 40 C16 24 28 15 42 14 Z"
        fill="#8b2e2e"
        stroke="#3a1010"
        strokeWidth="3.5"
      />
      {/* wraps */}
      <path d="M20 26 C34 34 52 46 66 58" stroke="#4a1717" strokeWidth="5" strokeLinecap="round" />
      <path d="M18 40 C32 46 48 58 58 68" stroke="#4a1717" strokeWidth="5" strokeLinecap="round" />
      <path d="M30 17 C46 26 60 36 68 48" stroke="#4a1717" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 24 C36 32 54 44 64 54" stroke="#cc8a80" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      <path d="M32 15 C47 24 60 33 67 44" stroke="#cc8a80" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function LooseKnot() {
  const dark = "#3a1010";
  const rope = "#8b2e2e";
  const strands = [
    "M34 0 C30 18 40 28 36 48",
    "M40 0 C43 16 36 30 42 50",
    "M46 0 C51 14 44 30 46 48",
    "M36 92 C32 108 42 120 36 136",
    "M43 92 C47 106 39 122 45 138",
    "M50 90 C56 104 51 114 56 128",
  ];
  const loops = [
    "M36 48 C12 50 10 80 33 84 C46 86 54 76 49 66",
    "M44 50 C68 52 70 82 47 86 C34 88 29 78 34 68",
  ];
  return (
    <svg width="84" height="142" viewBox="0 0 84 142" fill="none" aria-hidden="true">
      {strands.map((d, i) => (
        <path key={`s${i}`} d={d} stroke={rope} strokeWidth="2.6" strokeLinecap="round" />
      ))}
      {/* frayed ends */}
      {[
        [36, 136, 31, 141],
        [36, 136, 40, 142],
        [45, 138, 42, 143],
        [45, 138, 50, 141],
        [56, 128, 53, 134],
        [56, 128, 60, 133],
      ].map((l, i) => (
        <path key={`f${i}`} d={wobbleLine(l[0], l[1], l[2], l[3], i + 20, 0.6)} stroke={rope} strokeWidth="1.4" strokeLinecap="round" />
      ))}
      {loops.map((d, i) => (
        <g key={`l${i}`}>
          <path d={d} stroke={dark} strokeWidth="7.5" strokeLinecap="round" />
          <path d={d} stroke={rope} strokeWidth="4.2" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

/* ---------- one promise row ---------- */
function Row({ p, index, last }: { p: Promise_; index: number; last: boolean }) {
  const [open, setOpen] = useState(false);
  const [retied, setRetied] = useState(false);
  const tight = p.kept || retied;
  const left = index % 2 === 1; // which side on desktop
  const cardCol = left ? "md:col-start-3" : "md:col-start-1";
  const tilt = index % 2 === 0 ? -0.9 : 1.1;

  return (
    <div className="grid grid-cols-[84px_1fr] md:grid-cols-[1fr_96px_1fr]">
      {/* rope column */}
      <div className="relative col-start-1 row-start-1 md:col-start-2" style={{ minHeight: 170 }}>
        {index === 0 && (
          <div className="absolute left-1/2 top-[-8px] z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#3b3b3b] bg-[#8a8f94]" />
        )}
        {tight ? (
          <Rope
            vertical
            thickness={16}
            className="absolute left-1/2 top-0 h-full -translate-x-1/2"
            style={{ height: "100%" }}
          />
        ) : (
          <>
            <Rope
              vertical
              thickness={6}
              className="absolute left-1/2 top-0 -translate-x-1/2"
              style={{ height: "calc(50% - 62px)" }}
            />
            {!last && (
              <Rope
                vertical
                thickness={6}
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{ height: "calc(50% - 62px)" }}
              />
            )}
          </>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={`${p.title} - ${tight ? "لسه ماسك" : "بيفك مننا"}`}
          className="absolute left-1/2 top-1/2 z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-offset-4 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-rope"
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {tight ? <TightKnot /> : <LooseKnot />}
          </span>
        </button>
      </div>

      {/* card */}
      <div className={`col-start-2 row-start-1 py-5 pr-0 ${cardCol} ${left ? "md:pr-0 md:pl-2" : "md:pl-0 md:pr-2"}`}>
        <div style={{ transform: `rotate(${tilt}deg)`, filter: "drop-shadow(2px 4px 3px rgba(60,40,20,.25))" }}>
          <div
            className="stitch grain-paper px-5 pb-5 pt-5"
            style={{
              backgroundColor: tight ? "#fbf5e6" : "#f1e6cf",
              ["--stitch" as string]: tight ? "#1f3d2b" : "#8b2e2e",
              ["--stitch-style" as string]: tight ? "dashed" : "dotted",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="block w-full cursor-pointer bg-transparent p-0 text-right"
            >
              <h3 className="font-hand text-[1.12rem] font-bold leading-snug text-[#2b1d17] md:text-xl">
                {p.title}
              </h3>
              <p className="font-hand mt-1 text-[0.95rem] leading-7 text-cocoa">"{p.line}"</p>
              <span
                className={`font-hand mt-3 inline-block border-2 px-3 py-1 text-[0.9rem] font-bold leading-snug ${
                  tight ? "border-pine text-pine" : "border-rope text-rope"
                }`}
                style={{ transform: "rotate(-1.5deg)", borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
              >
                {retied && !p.kept
                  ? "اتربط تاني. يلا نمسكه سوا"
                  : p.kept
                  ? "لسه ماسك"
                  : "بيفك مننا، محتاج نربطه تاني"}
              </span>
              <span className="font-hand mr-3 text-xs text-rain">{open ? "- اقفلي" : "* دوسي"}</span>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="mt-4 border-t-2 border-dashed border-[#b9a583] pt-4">
                  <p className="font-hand text-[0.98rem] leading-8 text-[#3b2a22]">{p.detail}</p>
                  {!p.kept && !retied && (
                    <button
                      type="button"
                      onClick={() => setRetied(true)}
                      className="font-hand mt-4 cursor-pointer border-2 border-rope bg-rope px-4 py-2 text-[0.95rem] font-bold text-[#fbf0e6] transition-transform hover:-rotate-1 active:scale-95"
                      style={{ borderRadius: "15px 225px 15px 255px / 225px 15px 255px 15px" }}
                    >
                      اربطه تاني
                    </button>
                  )}
                  {retied && !p.kept && (
                    <p className="font-hand mt-3 text-[0.95rem] font-semibold text-pine">
                      اتربط. بس لازم نفضل نشده كل يوم، سوا.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Promises() {
  return (
    <section id="promises" className="grain-paper relative overflow-hidden bg-paper-dark px-4 pb-20 pt-16 md:pt-24">
      <CoffeeStain size={220} seed={41} style={{ top: 30, right: -80 }} />
      <CoffeeStain size={160} seed={44} style={{ bottom: 220, left: -50 }} />

      <div className="relative mx-auto max-w-4xl">
        <Reveal className="mb-12 text-center">
          <h2 className="ink-title text-5xl text-[#2b1d17] md:text-7xl">الحبل اللي بينا</h2>
          <Scribble className="mx-auto mt-1" width={200} />
          <p className="font-hand mx-auto mt-5 max-w-lg text-[1.02rem] leading-8 text-cocoa">
            كل وعد عقدة في الحبل. اللي ماسك بيبان، واللي بيفك بيبان برضه، ومش هخبي حاجة.
            دوسي على أي عقدة.
          </p>
          <p className="font-hand mt-3 text-sm text-rain">
            * 4 عقد ماسكة جامد - 4 محتاجين نربطهم تاني
          </p>
        </Reveal>

        <div className="relative">
          {PROMISES.map((p, i) => (
            <Row key={p.title} p={p} index={i} last={i === PROMISES.length - 1} />
          ))}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <div
            className="relative max-w-sm bg-blush px-6 py-5 text-center paper-shadow"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[3deg]" />
            <p className="font-hand text-lg font-semibold leading-8 text-[#5a3328]">
              الحبل مبيتقطعش بسهولة. هو بس بيتفك، وبنربطه تاني.
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-rope">
              <Heart size={26} />
              <Asterisk size={18} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

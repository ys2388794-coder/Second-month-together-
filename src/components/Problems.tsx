import { Arrow, Asterisk, Reveal, Scribble } from "./Doodle";

const NOTES = [
  {
    title: "\"م بتحبني\"",
    happened: "لما بتأخر عليكي في الرد، بتحسي إني مبقتش بحبك.",
    learned: "الحقيقة إني كنت مشغول، أو اللابتوب بايظ. مش قلة حب.",
    bg: "#e9d78f",
    rot: -2.4,
    pin: "tape",
  },
  {
    title: "النوم المعكوس",
    happened: "انتي بتنامي بدري وأنا بسهر، فبنفوّت على بعض.",
    learned: "محتاجين ميعاد صغير نتقابل فيه، حتى لو ريكورد قبل النوم.",
    bg: "#f2d7d5",
    rot: 1.8,
    pin: "pin",
  },
  {
    title: "الواتساب على اللابتوب",
    happened: "تحديثات ولاج، ورسايل مبتحملش. وده كبّر خناقات كانت صغيرة.",
    learned: "قبل ما نزعل، نتأكد الأول إن الرسالة وصلت أصلا.",
    bg: "#cfd8bc",
    rot: -1.2,
    pin: "pin",
  },
  {
    title: "الغيرة والتفكير",
    happened: "تفكير زيادة في نور، ويارا، وأي حد تاني.",
    learned: "مفيش حد مكانك. ولما نفكر زيادة، نسأل بدل ما نفترض.",
    bg: "#ddbf94",
    rot: 2.2,
    pin: "tape",
  },
  {
    title: "قلة الكلام",
    happened: "بطلت أتكلم كتير زي الأول، بسبب المدرسة والضغط.",
    learned: "الضغط مش حجة، بس هو السبب. والكلام بيرجع بريكورد صغير.",
    bg: "#f0e8d2",
    rot: -1.8,
    pin: "pin",
  },
];

function Note({ n, i }: { n: (typeof NOTES)[number]; i: number }) {
  return (
    <Reveal className="w-full md:w-[46%] lg:w-[31%]" delay={(i % 3) * 90}>
      <div
        className="sway relative mx-auto max-w-sm"
        style={{ ["--r" as string]: `${n.rot}deg`, transform: `rotate(${n.rot}deg)`, filter: "drop-shadow(3px 6px 5px rgba(0,0,0,.45))", animationDelay: `${i * -1.3}s` }}
      >
        {n.pin === "tape" ? (
          <div className="tape -top-3 left-1/2 -ml-[46px]" style={{ transform: `rotate(${-n.rot * 2}deg)` }} />
        ) : (
          <div className="absolute -top-2 left-1/2 z-10 h-6 w-6 -translate-x-1/2 rounded-full bg-rope" style={{ boxShadow: "2px 3px 0 rgba(0,0,0,.35)" }}>
            <span className="absolute left-[5px] top-[4px] h-[7px] w-[7px] rounded-full bg-[#d98b82]" />
          </div>
        )}
        <div
          className="grain-paper relative px-6 pb-9 pt-9"
          style={{
            backgroundColor: n.bg,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 30px 100%, 0 calc(100% - 30px))",
          }}
        >
          <div
            className="absolute bottom-0 left-0 h-[30px] w-[30px]"
            style={{ background: "rgba(60,40,20,.2)", clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
          />
          <div className="flex items-start gap-3">
            <span className="font-num mt-[-6px] text-5xl leading-none text-rope">{i + 1}</span>
            <h3 className="font-hand text-[1.2rem] font-bold leading-snug text-[#2b1d17] md:text-[1.3rem]">{n.title}</h3>
          </div>

          <p className="font-hand mt-4 inline-block border-b-2 border-[#2b1d17]/40 text-sm font-semibold text-cocoa">
            اللي حصل
          </p>
          <p className="font-hand mt-2 text-[0.98rem] leading-8 text-[#33261f]">{n.happened}</p>

          <p className="font-hand mt-4 inline-block border-b-2 border-rope/60 text-sm font-semibold text-rope">
            اللي اتعلمناه
          </p>
          <p className="font-hand mt-2 text-[0.98rem] font-medium leading-8 text-[#33261f]">{n.learned}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Problems() {
  return (
    <section id="problems" className="grain-dark relative overflow-hidden bg-pine px-4 pb-24 pt-16 md:pt-24">
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center">
          <h2 className="ink-title text-5xl text-[#f5eedd] md:text-7xl">اللي حصل بينا</h2>
          <Scribble className="mx-auto mt-1" color="#e6d7b4" width={200} />
          <p className="font-hand mx-auto mt-5 max-w-md text-[1.02rem] leading-8 text-[#cdd6c8]">
            مش بكتبهم عشان نلوم بعض. بكتبهم عشان نفهم، ونعدّي منهم سوا.
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-14">
          {NOTES.map((n, i) => (
            <Note key={n.title} n={n} i={i} />
          ))}
        </div>

        <div className="relative mt-16 flex justify-center">
          <Arrow className="absolute -top-6 right-[22%] hidden md:block" color="#e6d7b4" />
          <p className="font-hand flex items-center gap-2 text-xl text-[#f5eedd]">
            <Asterisk size={22} color="#e6d7b4" /> ولا واحدة فيهم أكبر من اللي بينا
          </p>
        </div>
      </div>
    </section>
  );
}

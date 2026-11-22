import type { ReactNode } from "react";
import { blobPath } from "../lib/hands";
import { Asterisk, CoffeeStain, Heart, Reveal } from "./Doodle";

function Panel({
  children,
  tone,
  shade,
  className = "",
}: {
  children: ReactNode;
  tone: string;
  shade?: "top" | "bottom" | "both";
  className?: string;
}) {
  const shadow =
    shade === "top"
      ? "inset 0 10px 8px -8px rgba(90,60,30,.18)"
      : shade === "bottom"
      ? "inset 0 -10px 8px -8px rgba(90,60,30,.18)"
      : shade === "both"
      ? "inset 0 10px 8px -8px rgba(90,60,30,.15), inset 0 -10px 8px -8px rgba(90,60,30,.15)"
      : undefined;
  return (
    <div
      className={`ruled grain-paper relative px-6 pb-0 pt-5 md:px-14 ${className}`}
      style={{ backgroundColor: tone, boxShadow: shadow }}
    >
      {children}
    </div>
  );
}

const P = ({ children }: { children: ReactNode }) => (
  <p className="font-hand mb-[40px] text-[1.02rem] font-normal leading-[40px] text-[#33261f] md:text-[1.2rem]">
    {children}
  </p>
);

export default function Letter() {
  return (
    <section id="letter" className="relative overflow-hidden px-4 py-16 md:py-24">
      <CoffeeStain size={200} seed={13} style={{ top: 40, right: -70 }} />
      <CoffeeStain size={130} seed={21} style={{ bottom: 40, left: -20 }} />

      <Reveal className="relative mx-auto max-w-2xl">
        {/* paper clip */}
        <svg
          width="34"
          height="86"
          viewBox="0 0 34 86"
          className="absolute -top-5 left-8 z-10 rotate-[8deg]"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 70 V20 C10 6 28 6 28 20 V66 C28 80 6 80 6 64 V28"
            stroke="#8a8f94"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{ transform: "rotate(-0.8deg)", filter: "drop-shadow(3px 6px 6px rgba(60,40,20,.28))" }}
        >
          <div className="torn-t">
            {/* panel 1 */}
            <Panel tone="#fbf5e6" shade="bottom" className="pt-9">
              <div className="mb-0 flex min-h-[80px] items-center">
                <h2 className="font-title text-[1.9rem] font-bold leading-[40px] text-[#8b2e2e] md:text-[2.5rem]">
                  قبل اي حاجة، انا اسف
                </h2>
              </div>
              <P>كتكوتي،</P>
              <P>
                أنا عارف إني مبقيتش بتكلم معاكي زي الأول. عارف، وحاسس بيه، والله.
                المدرسة واخداني، واللابتوب بايظ، والضغط كله فوق دماغي. فسكتّ شوية.
              </P>
            </Panel>

            <div className="h-[2px] bg-[#9a8460]/30" />

            {/* panel 2 */}
            <Panel tone="#f6eed8" shade="both">
              <P>
                بس أنا ما سكتّش عشان بطلت أحبك. ولا عمري هبطل.
              </P>
              <P>
                قلب بابا، أنا عارف إنك لما بتأخر في الرد بتحسي إني مبحبكيش. وده
                بيوجعني. بس أنا بحبك. حتى وأنا ساكت، حتى وأنا متأخر.
              </P>
            </Panel>

            <div className="h-[2px] bg-[#9a8460]/30" />

            {/* panel 3 */}
            <Panel tone="#fbf5e6" shade="top" className="pb-6">
              <P>
                وحشتني الريكوردات الطويلة بتاعتنا. وحشني صوتك وانتي بتحكي وبتغني
                في نص الكلام.
              </P>
              <P>ده مش عذر. أنا بس عايزك تعرفي الحقيقة.</P>
              <p className="font-title mb-[40px] text-[2rem] font-bold leading-[40px] text-[#8b2e2e] md:text-[2.4rem]">
                أنا آسف يا شطوري.
              </p>
              <div className="flex items-end justify-between pb-6">
                <div className="flex items-center gap-2">
                  <span className="font-hand text-xl text-cocoa">- يوسف</span>
                  <Heart size={30} />
                </div>
                {/* wax seal */}
                <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true" className="rotate-[-10deg]">
                  <path d={blobPath(42, 42, 36, 5, 12)} fill="#8b2e2e" />
                  <path d={blobPath(42, 42, 27, 8, 12)} fill="none" stroke="#5a1b1b" strokeWidth="2" opacity="0.7" />
                  <text
                    x="42"
                    y="55"
                    textAnchor="middle"
                    fontSize="34"
                    fill="#f5d9cf"
                    style={{ fontFamily: "var(--font-title)" }}
                  >
                    ي
                  </text>
                </svg>
              </div>
            </Panel>
          </div>
        </div>

        <Asterisk className="absolute -bottom-3 -right-2 hidden md:block" size={34} />
      </Reveal>
    </section>
  );
}

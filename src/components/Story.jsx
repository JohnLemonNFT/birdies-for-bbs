import { GrainOverlay } from "../ui/GrainOverlay";
import { GoldLine } from "../ui/GoldLine";
import { Reveal } from "../ui/Reveal";

export function Story() {
  return (
    <section id="story" className="bg-charcoal py-28 sm:py-32 px-7 relative">
      <GrainOverlay />
      <div className="max-w-[900px] mx-auto">
        {/* ── Zone 1: Section Header ── */}
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-[13px] text-gold-dim tracking-[4px]">
              WHY WE FIGHT
            </span>
            <h2 className="font-heading text-[clamp(36px,6vw,56px)] text-cream mt-3 font-light">
              Meet <span className="text-gold font-semibold">Wyatt</span>
            </h2>
            <GoldLine width="40px" className="mt-5" />
          </div>
        </Reveal>

        {/* ── Zone 2: Two-Column — Photo + Diagnosis Only ── */}
        <div className="flex gap-12 items-start flex-wrap">
          <Reveal delay={0.15} className="flex-1 min-w-[260px] basis-[280px]">
            <div className="border border-border p-5 relative">
              {/* Corner accents */}
              {[
                ["top-[-1px]", "left-[-1px]", "border-t border-l"],
                ["top-[-1px]", "right-[-1px]", "border-t border-r"],
                ["bottom-[-1px]", "left-[-1px]", "border-b border-l"],
                ["bottom-[-1px]", "right-[-1px]", "border-b border-r"],
              ].map(([v, h, borders], i) => (
                <div
                  key={i}
                  className={`absolute ${v} ${h} w-4 h-4 ${borders} border-gold`}
                />
              ))}
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-dark to-charcoal flex items-center justify-center">
                <span className="font-body text-sm text-text-dim text-center">
                  Photo of Wyatt
                  <br />
                  <span className="text-xs text-gold-dim">Coming Soon</span>
                </span>
              </div>
            </div>

            {/* Quick facts sidebar */}
            <div className="mt-6 border border-border p-6">
              <h4 className="font-body text-xs text-gold-dim tracking-[3px] mt-0 mb-4">
                WYATT AT A GLANCE
              </h4>
              {[
                ["Born", "October 2020"],
                ["Diagnosis", "BBS1 Gene Mutation"],
                ["Discovered", "20-Week Ultrasound"],
                ["Vision Today", "Stable"],
                ["Loves", "Basketball, Soccer, Hockey, Golf"],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className={`flex justify-between py-2.5 ${
                    i < 4 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="font-body text-sm text-text-dim">
                    {label}
                  </span>
                  <span className="font-body text-sm text-text-main font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25} className="flex-1 min-w-[300px] basis-[420px]">
            <h3 className="font-heading text-2xl text-gold font-semibold mb-6 mt-0">
              The Diagnosis
            </h3>
            <p className="font-heading text-xl text-text-main leading-relaxed mb-6 font-light">
              Our journey with Bardet-Biedl Syndrome began before Wyatt was even
              born. At our twenty-week ultrasound, doctors found something
              unexpected — enlarged, unusually bright kidneys. That discovery led
              to carrier screening, which revealed that both of us carry the BBS1
              gene mutation.
            </p>
            <p className="font-heading text-xl text-text-main leading-relaxed mb-0 font-light">
              When Wyatt arrived in October 2020, he was born with an extra toe
              — a hallmark of BBS called polydactyly. It was surgically removed
              before his first birthday. From the very beginning, we knew his
              road would be different.
            </p>
          </Reveal>
        </div>

        {/* ── Zone 3: Pull-Quote Interlude ── */}
        <Reveal delay={0.1}>
          <div className="mt-20 mb-20 max-w-[680px] mx-auto">
            <div className="border border-border p-10 sm:p-12 relative text-center">
              {/* Corner accents */}
              {[
                ["top-[-1px]", "left-[-1px]", "border-t border-l"],
                ["top-[-1px]", "right-[-1px]", "border-t border-r"],
                ["bottom-[-1px]", "left-[-1px]", "border-b border-l"],
                ["bottom-[-1px]", "right-[-1px]", "border-b border-r"],
              ].map(([v, h, borders], i) => (
                <div
                  key={i}
                  className={`absolute ${v} ${h} w-4 h-4 ${borders} border-gold`}
                />
              ))}
              <p className="font-heading text-[22px] sm:text-[26px] text-cream leading-relaxed italic font-light m-0">
                "People like Wyatt didn't do anything wrong — they were simply
                born with a couple letters different in their genetic code."
              </p>
              <GoldLine width="32px" className="mt-6 mb-4" />
              <p className="font-body text-sm text-gold-dim tracking-[2px] m-0">
                JOSH & BRITTANY VANDEN HEUVEL
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Zone 4: Three Beats as Grid Cards ── */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border mb-20">
            {[
              {
                title: "The Kid",
                body: "If you met Wyatt today, you'd never know any of that. He's five years old and completely unstoppable. He plays basketball, soccer, hockey, and golf — and does everything his big brother does. He works hard in speech and occupational therapy. He lights up every room he walks into. His vision is stable right now. He can see his teammates, chase the ball, line up a putt. Today, he's just a kid being a kid.",
              },
              {
                title: "The Clock",
                body: "BBS is progressive. Most children with this condition reach legal blindness by their teenage years — some by their mid-teens, others hold enough vision to drive into their 30s. Every case is different. But the direction is the same. That's the clock we're racing against. Not someday. Not eventually. Right now — while Wyatt can still see the world around him.",
              },
              {
                title: "The Hope",
                body: "For the first time in history, real therapies are in development. Gene therapy trials are underway that could correct the defective genes causing Wyatt's vision loss. A drug called setmelanotide is already FDA-approved for treating the insatiable hunger and obesity that BBS causes. Science is closer than it's ever been — but research doesn't fund itself.",
              },
            ].map((beat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-charcoal p-8 h-full flex flex-col">
                  <span className="text-gold text-xl mb-3">◆</span>
                  <h3 className="font-heading text-2xl text-gold font-semibold mb-4 mt-0">
                    {beat.title}
                  </h3>
                  <p className="font-heading text-lg text-text-main leading-relaxed font-light m-0">
                    {beat.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* ── Zone 5: Closing Statement ── */}
        <Reveal delay={0.1}>
          <div className="max-w-[640px] mx-auto text-center">
            <GoldLine width="32px" className="mb-8" />
            <p className="font-heading text-xl text-text-main leading-relaxed font-light m-0">
              Every dollar raised at Birdies for BBS goes directly to the
              Bardet-Biedl Syndrome Foundation — funding the research that could
              save Wyatt's sight, and the sight of children like him around the
              world.{" "}
              <span className="text-gold font-semibold italic">
                This is a race with a finish line we can see.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

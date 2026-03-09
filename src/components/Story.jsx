import { GrainOverlay } from "../ui/GrainOverlay";
import { GoldLine } from "../ui/GoldLine";
import { Reveal } from "../ui/Reveal";

export function Story() {
  return (
    <section id="story" className="bg-charcoal py-28 sm:py-32 px-7 relative">
      <GrainOverlay />
      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-[11px] text-gold-dim tracking-[4px]">
              THE STORY
            </span>
            <h2 className="font-heading text-[clamp(36px,6vw,56px)] text-cream mt-3 font-light">
              Meet <span className="text-gold font-semibold">Wyatt</span>
            </h2>
            <GoldLine width="40px" className="mt-5" />
          </div>
        </Reveal>

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
                <span className="font-body text-[13px] text-text-dim text-center">
                  Photo of Wyatt
                  <br />
                  <span className="text-[11px] text-gold-dim">Coming Soon</span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25} className="flex-1 min-w-[300px] basis-[420px]">
            <p className="font-heading text-xl text-text-main leading-relaxed mb-6 font-light">
              Our journey with Bardet-Biedl Syndrome began before Wyatt was
              born. His twenty-week ultrasound revealed enlarged, bright kidneys
              — leading to the discovery that both of us carry the BBS1 gene
              mutation.
            </p>
            <p className="font-heading text-xl text-text-main leading-relaxed mb-6 font-light">
              Wyatt is five now — a happy, unstoppable kid who loves basketball,
              soccer, hockey, and golf. He does everything his big brother does.
              His vision is stable today.
            </p>
            <p className="font-heading text-xl text-text-main leading-relaxed mb-9 font-light">
              But most children with BBS reach legal blindness by their teenage
              years. That's the clock we're racing against.
            </p>

            <div className="border-l-2 border-gold pl-7 mt-8">
              <p className="font-heading text-[22px] text-cream leading-relaxed italic font-light m-0">
                "People like Wyatt didn't do anything wrong — they were simply
                born with a couple letters different in their genetic code."
              </p>
              <p className="font-body text-[12px] text-gold-dim mt-4 mb-0 tracking-[2px]">
                JOSH & BRITTANY VANDEN HEUVEL
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

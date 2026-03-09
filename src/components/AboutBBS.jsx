import { GrainOverlay } from "../ui/GrainOverlay";
import { GoldLine } from "../ui/GoldLine";
import { Reveal } from "../ui/Reveal";

const stats = [
  { num: "1 in 140K", label: "Births Affected" },
  { num: "26+", label: "Known Gene Mutations" },
  { num: "100%", label: "Proceeds to Research" },
  { num: "NOW", label: "Gene Therapy in Trials" },
];

export function AboutBBS() {
  return (
    <section className="bg-black py-28 sm:py-32 px-7 relative">
      <GrainOverlay />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #2A2A2A, transparent)",
        }}
      />

      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-[11px] text-gold-dim tracking-[4px]">
              THE CAUSE
            </span>
            <h2 className="font-heading text-[clamp(36px,6vw,52px)] text-cream mt-3 font-light">
              Bardet-Biedl Syndrome
            </h2>
            <GoldLine width="40px" className="mt-5 mb-5" />
            <p className="font-body text-sm text-text-dim max-w-[480px] mx-auto leading-relaxed">
              A rare genetic disorder causing progressive vision loss, obesity,
              and kidney dysfunction. Therapies are in development — but funding
              is the bottleneck.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-black py-10 px-5 text-center">
                <div className="font-heading text-3xl sm:text-4xl text-gold font-semibold mb-2">
                  {s.num}
                </div>
                <div className="font-body text-[11px] text-text-dim tracking-[2px]">
                  {s.label.toUpperCase()}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="text-center mt-12">
            <p className="font-heading text-xl text-text-main italic font-light">
              Funding drives research. Research drives clinical trials. Clinical
              trials lead to therapies.
            </p>
            <a
              href="https://www.bardetbiedl.org/what-is-bbs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-gold-dim font-body text-[12px] no-underline tracking-[2px] border-b border-gold-dim pb-0.5 hover:text-gold hover:border-gold transition-colors"
            >
              LEARN MORE
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

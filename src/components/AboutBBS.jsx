import { GrainOverlay } from "../ui/GrainOverlay";
import { GoldLine } from "../ui/GoldLine";
import { Reveal } from "../ui/Reveal";

const stats = [
  { num: "1 in 250K", label: "People Worldwide" },
  { num: "~3,000", label: "Cases in US & Canada" },
  { num: "20+", label: "Known Gene Mutations" },
  { num: "0", label: "Cures — For Now" },
];

const symptoms = [
  {
    name: "Progressive Vision Loss",
    desc: "Retinal degeneration that typically leads to legal blindness by the teenage years. The central challenge of BBS.",
  },
  {
    name: "Genetic Obesity",
    desc: "Early-onset obesity often appearing by age one, accompanied by insatiable hunger that is neurological — not behavioral.",
  },
  {
    name: "Polydactyly",
    desc: "Extra fingers or toes present at birth. Often the first visible sign that leads to diagnosis.",
  },
  {
    name: "Kidney Dysfunction",
    desc: "Kidney malformations that can range from mild to requiring lifelong monitoring and intervention.",
  },
  {
    name: "Learning Disabilities",
    desc: "Cognitive impacts vary widely — some experience significant delays, while others test above normal on IQ assessments.",
  },
  {
    name: "Additional Challenges",
    desc: "Speech disorders, developmental delays, dental anomalies, thyroid issues, and behavioral difficulties can all be part of BBS.",
  },
];

const therapies = [
  {
    name: "Gene Therapy",
    desc: "Correcting the defective BBS genes in existing cells. Clinical trials are underway — including AXV-101 at Mayo Clinic, specifically targeting BBS1 retinal degeneration.",
    status: "IN CLINICAL TRIALS",
  },
  {
    name: "Setmelanotide (IMCIVREE)",
    desc: "The first and only FDA-approved treatment for BBS. Made by Rhythm Pharmaceuticals, it targets the insatiable hunger and obesity caused by BBS.",
    status: "FDA APPROVED",
  },
  {
    name: "Stem Cell Therapy",
    desc: "Delivering healthy cells without defective BBS genes to replace damaged ones. An emerging research frontier.",
    status: "IN RESEARCH",
  },
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
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-[13px] text-gold-dim tracking-[4px]">
              THE CAUSE
            </span>
            <h2 className="font-heading text-[clamp(36px,6vw,52px)] text-cream mt-3 font-light">
              What is <span className="text-gold font-semibold">BBS</span>?
            </h2>
            <GoldLine width="40px" className="mt-5 mb-5" />
            <p className="font-body text-base text-text-dim max-w-[540px] mx-auto leading-relaxed">
              Bardet-Biedl Syndrome is a rare genetic ciliopathy — a disease of
              the tiny cellular structures called cilia that are essential for
              cell-to-cell communication. When these malfunction, nearly every
              system in the body is affected.
            </p>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border mb-16">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-black py-10 px-5 text-center">
                <div className="font-heading text-3xl sm:text-4xl text-gold font-semibold mb-2">
                  {s.num}
                </div>
                <div className="font-body text-xs text-text-dim tracking-[2px]">
                  {s.label.toUpperCase()}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Symptoms */}
        <Reveal>
          <div className="mb-16">
            <h3 className="font-body text-[13px] text-gold-dim tracking-[4px] text-center mb-10">
              HOW BBS AFFECTS THE BODY
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
              {symptoms.map((s, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="bg-black p-8">
                    <div className="font-heading text-lg text-cream font-semibold mb-2">
                      {s.name}
                    </div>
                    <p className="font-body text-base text-text-dim leading-relaxed m-0">
                      {s.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Variability callout */}
        <Reveal>
          <div className="border border-border p-8 sm:p-10 mb-16 text-center">
            <p className="font-heading text-xl text-text-main italic font-light leading-relaxed m-0">
              "Some people with BBS lose most of their vision by their
              mid-teens. Others have maintained enough vision to drive into
              their 30s."
            </p>
            <p className="font-body text-base text-text-dim mt-4 mb-0">
              Every case is different. But for every child with BBS, the window
              to act is closing.
            </p>
          </div>
        </Reveal>

        {/* Therapies */}
        <Reveal>
          <div className="text-center mb-10">
            <h3 className="font-body text-[13px] text-gold-dim tracking-[4px]">
              THE SCIENCE IS CLOSER THAN EVER
            </h3>
            <h2 className="font-heading text-[clamp(28px,5vw,40px)] text-cream mt-3 font-light">
              Real Therapies.{" "}
              <span className="text-gold font-semibold">Real Progress.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border mb-12">
          {therapies.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-black p-8 h-full flex flex-col">
                <span
                  className={`font-body text-xs tracking-[2px] mb-3 ${
                    t.status === "FDA APPROVED"
                      ? "text-emerald-light"
                      : t.status === "IN CLINICAL TRIALS"
                      ? "text-gold"
                      : "text-text-dim"
                  }`}
                >
                  {t.status}
                </span>
                <div className="font-heading text-xl text-cream font-semibold mb-3">
                  {t.name}
                </div>
                <p className="font-body text-base text-text-dim leading-relaxed m-0">
                  {t.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.3}>
          <div className="text-center">
            <p className="font-heading text-xl text-text-main italic font-light mb-6">
              Funding drives research. Research drives clinical trials. Clinical
              trials lead to therapies that save children's sight.
            </p>
            <a
              href="https://www.bardetbiedl.org/what-is-bbs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-gold-dim font-body text-sm no-underline tracking-[2px] border-b border-gold-dim pb-0.5 hover:text-gold hover:border-gold transition-colors"
            >
              LEARN MORE AT BARDETBIEDL.ORG
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

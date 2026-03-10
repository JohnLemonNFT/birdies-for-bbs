import { GrainOverlay } from "../ui/GrainOverlay";
import { GoldLine } from "../ui/GoldLine";
import { Reveal } from "../ui/Reveal";
import { tiers } from "../data/tiers";

const accentColors = {
  gold: { text: "text-gold", dot: "text-gold", border: "border-gold", hoverBg: "hover:bg-gold", hoverText: "hover:text-black" },
  "emerald-light": { text: "text-emerald-light", dot: "text-emerald-light", border: "border-border", hoverBg: "hover:bg-border", hoverText: "hover:text-black" },
  "text-dim": { text: "text-text-dim", dot: "text-text-dim", border: "border-border", hoverBg: "hover:bg-border", hoverText: "hover:text-black" },
};

export function Sponsors() {
  return (
    <section id="sponsors" className="bg-black py-28 sm:py-32 px-7 relative">
      <GrainOverlay />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #2A2A2A, transparent)",
        }}
      />

      <div className="max-w-[1000px] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-[13px] text-gold-dim tracking-[4px]">
              PARTNERSHIPS
            </span>
            <h2 className="font-heading text-[clamp(36px,6vw,52px)] text-cream mt-3 font-light">
              Sponsorship{" "}
              <span className="text-gold font-semibold">Opportunities</span>
            </h2>
            <GoldLine width="40px" className="mt-5 mb-5" />
            <p className="font-body text-base text-text-dim max-w-[520px] mx-auto leading-relaxed">
              Align your brand with a cause that matters. Every dollar goes
              directly to BBS research. Your visibility reaches 100+ golfers and
              their networks.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-border">
          {tiers.map((tier, i) => {
            const colors = accentColors[tier.accent];
            const isTitle = i === 0;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className={`bg-black p-7 sm:p-9 h-full flex flex-col hover:bg-dark transition-colors ${
                    isTitle ? "border-t-2 border-gold" : ""
                  }`}
                >
                  {tier.tag && (
                    <span className="font-body text-sm text-gold tracking-[3px] mb-3">
                      {tier.tag}
                    </span>
                  )}
                  <div className="font-heading text-2xl text-cream font-normal mb-1">
                    {tier.name}
                  </div>
                  <div className={`font-heading text-4xl ${colors.text} font-semibold mb-6`}>
                    {tier.price}
                  </div>
                  <div className="flex-1">
                    {tier.features.map((f, j) => (
                      <div
                        key={j}
                        className="font-body text-base text-text-dim py-1.5 flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className={`${colors.dot} text-[6px] mt-[7px]`}>
                          &#9670;
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <a
                    href={`mailto:joshvandenheuvel@email.com?subject=${encodeURIComponent(
                      tier.name + " — Birdies for BBS"
                    )}`}
                    className={`block text-center mt-6 py-3 px-5 border ${
                      isTitle
                        ? "border-gold text-gold hover:bg-gold hover:text-black"
                        : "border-border text-text-dim hover:bg-border hover:text-black"
                    } font-body font-medium text-xs tracking-[2px] no-underline transition-all`}
                  >
                    INQUIRE
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

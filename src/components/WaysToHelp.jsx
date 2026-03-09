import { GrainOverlay } from "../ui/GrainOverlay";
import { GoldLine } from "../ui/GoldLine";
import { Reveal } from "../ui/Reveal";

const REGISTER_URL = "https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs";

const ways = [
  {
    label: "PLAY",
    desc: "Register a foursome. Scramble format — all skill levels.",
    link: REGISTER_URL,
  },
  {
    label: "SPONSOR",
    desc: "Put your brand alongside a powerful cause.",
    link: "#sponsors",
  },
  {
    label: "DONATE",
    desc: "Can't attend? Every dollar still funds the cure.",
    link: REGISTER_URL,
  },
  {
    label: "SHARE",
    desc: "Amplify the mission. Use #BirdiesForBBS.",
    link: "#",
  },
];

export function WaysToHelp() {
  return (
    <section className="bg-charcoal py-28 sm:py-32 px-7 relative">
      <GrainOverlay />
      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-[11px] text-gold-dim tracking-[4px]">
              GET INVOLVED
            </span>
            <h2 className="font-heading text-[clamp(36px,6vw,52px)] text-cream mt-3 font-light">
              Every Role{" "}
              <span className="text-gold font-semibold">Matters</span>
            </h2>
            <GoldLine width="40px" className="mt-5" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {ways.map((w, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <a
                href={w.link}
                target={w.link.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex flex-col justify-center bg-charcoal py-11 px-7 text-center no-underline h-full hover:bg-dark transition-colors"
              >
                <div className="font-heading text-[28px] text-gold font-semibold mb-3">
                  {w.label}
                </div>
                <p className="font-body text-[13px] text-text-dim leading-relaxed m-0">
                  {w.desc}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

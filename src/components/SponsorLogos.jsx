import { sponsors } from "../data/sponsors";
import { GoldLine } from "../ui/GoldLine";
import { Reveal } from "../ui/Reveal";

export function SponsorLogos() {
  if (sponsors.length === 0) return null;

  return (
    <section className="bg-black py-20 px-7 relative">
      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="font-body text-sm text-gold-dim tracking-[4px]">
              OUR SPONSORS
            </span>
            <GoldLine width="40px" className="mt-4" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {sponsors.map((sponsor, i) => (
              <a
                key={i}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity"
                title={sponsor.name}
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

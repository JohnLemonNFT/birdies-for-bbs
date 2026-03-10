import { GrainOverlay } from "../ui/GrainOverlay";
import { GoldLine } from "../ui/GoldLine";
import { CountdownTimer } from "../ui/CountdownTimer";

const REGISTER_URL = "https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <GrainOverlay />

      {/* Radial glow */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(27,107,58,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(197,165,90,0.27), transparent)",
        }}
      />

      <div className="max-w-[700px] px-7 py-20 text-center relative z-10">
        <div className="mb-8">
          <span className="font-body text-[13px] text-gold-dim tracking-[5px] uppercase">
            The Bardet-Biedl Syndrome Foundation presents
          </span>
        </div>

        <GoldLine width="80px" className="mb-8" />

        <h1 className="font-heading text-[clamp(48px,9vw,96px)] text-cream leading-[0.95] mb-3 font-light tracking-tight">
          Birdies
        </h1>
        <p className="font-body text-[15px] text-gold-dim tracking-[6px] mb-3">
          FOR
        </p>
        <h1 className="font-heading text-[clamp(48px,9vw,96px)] text-gold leading-[0.95] mb-9 font-semibold tracking-tight">
          BBS
        </h1>

        <GoldLine width="40px" className="mb-9" />

        <p className="font-heading text-[22px] text-text-main italic mb-3 font-light leading-relaxed">
          A Charity Golf Invitational
        </p>

        <p className="font-body text-[15px] text-text-dim tracking-[3px] mb-8">
          JUNE 22, 2026 &nbsp;&middot;&nbsp; WRIGHTSTOWN, WI
        </p>

        {/* Countdown timer */}
        <div className="mb-10">
          <CountdownTimer />
        </div>

        <p className="font-body text-base text-text-dim max-w-[480px] mx-auto mb-12 leading-relaxed">
          100% of proceeds fund research for Bardet-Biedl Syndrome — a rare
          genetic disorder causing progressive childhood blindness.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-black px-11 py-4 font-body font-semibold text-sm tracking-[3px] no-underline hover:bg-gold-light transition-all"
          >
            REGISTER
          </a>
          <a
            href="#sponsors"
            className="border border-border text-text-main px-11 py-4 font-body font-medium text-sm tracking-[3px] no-underline hover:border-gold transition-all"
          >
            SPONSOR
          </a>
        </div>
      </div>
    </section>
  );
}

import { GrainOverlay } from "../ui/GrainOverlay";
import { GoldLine } from "../ui/GoldLine";
import { Reveal } from "../ui/Reveal";
import { schedule, includes } from "../data/schedule";

const REGISTER_URL = "https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs";
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2853.7!2d-88.1858!3d44.3295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8803b2a2d2a2d2a3%3A0x1234567890abcdef!2sRoyal%20St.%20Patrick&#39;s%20Golf%20Links!5e0!3m2!1sen!2sus!4v1234567890";

export function EventDetails() {
  return (
    <section id="event" className="bg-charcoal py-28 sm:py-32 px-7 relative">
      <GrainOverlay />
      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-[11px] text-gold-dim tracking-[4px]">
              THE EVENT
            </span>
            <h2 className="font-heading text-[clamp(36px,6vw,56px)] text-cream mt-3 font-light">
              June <span className="text-gold font-semibold">22</span>, 2026
            </h2>
            <GoldLine width="40px" className="mt-5 mb-4" />
            <p className="font-body text-[13px] text-text-dim tracking-[2px]">
              ROYAL ST. PATRICK'S GOLF COURSE &nbsp;&middot;&nbsp; WRIGHTSTOWN, WI
            </p>
          </div>
        </Reveal>

        <div className="flex gap-10 flex-wrap">
          <Reveal delay={0.1} className="flex-1 min-w-[280px] basis-[380px]">
            <div className="border border-border p-10">
              <h3 className="font-body text-[12px] text-gold-dim tracking-[3px] mt-0 mb-7">
                SCHEDULE
              </h3>
              {schedule.map(([time, event], i) => (
                <div
                  key={i}
                  className={`flex justify-between items-baseline py-3.5 ${
                    i < schedule.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="font-heading text-lg text-gold font-semibold min-w-[90px]">
                    {time}
                  </span>
                  <span className="font-body text-sm text-text-main">
                    {event}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="flex-1 min-w-[280px] basis-[380px]">
            <div className="border border-border p-10 mb-6">
              <h3 className="font-body text-[12px] text-gold-dim tracking-[3px] mt-0 mb-7">
                INCLUDED
              </h3>
              {includes.map((item, i) => (
                <div
                  key={i}
                  className={`font-body text-sm text-text-main py-2.5 flex items-center gap-3 ${
                    i < includes.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="text-gold text-[8px]">&#9670;</span> {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Google Maps */}
        <Reveal delay={0.25}>
          <div className="mt-10 border border-border overflow-hidden">
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="300"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Royal St. Patrick's Golf Course"
            />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="text-center mt-12">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-black py-4 px-14 font-body font-semibold text-[12px] tracking-[3px] no-underline hover:bg-gold-light transition-colors"
            >
              SECURE YOUR FOURSOME
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

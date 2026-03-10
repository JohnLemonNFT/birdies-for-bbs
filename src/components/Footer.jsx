import { GoldLine } from "../ui/GoldLine";

const REGISTER_URL = "https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs";

export function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 px-7 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(197,165,90,0.27), transparent)",
        }}
      />

      <div className="max-w-[900px] mx-auto text-center">
        <div className="font-heading text-[28px] text-gold font-semibold tracking-[3px] mb-2">
          BIRDIES FOR BBS
        </div>
        <p className="font-body text-sm text-text-dim tracking-[2px] mb-10">
          SWING FOR SIGHT &nbsp;&middot;&nbsp; DRIVE THE CURE
        </p>

        <GoldLine width="30px" className="mb-10" />

        <div className="flex justify-center gap-10 flex-wrap mb-12">
          <div>
            <div className="font-body text-xs text-gold-dim tracking-[3px] mb-2.5">
              CONTACT
            </div>
            <p className="font-body text-base text-text-dim m-0 leading-relaxed">
              Josh Vanden Heuvel
              <br />
              <a href="tel:9204276504" className="text-gold no-underline">
                920-427-6504
              </a>
            </p>
          </div>
          <div>
            <div className="font-body text-xs text-gold-dim tracking-[3px] mb-2.5">
              LINKS
            </div>
            {[
              ["Register", REGISTER_URL],
              ["BBS Foundation", "https://www.bardetbiedl.org"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-body text-base text-text-dim no-underline py-0.5 hover:text-gold transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
          <div>
            <div className="font-body text-xs text-gold-dim tracking-[3px] mb-2.5">
              VENUE
            </div>
            <p className="font-body text-base text-text-dim m-0 leading-relaxed">
              Royal St. Patrick's
              <br />
              Wrightstown, WI 54180
            </p>
          </div>
        </div>

        {/* Powered by BBS Foundation badge */}
        <div className="mb-8">
          <a
            href="https://www.bardetbiedl.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-dim font-body text-xs tracking-[1px] no-underline opacity-70 hover:opacity-90 transition-opacity"
          >
            Powered by the BBS Foundation
          </a>
        </div>

        <div className="border-t border-border pt-6">
          <p className="font-body text-xs text-text-dim opacity-70">
            Bardet-Biedl Syndrome Foundation &middot; 501(c)(3) &middot; PO Box
            663, Unionville, PA 19375
          </p>
        </div>
      </div>
    </footer>
  );
}

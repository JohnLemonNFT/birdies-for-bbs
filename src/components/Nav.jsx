import { useState, useEffect } from "react";

const REGISTER_URL = "https://secure.givelively.org/event/bardet-biedl-syndrome-foundation/2026-birdies-for-bbs";

const links = [
  ["#story", "STORY"],
  ["#event", "EVENT"],
  ["#sponsors", "SPONSORS"],
  ["#contact", "CONTACT"],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-black/94 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-7 flex items-center justify-between h-[70px]">
        <a href="#hero" className="no-underline flex items-center gap-2.5">
          <span className="font-heading text-2xl text-gold font-semibold tracking-[2px]">
            BIRDIES
          </span>
          <span className="font-body text-xs text-text-dim tracking-[3px] mt-0.5">
            FOR BBS
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-2 items-center">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-text-dim no-underline text-xs font-body px-3.5 py-2 tracking-[2px] font-medium hover:text-gold transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gold text-gold px-5 py-2 font-body font-medium text-xs tracking-[2px] no-underline ml-2 hover:bg-gold hover:text-black transition-all"
          >
            REGISTER
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-gold transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-gold transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-gold transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-black/95 backdrop-blur-xl ${
          menuOpen ? "max-h-80 border-b border-border" : "max-h-0"
        }`}
      >
        <div className="px-7 py-6 flex flex-col gap-4">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-text-dim no-underline text-sm font-body tracking-[2px] font-medium hover:text-gold transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gold text-gold px-5 py-3 font-body font-medium text-xs tracking-[2px] no-underline text-center hover:bg-gold hover:text-black transition-all mt-2"
          >
            REGISTER
          </a>
        </div>
      </div>
    </nav>
  );
}

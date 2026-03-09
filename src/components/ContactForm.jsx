import { GrainOverlay } from "../ui/GrainOverlay";
import { GoldLine } from "../ui/GoldLine";
import { Reveal } from "../ui/Reveal";

export function ContactForm() {
  return (
    <section id="contact" className="bg-black py-28 sm:py-32 px-7 relative">
      <GrainOverlay />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #2A2A2A, transparent)",
        }}
      />

      <div className="max-w-[600px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="font-body text-[11px] text-gold-dim tracking-[4px]">
              REACH OUT
            </span>
            <h2 className="font-heading text-[clamp(36px,6vw,52px)] text-cream mt-3 font-light">
              Get in <span className="text-gold font-semibold">Touch</span>
            </h2>
            <GoldLine width="40px" className="mt-5 mb-5" />
            <p className="font-body text-sm text-text-dim max-w-[400px] mx-auto leading-relaxed">
              Questions about sponsorship, registration, or donations? We'd love
              to hear from you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-charcoal border border-border px-5 py-4 font-body text-sm text-text-main placeholder-text-dim outline-none focus:border-gold transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full bg-charcoal border border-border px-5 py-4 font-body text-sm text-text-main placeholder-text-dim outline-none focus:border-gold transition-colors"
              />
            </div>
            <select
              name="interest"
              className="w-full bg-charcoal border border-border px-5 py-4 font-body text-sm text-text-dim outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
            >
              <option value="">I'm interested in...</option>
              <option value="sponsorship">Sponsorship</option>
              <option value="registration">Playing / Registration</option>
              <option value="donation">Making a Donation</option>
              <option value="volunteer">Volunteering</option>
              <option value="other">Something Else</option>
            </select>
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              className="w-full bg-charcoal border border-border px-5 py-4 font-body text-sm text-text-main placeholder-text-dim outline-none focus:border-gold transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-gold text-black py-4 font-body font-semibold text-[12px] tracking-[3px] border-none cursor-pointer hover:bg-gold-light transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

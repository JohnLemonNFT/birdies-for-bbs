import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { AboutBBS } from "./components/AboutBBS";
import { EventDetails } from "./components/EventDetails";
import { Sponsors } from "./components/Sponsors";
import { SponsorLogos } from "./components/SponsorLogos";
import { WaysToHelp } from "./components/WaysToHelp";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import CRM from "./crm/CRM";
import { PlayfulHome } from "./components/playful/PlayfulHome";

function LandingPage() {
  return (
    <div className="bg-black">
      <Nav />
      <Hero />
      <Story />
      <AboutBBS />
      <EventDetails />
      <Sponsors />
      <SponsorLogos />
      <WaysToHelp />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/crm" element={<CRM />} />
      <Route path="/playful" element={<PlayfulHome />} />
    </Routes>
  );
}

import Navbar from "./sections/Navbar";
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import ServicesSection from "./sections/ServicesSection";
import IndustriesSection from "./sections/IndustriesSection";
import ProcessSection from "./sections/ProcessSection";
import PortfolioSection from "./sections/PortfolioSection";
import TechnicalApproachSection from "./sections/TechnicalApproachSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import GlobalPresenceSection from "./sections/GlobalPresenceSection";
import FAQSection from "./sections/FAQSection";
import CTASection from "./sections/CTASection";
import BackToTop from "./sections/BackToTop";
import Footer from "./sections/Footer";
import ButterflyOverlay from "./components/ButterflyOverlay";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        {/* Butterfly follows cursor across all sections below the hero */}
        <ButterflyOverlay />
        <StatsSection />
        <ServicesSection />
        <IndustriesSection />
        <ProcessSection />
        <PortfolioSection />
        <TechnicalApproachSection />
        <TestimonialsSection />
        <GlobalPresenceSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

import Navbar from "./sections/Navbar";
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import ServicesSection from "./sections/ServicesSection";
import ProcessSection from "./sections/ProcessSection";
import PortfolioSection from "./sections/PortfolioSection";
import TechnicalApproachSection from "./sections/TechnicalApproachSection";
import FounderSection from "./sections/FounderSection";
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
        {/* Butterfly follows cursor across all sections below the hero (desktop only) */}
        <ButterflyOverlay />
        <StatsSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <TechnicalApproachSection />
        <FounderSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

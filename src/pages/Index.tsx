import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PromoSlider } from "@/components/PromoSlider";
import { ArtistsSection } from "@/components/ArtistsSection";
import { ReleasesSection } from "@/components/ReleasesSection";
import { EventsSection } from "@/components/EventsSection";
import { DemoSubmitCTA } from "@/components/DemoSubmitCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PromoSlider variant="top" />
        <ArtistsSection />
        <ReleasesSection />
        <EventsSection />
        <PromoSlider variant="bottom" />
        <DemoSubmitCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

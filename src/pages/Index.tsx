import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
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
        <ArtistsSection />
        <ReleasesSection />
        <EventsSection />
        <DemoSubmitCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

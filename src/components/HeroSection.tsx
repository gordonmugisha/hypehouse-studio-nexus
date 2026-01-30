import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/hype-house-logo.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow delay-300" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo animation */}
          <div className="mb-8 animate-float">
            <img
              src={logo}
              alt="Hype House Creative"
              className="h-24 md:h-32 w-auto mx-auto"
            />
          </div>

          {/* Headline */}
          <h1 className="text-display-lg md:text-display-xl mb-6 animate-slide-up">
            <span className="block">Where Sound</span>
            <span className="text-gradient">Meets Vision</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up delay-100">
            A boundary-pushing record label and creative agency crafting the future of music, 
            culture, and artistic expression.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
            <Button variant="hero" size="xl" asChild>
              <Link to="/music" className="group">
                <Play className="h-5 w-5 mr-2" />
                Listen Now
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/submit" className="group">
                Submit Demo
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up delay-300">
            <div>
              <p className="text-display-sm text-gradient">25+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Artists</p>
            </div>
            <div>
              <p className="text-display-sm text-gradient">500K+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Streams</p>
            </div>
            <div>
              <p className="text-display-sm text-gradient">50+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Releases</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

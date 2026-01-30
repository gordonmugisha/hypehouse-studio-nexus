import { Link } from "react-router-dom";
import { ArrowRight, Upload, Music, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DemoSubmitCTA = () => {
  return (
    <section className="py-24 bg-hero relative overflow-hidden noise">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icons */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Music className="h-6 w-6 text-primary" />
            </div>
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
          </div>

          <h2 className="text-display-md md:text-display-lg mb-6">
            Ready to Join the{" "}
            <span className="text-gradient">Movement?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            We're always looking for fresh talent. Submit your demo and let us help 
            take your music to the next level. Our A&R team reviews every submission.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/submit" className="group">
                <Upload className="h-5 w-5 mr-2" />
                Submit Your Demo
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/about" className="group">
                Learn More
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              All genres welcome
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              Response within 2 weeks
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              No upfront fees
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

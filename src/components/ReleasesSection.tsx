import { Link } from "react-router-dom";
import { ArrowRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";

const releases = [
  {
    id: 1,
    title: "Midnight Frequencies",
    artist: "Neon Pulse",
    image: album1,
    releaseDate: "2024",
    type: "EP",
  },
  {
    id: 2,
    title: "City Dreams",
    artist: "Marcus Wave",
    image: album2,
    releaseDate: "2024",
    type: "Single",
  },
  {
    id: 3,
    title: "Wavelength",
    artist: "Serena Gold",
    image: album3,
    releaseDate: "2024",
    type: "Album",
  },
];

export const ReleasesSection = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              New Music
            </p>
            <h2 className="text-display-md">Latest Releases</h2>
          </div>
          <Button variant="ghost" asChild className="mt-4 md:mt-0 group">
            <Link to="/music">
              View All Music
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Releases grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.map((release, index) => (
            <div
              key={release.id}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Album art */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={release.image}
                  alt={release.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="hero"
                    size="icon"
                    className="h-16 w-16 rounded-full"
                    onClick={() => setPlayingId(playingId === release.id ? null : release.id)}
                  >
                    {playingId === release.id ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8 ml-1" />
                    )}
                  </Button>
                </div>

                {/* Type badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-background/80 backdrop-blur-sm rounded-full">
                    {release.type}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {release.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {release.artist} • {release.releaseDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

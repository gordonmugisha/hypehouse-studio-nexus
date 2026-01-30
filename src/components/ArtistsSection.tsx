import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

const artists = [
  {
    id: 1,
    name: "Marcus Wave",
    genre: "Hip-Hop / R&B",
    image: artist1,
    slug: "marcus-wave",
  },
  {
    id: 2,
    name: "Serena Gold",
    genre: "R&B / Soul",
    image: artist2,
    slug: "serena-gold",
  },
  {
    id: 3,
    name: "Neon Pulse",
    genre: "Electronic / Dance",
    image: artist3,
    slug: "neon-pulse",
  },
];

export const ArtistsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              Our Roster
            </p>
            <h2 className="text-display-md">Featured Artists</h2>
          </div>
          <Button variant="ghost" asChild className="mt-4 md:mt-0 group">
            <Link to="/artists">
              View All Artists
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Artists grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artists.map((artist, index) => (
            <Link
              key={artist.id}
              to={`/artists/${artist.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={artist.image}
                alt={artist.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-sm text-primary font-medium uppercase tracking-wider mb-1">
                  {artist.genre}
                </p>
                <h3 className="text-display-sm text-foreground group-hover:text-gradient transition-all">
                  {artist.name}
                </h3>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-lg transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

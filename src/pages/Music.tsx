import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromoSlider } from "@/components/PromoSlider";
import { Button } from "@/components/ui/button";
import { Play, Pause, ExternalLink } from "lucide-react";
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
    tracks: 6,
    streamLink: "#",
  },
  {
    id: 2,
    title: "City Dreams",
    artist: "Marcus Wave",
    image: album2,
    releaseDate: "2024",
    type: "Single",
    tracks: 1,
    streamLink: "#",
  },
  {
    id: 3,
    title: "Wavelength",
    artist: "Serena Gold",
    image: album3,
    releaseDate: "2024",
    type: "Album",
    tracks: 12,
    streamLink: "#",
  },
  {
    id: 4,
    title: "Underground Sessions",
    artist: "DJ Phantom",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80",
    releaseDate: "2024",
    type: "Mixtape",
    tracks: 15,
    streamLink: "#",
  },
  {
    id: 5,
    title: "Echoes",
    artist: "Luna Eclipse",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
    releaseDate: "2023",
    type: "Album",
    tracks: 10,
    streamLink: "#",
  },
  {
    id: 6,
    title: "Street Symphony",
    artist: "The Collective",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    releaseDate: "2023",
    type: "Album",
    tracks: 14,
    streamLink: "#",
  },
];

const playlists = [
  {
    id: 1,
    name: "Hype House Essentials",
    description: "The best of our catalog in one playlist",
    trackCount: 50,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
  },
  {
    id: 2,
    name: "Late Night Vibes",
    description: "Smooth R&B and soulful beats",
    trackCount: 35,
    image: "https://images.unsplash.com/photo-1598387993211-5e4461c7a4f2?w=800&q=80",
  },
  {
    id: 3,
    name: "Club Bangers",
    description: "High energy tracks for the dancefloor",
    trackCount: 40,
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80",
  },
];

const Music = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredReleases = filter === "all" 
    ? releases 
    : releases.filter(r => r.type.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              Listen Now
            </p>
            <h1 className="text-display-lg md:text-display-xl mb-4">Music</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our latest releases, curated playlists, and the full Hype House catalog.
            </p>
          </div>
        </section>

        {/* Top Promo Slider */}
        <PromoSlider variant="top" />

        {/* Filter tabs */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex gap-2 flex-wrap">
              {["all", "album", "ep", "single", "mixtape"].map((type) => (
                <Button
                  key={type}
                  variant={filter === type ? "cta" : "outline"}
                  size="sm"
                  onClick={() => setFilter(type)}
                  className="capitalize"
                >
                  {type === "all" ? "All Releases" : type}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Releases Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-display-sm mb-8">Latest Releases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReleases.map((release, index) => (
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

                    {/* Play overlay */}
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
                    <p className="text-sm text-muted-foreground mb-3">
                      {release.artist} • {release.releaseDate} • {release.tracks} {release.tracks === 1 ? "track" : "tracks"}
                    </p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={release.streamLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Stream Now
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Playlists */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-display-sm mb-8">Curated Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {playlists.map((playlist, index) => (
                <div
                  key={playlist.id}
                  className="group relative overflow-hidden rounded-xl aspect-video animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {playlist.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {playlist.description} • {playlist.trackCount} tracks
                    </p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Promo Slider */}
        <PromoSlider variant="bottom" />
      </main>

      <Footer />
    </div>
  );
};

export default Music;

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromoSlider } from "@/components/PromoSlider";
import { Button } from "@/components/ui/button";
import { Play, Download, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Release {
  id: string;
  title: string;
  artist_name: string;
  cover_url: string | null;
  release_date: string;
  genre: string | null;
  spotify_url: string | null;
  apple_music_url: string | null;
  soundcloud_url: string | null;
  download_url: string | null;
}

const Music = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchReleases = async () => {
      const { data, error } = await supabase
        .from("music_releases")
        .select("*")
        .eq("is_active", true)
        .order("release_date", { ascending: false });

      if (!error && data) {
        setReleases(data);
      }
      setIsLoading(false);
    };

    fetchReleases();
  }, []);

  const genres = ["all", ...Array.from(new Set(releases.map((r) => r.genre).filter(Boolean)))];
  
  const filteredReleases = filter === "all" 
    ? releases 
    : releases.filter((r) => r.genre?.toLowerCase() === filter.toLowerCase());

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
              Explore our latest releases and the full Hype House catalog.
            </p>
          </div>
        </section>

        {/* Top Promo Slider */}
        <PromoSlider variant="top" />

        {/* Filter tabs */}
        {genres.length > 1 && (
          <section className="py-8 border-b border-border">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex gap-2 flex-wrap">
                {genres.map((genre) => (
                  <Button
                    key={genre || "all"}
                    variant={filter === (genre || "all") ? "cta" : "outline"}
                    size="sm"
                    onClick={() => setFilter(genre || "all")}
                    className="capitalize"
                  >
                    {genre === "all" ? "All Releases" : genre}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Releases Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-display-sm mb-8">Latest Releases</h2>
            
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading releases...
              </div>
            ) : filteredReleases.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No music releases available at the moment. Check back soon!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredReleases.map((release, index) => (
                  <div
                    key={release.id}
                    className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Album art */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={release.cover_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"}
                        alt={release.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {release.spotify_url && (
                          <a href={release.spotify_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="hero" size="icon" className="h-12 w-12 rounded-full">
                              <Play className="h-6 w-6" />
                            </Button>
                          </a>
                        )}
                        {release.download_url && (
                          <a href={release.download_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="glass" size="icon" className="h-12 w-12 rounded-full">
                              <Download className="h-6 w-6" />
                            </Button>
                          </a>
                        )}
                      </div>

                      {/* Genre badge */}
                      {release.genre && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-background/80 backdrop-blur-sm rounded-full">
                            {release.genre}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors truncate">
                        {release.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 truncate">
                        {release.artist_name} • {new Date(release.release_date).getFullYear()}
                      </p>
                      
                      <div className="flex gap-2">
                        {release.spotify_url && (
                          <Button variant="outline" size="sm" className="flex-1" asChild>
                            <a href={release.spotify_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Stream
                            </a>
                          </Button>
                        )}
                        {release.download_url && (
                          <Button variant="cta" size="sm" className="flex-1" asChild>
                            <a href={release.download_url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

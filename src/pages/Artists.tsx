import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromoSlider } from "@/components/PromoSlider";
import { supabase } from "@/integrations/supabase/client";

interface Artist {
  id: string;
  name: string;
  slug: string;
  short_bio: string | null;
  image_url: string | null;
  genre: string | null;
}

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("id, name, slug, short_bio, image_url, genre")
        .eq("is_active", true)
        .order("name");

      if (!error && data) {
        setArtists(data);
      }
      setIsLoading(false);
    };

    fetchArtists();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              The Roster
            </p>
            <h1 className="text-display-lg md:text-display-xl mb-4">Our Artists</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the talented artists shaping the sound of Hype House Creative. 
              From chart-topping hits to underground anthems.
            </p>
          </div>
        </section>

        {/* Top Promo Slider */}
        <PromoSlider variant="top" />

        {/* Artists Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading artists...
              </div>
            ) : artists.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No artists available at the moment. Check back soon!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {artists.map((artist, index) => (
                  <Link
                    key={artist.id}
                    to={`/artists/${artist.slug}`}
                    className="group relative overflow-hidden rounded-xl aspect-[3/4] animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image */}
                    <img
                      src={artist.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80"}
                      alt={artist.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                        {artist.genre || "Artist"}
                      </span>
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {artist.name}
                      </h3>
                      <p className="text-sm text-foreground/80 line-clamp-2">
                        {artist.short_bio || "Discover more about this artist"}
                      </p>
                    </div>

                    {/* Hover border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-colors" />
                  </Link>
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

export default Artists;

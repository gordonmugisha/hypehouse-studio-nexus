import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromoSlider } from "@/components/PromoSlider";
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
    bio: "London-born producer and rapper blending soulful samples with hard-hitting beats.",
    monthlyListeners: "2.4M",
  },
  {
    id: 2,
    name: "Serena Gold",
    genre: "R&B / Soul",
    image: artist2,
    slug: "serena-gold",
    bio: "Grammy-nominated vocalist known for powerful ballads and silky smooth runs.",
    monthlyListeners: "3.1M",
  },
  {
    id: 3,
    name: "Neon Pulse",
    genre: "Electronic / Dance",
    image: artist3,
    slug: "neon-pulse",
    bio: "Electronic duo pushing the boundaries of synth-wave and bass music.",
    monthlyListeners: "1.8M",
  },
  {
    id: 4,
    name: "DJ Phantom",
    genre: "House / Techno",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
    slug: "dj-phantom",
    bio: "Underground house DJ turned international headliner.",
    monthlyListeners: "890K",
  },
  {
    id: 5,
    name: "Luna Eclipse",
    genre: "Indie Pop / Alternative",
    image: "https://images.unsplash.com/photo-1534131707746-25d604851a1f?w=800&q=80",
    slug: "luna-eclipse",
    bio: "Ethereal vocals meet atmospheric production in this rising star.",
    monthlyListeners: "1.2M",
  },
  {
    id: 6,
    name: "The Collective",
    genre: "Grime / UK Rap",
    image: "https://images.unsplash.com/photo-1598387993211-5e4461c7a4f2?w=800&q=80",
    slug: "the-collective",
    bio: "Five-piece crew bringing authentic UK street sound to the world stage.",
    monthlyListeners: "2.1M",
  },
];

const Artists = () => {
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
                    src={artist.image}
                    alt={artist.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                      {artist.monthlyListeners} monthly listeners
                    </span>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {artist.genre}
                    </p>
                    <p className="text-sm text-foreground/80 line-clamp-2">
                      {artist.bio}
                    </p>
                  </div>

                  {/* Hover border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-colors" />
                </Link>
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

export default Artists;

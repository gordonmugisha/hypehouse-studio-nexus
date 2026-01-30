import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromoSlider } from "@/components/PromoSlider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, ExternalLink, Calendar, MapPin } from "lucide-react";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

// Mock data - would come from database in production
const artistsData: Record<string, {
  name: string;
  genre: string;
  image: string;
  bio: string;
  fullBio: string;
  monthlyListeners: string;
  socials: { platform: string; url: string }[];
  releases: { id: number; title: string; year: string; type: string; image: string }[];
  upcomingEvents: { id: number; title: string; date: string; location: string }[];
}> = {
  "marcus-wave": {
    name: "Marcus Wave",
    genre: "Hip-Hop / R&B",
    image: artist1,
    bio: "London-born producer and rapper blending soulful samples with hard-hitting beats.",
    fullBio: "Marcus Wave emerged from South London's vibrant music scene in 2019, quickly gaining recognition for his unique fusion of classic hip-hop production with contemporary R&B sensibilities. His debut EP 'City Dreams' caught the attention of Hype House Creative, leading to a signing that has produced multiple chart-topping singles. Known for his introspective lyrics and cinematic sound, Marcus has collaborated with some of the biggest names in UK music.",
    monthlyListeners: "2.4M",
    socials: [
      { platform: "Spotify", url: "#" },
      { platform: "Instagram", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
    releases: [
      { id: 1, title: "City Dreams", year: "2024", type: "Single", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80" },
      { id: 2, title: "Midnight Run", year: "2023", type: "EP", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80" },
      { id: 3, title: "South Side Stories", year: "2022", type: "Album", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&q=80" },
    ],
    upcomingEvents: [
      { id: 1, title: "Hype House Live: Volume III", date: "March 15, 2024", location: "O2 Academy Brixton" },
      { id: 2, title: "UK Festival Tour", date: "June 2024", location: "Multiple Venues" },
    ],
  },
  "serena-gold": {
    name: "Serena Gold",
    genre: "R&B / Soul",
    image: artist2,
    bio: "Grammy-nominated vocalist known for powerful ballads and silky smooth runs.",
    fullBio: "Serena Gold's journey began in a London church choir, where her extraordinary vocal talent first captured attention. Her breakthrough came with the viral hit 'Golden Hour', which amassed over 100 million streams. A Grammy nomination followed, cementing her status as one of the UK's most promising R&B artists. Her upcoming album 'Wavelength' promises to showcase her evolution as both a vocalist and songwriter.",
    monthlyListeners: "3.1M",
    socials: [
      { platform: "Spotify", url: "#" },
      { platform: "Instagram", url: "#" },
      { platform: "TikTok", url: "#" },
    ],
    releases: [
      { id: 1, title: "Wavelength", year: "2024", type: "Album", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80" },
      { id: 2, title: "Golden Hour", year: "2023", type: "Single", image: "https://images.unsplash.com/photo-1598387993211-5e4461c7a4f2?w=400&q=80" },
    ],
    upcomingEvents: [
      { id: 3, title: "Album Release Party", date: "April 5, 2024", location: "Ministry of Sound" },
    ],
  },
  "neon-pulse": {
    name: "Neon Pulse",
    genre: "Electronic / Dance",
    image: artist3,
    bio: "Electronic duo pushing the boundaries of synth-wave and bass music.",
    fullBio: "Neon Pulse consists of producers Jake Turner and Mia Chen, who met at a underground rave in 2018. Their fusion of 80s synth-wave aesthetics with modern bass music production has created a sound that's both nostalgic and futuristic. Their live shows are renowned for stunning visual productions and high-energy performances that have made them festival favorites across Europe.",
    monthlyListeners: "1.8M",
    socials: [
      { platform: "Spotify", url: "#" },
      { platform: "SoundCloud", url: "#" },
      { platform: "Instagram", url: "#" },
    ],
    releases: [
      { id: 1, title: "Midnight Frequencies", year: "2024", type: "EP", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80" },
      { id: 2, title: "Neon Dreams", year: "2023", type: "Album", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&q=80" },
    ],
    upcomingEvents: [
      { id: 4, title: "DJ Set @ Fabric", date: "April 12, 2024", location: "Fabric, London" },
    ],
  },
};

// Default artist data for unknown slugs
const defaultArtist = {
  name: "Artist",
  genre: "Music",
  image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  bio: "Talented artist on the Hype House roster.",
  fullBio: "This artist is part of the Hype House Creative family. Check back soon for more information about their music and upcoming releases.",
  monthlyListeners: "500K",
  socials: [],
  releases: [],
  upcomingEvents: [],
};

const ArtistDetail = () => {
  const { slug } = useParams();
  const artist = slug && artistsData[slug] ? artistsData[slug] : defaultArtist;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 lg:px-8 pb-12">
              <Button variant="ghost" asChild className="mb-6">
                <Link to="/artists">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Artists
                </Link>
              </Button>
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                {artist.monthlyListeners} monthly listeners
              </p>
              <h1 className="text-display-lg md:text-display-xl mb-2">{artist.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{artist.genre}</p>
              <div className="flex flex-wrap gap-3">
                {artist.socials.map((social) => (
                  <Button key={social.platform} variant="outline" size="sm" asChild>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {social.platform}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top Promo Slider */}
        <PromoSlider variant="top" />

        {/* Bio */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-display-sm mb-6">About</h2>
              <p className="text-muted-foreground leading-relaxed">{artist.fullBio}</p>
            </div>
          </div>
        </section>

        {/* Releases */}
        {artist.releases.length > 0 && (
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="text-display-sm mb-8">Discography</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artist.releases.map((release, index) => (
                  <div
                    key={release.id}
                    className="group animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                      <img
                        src={release.image}
                        alt={release.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="hero" size="icon" className="h-12 w-12 rounded-full">
                          <Play className="h-6 w-6 ml-0.5" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {release.type} • {release.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        {artist.upcomingEvents.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="text-display-sm mb-8">Upcoming Shows</h2>
              <div className="space-y-4">
                {artist.upcomingEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.id}`}
                    className="group flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <Button variant="cta" size="sm">Get Tickets</Button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Promo Slider */}
        <PromoSlider variant="bottom" />
      </main>

      <Footer />
    </div>
  );
};

export default ArtistDetail;

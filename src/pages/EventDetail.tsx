import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromoSlider } from "@/components/PromoSlider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Share2, Heart } from "lucide-react";

// Mock data - would come from database in production
const eventsData: Record<string, {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  type: string;
  image: string;
  description: string;
  fullDescription: string;
  capacity: string;
  ticketPrice: string;
  lineup?: string[];
  isPast?: boolean;
}> = {
  "1": {
    title: "Hype House Live: Volume III",
    date: "March 15, 2024",
    time: "8:00 PM - 2:00 AM",
    location: "O2 Academy Brixton",
    address: "211 Stockwell Rd, Brixton, London SW9 9SL",
    type: "Concert",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80",
    description: "An unforgettable night featuring performances from our entire roster.",
    fullDescription: "Join us for the biggest Hype House event of the year. Volume III brings together our complete roster for an unforgettable night of live music, featuring headline sets from Marcus Wave, Serena Gold, and Neon Pulse, plus special guests and surprise collaborations. This is more than a concert—it's a celebration of everything Hype House Creative represents.",
    capacity: "5,000",
    ticketPrice: "£35",
    lineup: ["Marcus Wave", "Serena Gold", "Neon Pulse", "DJ Phantom", "Special Guests"],
  },
  "2": {
    title: "Studio Sessions: Beat Making Workshop",
    date: "March 22, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Hype House Studios",
    address: "45 Shoreditch High St, London E1 6JJ",
    type: "Workshop",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    description: "Learn production techniques from our in-house producers.",
    fullDescription: "Get hands-on experience in our state-of-the-art studios with guidance from the producers behind some of the biggest Hype House hits. This intimate workshop covers beat making fundamentals, sampling techniques, arrangement, and mixing basics. All skill levels welcome—whether you're just starting out or looking to refine your craft.",
    capacity: "30",
    ticketPrice: "£75",
  },
  "3": {
    title: "Serena Gold - Album Release Party",
    date: "April 5, 2024",
    time: "9:00 PM - 3:00 AM",
    location: "Ministry of Sound",
    address: "103 Gaunt St, London SE1 6DP",
    type: "Launch Party",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    description: "Celebrate the launch of 'Wavelength' with an exclusive listening party.",
    fullDescription: "Be the first to experience Serena Gold's highly anticipated album 'Wavelength' in full, followed by a special live performance and DJ sets that will keep the party going until the early hours. This exclusive event includes a first listen of the complete album, meet & greet opportunities, and limited edition merchandise only available on the night.",
    capacity: "1,500",
    ticketPrice: "£25",
    lineup: ["Serena Gold (Live)", "Special Guest DJs"],
  },
  "4": {
    title: "Neon Pulse DJ Set",
    date: "April 12, 2024",
    time: "10:00 PM - 4:00 AM",
    location: "Fabric",
    address: "77A Charterhouse St, London EC1M 6HJ",
    type: "Club Night",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80",
    description: "Extended 3-hour set featuring unreleased tracks.",
    fullDescription: "Neon Pulse takes over Room One at the legendary Fabric for an extended DJ set showcasing their latest productions and unreleased material. Expect a journey through synth-wave, bass music, and everything in between, with full visual production and immersive lighting designed specifically for this one-off performance.",
    capacity: "1,600",
    ticketPrice: "£20",
  },
  "101": {
    title: "Hype House Live: Volume II",
    date: "January 20, 2024",
    location: "Electric Brixton",
    time: "8:00 PM",
    address: "1 Town Hall Parade, Brixton, London SW2 1RJ",
    type: "Concert",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    description: "The second installment of our flagship concert series.",
    fullDescription: "Volume II brought together fans from across the UK for another incredible night of live performances. Featuring headline sets and surprise appearances, this event set the stage for what's to come with Volume III.",
    capacity: "3,000",
    ticketPrice: "Sold Out",
    isPast: true,
  },
};

// Default event data
const defaultEvent = {
  title: "Event",
  date: "TBA",
  time: "TBA",
  location: "TBA",
  address: "",
  type: "Event",
  image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80",
  description: "More details coming soon.",
  fullDescription: "Check back soon for full event details.",
  capacity: "TBA",
  ticketPrice: "TBA",
  lineup: [] as string[],
  isPast: false,
};

const EventDetail = () => {
  const { id } = useParams();
  const event = id && eventsData[id] ? eventsData[id] : defaultEvent;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 lg:px-8 pb-12">
              <Button variant="ghost" asChild className="mb-6">
                <Link to="/events">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Events
                </Link>
              </Button>
              <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-primary text-primary-foreground rounded-full mb-4">
                {event.type}
              </span>
              <h1 className="text-display-md md:text-display-lg mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {event.location}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Promo Slider */}
        <PromoSlider variant="top" />

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                <h2 className="text-display-sm mb-6">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {event.fullDescription}
                </p>

                {event.lineup && event.lineup.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Lineup</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.lineup.map((artist) => (
                        <span
                          key={artist}
                          className="px-4 py-2 bg-secondary rounded-full text-sm font-medium"
                        >
                          {artist}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-semibold mb-4">Venue</h3>
                  <p className="text-muted-foreground mb-2">{event.location}</p>
                  <p className="text-sm text-muted-foreground">{event.address}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-2xl font-bold">{event.ticketPrice}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Time</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.capacity}
                      </span>
                    </div>
                  </div>

                  {event.isPast ? (
                    <Button variant="outline" className="w-full" disabled>
                      Event Ended
                    </Button>
                  ) : (
                    <Button variant="hero" className="w-full" size="lg">
                      Get Tickets
                    </Button>
                  )}

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Tickets are non-refundable. See terms & conditions.
                  </p>
                </div>
              </div>
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

export default EventDetail;

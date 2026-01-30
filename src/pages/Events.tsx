import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromoSlider } from "@/components/PromoSlider";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Hype House Live: Volume III",
    date: "March 15, 2024",
    time: "8:00 PM",
    location: "O2 Academy Brixton, London",
    type: "Concert",
    featured: true,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80",
    description: "An unforgettable night featuring performances from our entire roster.",
    capacity: "5,000",
    ticketPrice: "£35",
  },
  {
    id: 2,
    title: "Studio Sessions: Beat Making Workshop",
    date: "March 22, 2024",
    time: "2:00 PM",
    location: "Hype House Studios, Shoreditch",
    type: "Workshop",
    featured: false,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    description: "Learn production techniques from our in-house producers.",
    capacity: "30",
    ticketPrice: "£75",
  },
  {
    id: 3,
    title: "Serena Gold - Album Release Party",
    date: "April 5, 2024",
    time: "9:00 PM",
    location: "Ministry of Sound, London",
    type: "Launch Party",
    featured: false,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    description: "Celebrate the launch of 'Wavelength' with an exclusive listening party.",
    capacity: "1,500",
    ticketPrice: "£25",
  },
  {
    id: 4,
    title: "Neon Pulse DJ Set",
    date: "April 12, 2024",
    time: "10:00 PM",
    location: "Fabric, London",
    type: "Club Night",
    featured: false,
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80",
    description: "Extended 3-hour set featuring unreleased tracks.",
    capacity: "1,600",
    ticketPrice: "£20",
  },
];

const pastEvents = [
  {
    id: 101,
    title: "Hype House Live: Volume II",
    date: "January 20, 2024",
    location: "Electric Brixton, London",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
  },
  {
    id: 102,
    title: "Marcus Wave - Headline Show",
    date: "December 15, 2023",
    location: "KOKO, Camden",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  },
  {
    id: 103,
    title: "Winter Warehouse Party",
    date: "November 25, 2023",
    location: "Printworks, London",
    image: "https://images.unsplash.com/photo-1598387993211-5e4461c7a4f2?w=800&q=80",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              Live Experiences
            </p>
            <h1 className="text-display-lg md:text-display-xl mb-4">Events</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From intimate studio sessions to arena shows. Experience Hype House artists live.
            </p>
          </div>
        </section>

        {/* Top Promo Slider */}
        <PromoSlider variant="top" />

        {/* Featured Event */}
        {upcomingEvents.filter(e => e.featured).map((event) => (
          <section key={event.id} className="py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 flex items-end p-6 md:p-12">
                  <div className="max-w-2xl">
                    <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-primary text-primary-foreground rounded-full mb-4">
                      Featured Event
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h2>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-foreground/80 mb-6">
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
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        {event.capacity} capacity
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="hero" size="lg" asChild>
                        <Link to={`/events/${event.id}`}>
                          Get Tickets - {event.ticketPrice}
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link to={`/events/${event.id}`}>Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-display-sm mb-8">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.filter(e => !e.featured).map((event, index) => (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="group block rounded-lg border border-border hover:border-primary/50 bg-card overflow-hidden transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 h-48 md:h-auto">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-primary/10 text-primary rounded-full mb-3">
                          {event.type}
                        </span>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button variant="cta" size="sm">
                          Get Tickets - {event.ticketPrice}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events Gallery */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-display-sm mb-8">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="group relative overflow-hidden rounded-xl aspect-video animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-xs text-primary font-medium mb-1">{event.date}</p>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
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

export default Events;

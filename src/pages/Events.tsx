import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromoSlider } from "@/components/PromoSlider";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string | null;
  venue: string;
  location: string;
  event_date: string;
  image_url: string | null;
  ticket_url: string | null;
  ticket_price: string | null;
  is_featured: boolean;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_active", true)
        .order("event_date", { ascending: true });

      if (!error && data) {
        setEvents(data);
      }
      setIsLoading(false);
    };

    fetchEvents();
  }, []);

  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.event_date) >= now);
  const pastEvents = events.filter((e) => new Date(e.event_date) < now);
  const featuredEvent = upcomingEvents.find((e) => e.is_featured) || upcomingEvents[0];
  const otherUpcoming = upcomingEvents.filter((e) => e.id !== featuredEvent?.id);

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

        {isLoading ? (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8 text-center text-muted-foreground">
              Loading events...
            </div>
          </section>
        ) : upcomingEvents.length === 0 && pastEvents.length === 0 ? (
          <section className="py-16">
            <div className="container mx-auto px-4 lg:px-8 text-center text-muted-foreground">
              No events available at the moment. Check back soon!
            </div>
          </section>
        ) : (
          <>
            {/* Featured Event */}
            {featuredEvent && (
              <section className="py-16">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={featuredEvent.image_url || "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80"}
                      alt={featuredEvent.title}
                      className="w-full h-[400px] md:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 flex items-end p-6 md:p-12">
                      <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-primary text-primary-foreground rounded-full mb-4">
                          {featuredEvent.is_featured ? "Featured Event" : "Next Event"}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredEvent.title}</h2>
                        {featuredEvent.description && (
                          <p className="text-muted-foreground mb-4">{featuredEvent.description}</p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/80 mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            {format(new Date(featuredEvent.event_date), "EEEE, MMMM d, yyyy")}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            {format(new Date(featuredEvent.event_date), "h:mm a")}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            {featuredEvent.venue}, {featuredEvent.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {featuredEvent.ticket_url && (
                            <Button variant="hero" size="lg" asChild>
                              <a href={featuredEvent.ticket_url} target="_blank" rel="noopener noreferrer">
                                <Ticket className="h-4 w-4 mr-2" />
                                Get Tickets {featuredEvent.ticket_price && `• ${featuredEvent.ticket_price}`}
                              </a>
                            </Button>
                          )}
                          <Button variant="outline" size="lg" asChild>
                            <Link to={`/events/${featuredEvent.id}`}>Learn More</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Other Upcoming Events */}
            {otherUpcoming.length > 0 && (
              <section className="py-16">
                <div className="container mx-auto px-4 lg:px-8">
                  <h2 className="text-display-sm mb-8">More Upcoming Events</h2>
                  <div className="space-y-4">
                    {otherUpcoming.map((event, index) => (
                      <Link
                        key={event.id}
                        to={`/events/${event.id}`}
                        className="group block rounded-lg border border-border hover:border-primary/50 bg-card overflow-hidden transition-all duration-300 animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-64 h-48 md:h-auto">
                            <img
                              src={event.image_url || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                                {event.title}
                              </h3>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {format(new Date(event.event_date), "MMM d, yyyy")}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  {format(new Date(event.event_date), "h:mm a")}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  {event.venue}, {event.location}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                              {event.ticket_url ? (
                                <Button variant="cta" size="sm" asChild>
                                  <a 
                                    href={event.ticket_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Get Tickets {event.ticket_price && `• ${event.ticket_price}`}
                                  </a>
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Past Events Gallery */}
            {pastEvents.length > 0 && (
              <section className="py-16 bg-secondary/20">
                <div className="container mx-auto px-4 lg:px-8">
                  <h2 className="text-display-sm mb-8">Past Events</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pastEvents.slice(0, 6).map((event, index) => (
                      <div
                        key={event.id}
                        className="group relative overflow-hidden rounded-xl aspect-video animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <img
                          src={event.image_url || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"}
                          alt={event.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <p className="text-xs text-primary font-medium mb-1">
                            {format(new Date(event.event_date), "MMM d, yyyy")}
                          </p>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{event.venue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* Bottom Promo Slider */}
        <PromoSlider variant="bottom" />
      </main>

      <Footer />
    </div>
  );
};

export default Events;

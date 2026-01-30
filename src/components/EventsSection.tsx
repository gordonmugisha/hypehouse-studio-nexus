import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: 1,
    title: "Hype House Live: Volume III",
    date: "March 15, 2024",
    time: "8:00 PM",
    location: "O2 Academy Brixton, London",
    type: "Concert",
    featured: true,
  },
  {
    id: 2,
    title: "Studio Sessions: Beat Making Workshop",
    date: "March 22, 2024",
    time: "2:00 PM",
    location: "Hype House Studios, Shoreditch",
    type: "Workshop",
    featured: false,
  },
  {
    id: 3,
    title: "Serena Gold - Album Release Party",
    date: "April 5, 2024",
    time: "9:00 PM",
    location: "Ministry of Sound, London",
    type: "Launch Party",
    featured: false,
  },
];

export const EventsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              Live Experiences
            </p>
            <h2 className="text-display-md">Upcoming Events</h2>
          </div>
          <Button variant="ghost" asChild className="mt-4 md:mt-0 group">
            <Link to="/events">
              View All Events
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Events list */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className={`group block rounded-lg border transition-all duration-300 animate-slide-up ${
                event.featured
                  ? "bg-accent-gradient p-px"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`flex flex-col md:flex-row md:items-center justify-between p-6 rounded-lg ${
                  event.featured ? "bg-card" : ""
                }`}
              >
                <div className="flex-1">
                  {/* Event type badge */}
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

                <div className="mt-4 md:mt-0 md:ml-6">
                  <Button variant={event.featured ? "hero" : "outline"} size="sm">
                    Get Tickets
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

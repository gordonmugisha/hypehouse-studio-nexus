import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromoSlider } from "@/components/PromoSlider";
import { Button } from "@/components/ui/button";
import { Users, Music, Calendar, Award, ArrowRight } from "lucide-react";

const stats = [
  { icon: Users, value: "15+", label: "Signed Artists" },
  { icon: Music, value: "200+", label: "Releases" },
  { icon: Calendar, value: "50+", label: "Events Annually" },
  { icon: Award, value: "12", label: "Industry Awards" },
];

const team = [
  {
    name: "James Harper",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "20+ years in the music industry, former A&R at major labels.",
  },
  {
    name: "Sarah Chen",
    role: "Head of A&R",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Discovered and developed multi-platinum selling artists.",
  },
  {
    name: "Marcus Johnson",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Award-winning creative with campaigns for global brands.",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Digital marketing expert specializing in music promotion.",
  },
];

const services = [
  {
    title: "Artist Development",
    description: "From demos to global stages, we nurture talent at every step.",
  },
  {
    title: "Music Production",
    description: "State-of-the-art studios and world-class producers.",
  },
  {
    title: "Marketing & PR",
    description: "Strategic campaigns that cut through the noise.",
  },
  {
    title: "Brand Partnerships",
    description: "Connecting artists with brands that align with their vision.",
  },
  {
    title: "Event Production",
    description: "From intimate showcases to arena tours.",
  },
  {
    title: "Distribution",
    description: "Global reach across all major streaming platforms.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              Our Story
            </p>
            <h1 className="text-display-lg md:text-display-xl mb-4">About Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Building the future of music, one artist at a time.
            </p>
          </div>
        </section>

        {/* Top Promo Slider */}
        <PromoSlider variant="top" />

        {/* Mission Statement */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-display-md mb-6">
                  More Than a Label.
                  <br />
                  <span className="text-gradient">A Creative Movement.</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in London in 2018, Hype House Creative has grown from a bedroom 
                    studio to one of the most exciting independent labels in the UK.
                  </p>
                  <p>
                    We believe in artist-first partnerships, creative freedom, and building 
                    sustainable careers in music. Our roster spans genres from hip-hop and 
                    R&B to electronic and alternative pop.
                  </p>
                  <p>
                    Beyond music, we're a full-service creative agency offering marketing, 
                    brand partnerships, event production, and creative direction for artists 
                    and brands worldwide.
                  </p>
                </div>
                <div className="mt-8 flex gap-4">
                  <Button variant="cta" asChild>
                    <Link to="/artists">Meet Our Artists</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/submit">Submit Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
                  alt="Hype House Studios"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-xl">
                  <p className="text-3xl font-bold text-primary">6+</p>
                  <p className="text-sm text-muted-foreground">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <p className="text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                What We Do
              </p>
              <h2 className="text-display-md">Our Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                The Team
              </p>
              <h2 className="text-display-md">Meet the People Behind Hype House</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-display-md mb-4">Ready to Work With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you're an artist looking for representation or a brand seeking creative 
              partnerships, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/submit">
                  Submit Your Demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:hello@hypehousecreative.com">Contact Us</a>
              </Button>
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

export default About;

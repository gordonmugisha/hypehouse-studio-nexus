import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromoSlide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  link?: string;
}

// Placeholder slides - these would be managed by admin in production
const defaultSlides: PromoSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80",
    title: "New Album Out Now",
    subtitle: "Stream 'Midnight Frequencies' everywhere",
    link: "/music",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80",
    title: "Live in London",
    subtitle: "March 15, 2024 • O2 Academy Brixton",
    link: "/events",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1598387993211-5e4461c7a4f2?w=1920&q=80",
    title: "Submit Your Demo",
    subtitle: "Join the Hype House roster",
    link: "/submit",
  },
];

interface PromoSliderProps {
  slides?: PromoSlide[];
  variant?: "top" | "bottom";
  className?: string;
}

export const PromoSlider = ({
  slides = defaultSlides,
  variant = "top",
  className = "",
}: PromoSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const heightClass = variant === "top" ? "h-48 md:h-64" : "h-40 md:h-56";

  return (
    <section className={`relative overflow-hidden ${heightClass} ${className}`}>
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative flex-shrink-0"
          >
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
            
            {/* Content */}
            <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
              <div className="max-w-lg">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
                {slide.subtitle && (
                  <p className="text-muted-foreground text-sm md:text-base">
                    {slide.subtitle}
                  </p>
                )}
                {slide.link && (
                  <Button variant="cta" size="sm" className="mt-4" asChild>
                    <a href={slide.link}>Learn More</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="glass"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="glass"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full"
        onClick={goToNext}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

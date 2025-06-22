
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Anime Collection",
    subtitle: "Unleash Your Inner Otaku",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=600&fit=crop",
    cta: "Explore Anime Skins"
  },
  {
    id: 2,
    title: "Marvel Universe",
    subtitle: "Superhero Style",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=600&fit=crop",
    cta: "Shop Marvel"
  },
  {
    id: 3,
    title: "Minimalist Design",
    subtitle: "Clean & Elegant",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=600&fit=crop",
    cta: "Browse Minimal"
  },
  {
    id: 4,
    title: "Neon Vibes",
    subtitle: "Glow in Style",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop",
    cta: "See Neon Collection"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-xl">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-jet-black/70 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container-max section-padding">
                  <div className="max-w-lg text-white animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl mb-8 text-gray-200">
                      {slide.subtitle}
                    </p>
                    <button className="btn-primary">
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
      >
        <ArrowLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200"
      >
        <ArrowRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-cyber-yellow scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

import React from "react";

const HeroCarousel = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-xl">
      {/* Hero Section */}
      <div
        className="w-full h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(/Banner/banner-skin.webp)` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">
              Premium Mobile Skins
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
              Explore top-quality mobile skins/mobile back sticker and phone
              wraps at SkinIt. Tailor-made to ensure a perfect fit, our products
              offer unmatched style for your device. Shop now to elevate your
              mobile's aesthetics!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;

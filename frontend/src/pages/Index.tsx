import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import BrandGrid from "@/components/BrandGrid";
import FeaturedSkins from "@/components/FeaturedSkins";
import Categories from "@/components/Categories";
import FloatingChat from "@/components/FloatingChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="container-max section-padding py-8">
          <HeroCarousel />
        </section>

        {/* Categories */}
        <Categories />

        {/* Brand Grid */}
        <BrandGrid />

        {/* Featured Skins */}
        <FeaturedSkins />

        {/* Social Proof */}
        <section className="py-16 bg-white">
          <div className="container-max section-padding text-center">
            <h2 className="text-3xl font-poppins font-bold mb-8">
              Trusted by 10,000+ Customers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rahul K.",
                  review:
                    "Amazing quality! The skin fits perfectly and looks exactly like the preview.",
                  rating: 5,
                },
                {
                  name: "Priya S.",
                  review:
                    "Super fast delivery and the anime design is stunning. Highly recommend!",
                  rating: 5,
                },
                {
                  name: "Amit P.",
                  review:
                    "Best phone skins in India. Great customer service too!",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-cyber-yellow text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.review}"</p>
                  <p className="font-poppins font-semibold">
                    {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Index;

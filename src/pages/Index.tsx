
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

        {/* Brand Grid */}
        <BrandGrid />

        {/* Featured Skins */}
        <FeaturedSkins />

        {/* Categories */}
        <Categories />

        {/* Newsletter Section */}
        <section className="py-16 bg-jet-black text-white">
          <div className="container-max section-padding text-center">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              Join the SkinClub
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Be the first to know about new collections, exclusive deals, and limited edition drops
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-yellow"
              />
              <button className="btn-primary px-8">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 bg-white">
          <div className="container-max section-padding text-center">
            <h2 className="text-3xl font-poppins font-bold mb-8">
              Trusted by 50,000+ Customers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Rahul K.", review: "Amazing quality! The skin fits perfectly and looks exactly like the preview.", rating: 5 },
                { name: "Priya S.", review: "Super fast delivery and the anime design is stunning. Highly recommend!", rating: 5 },
                { name: "Amit P.", review: "Best phone skins in India. Great customer service too!", rating: 5 }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-cyber-yellow text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.review}"</p>
                  <p className="font-poppins font-semibold">{testimonial.name}</p>
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

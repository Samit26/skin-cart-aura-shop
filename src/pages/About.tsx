
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const About = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      
      <main className="container-max section-padding py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
              About SkinCart
            </h1>
            <p className="text-xl text-light-text">
              Transforming phones into personal statements since 2024
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-poppins font-bold mb-6">Our Mission</h2>
              <p className="text-light-text leading-relaxed mb-6">
                At SkinCart, we believe your phone should be as unique as you are. We specialize in premium quality phone skins that not only protect your device but transform it into a canvas for self-expression.
              </p>
              <p className="text-light-text leading-relaxed">
                From anime enthusiasts to minimalist lovers, from Marvel fans to neon dreamers - we create designs that speak to every personality and style.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=400&fit=crop"
                alt="About us"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-cyber-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-poppins font-bold text-xl mb-2">Premium Quality</h3>
              <p className="text-light-text">High-resolution printing with durable materials</p>
            </div>
            <div className="text-center">
              <div className="bg-cyber-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-poppins font-bold text-xl mb-2">Fast Delivery</h3>
              <p className="text-light-text">Quick processing and shipping nationwide</p>
            </div>
            <div className="text-center">
              <div className="bg-cyber-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="font-poppins font-bold text-xl mb-2">Perfect Fit</h3>
              <p className="text-light-text">Precision cut for every phone model</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default About;


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const Contact = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      
      <main className="container-max section-padding py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-light-text">
              Have questions? We'd love to hear from you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-poppins font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-yellow"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-yellow"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-yellow"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-poppins font-bold text-xl mb-4">Quick Support</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-cyber-yellow w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-lg">📧</span>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-light-text">support@skincart.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-cyber-yellow w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-lg">💬</span>
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-light-text">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-poppins font-bold text-xl mb-4">FAQ</h3>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="cursor-pointer font-medium">How long does delivery take?</summary>
                    <p className="text-light-text mt-2">Usually 3-5 business days within India</p>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-medium">Do you offer returns?</summary>
                    <p className="text-light-text mt-2">Yes, 7-day return policy for defective items</p>
                  </details>
                  <details className="group">
                    <summary className="cursor-pointer font-medium">Can I track my order?</summary>
                    <p className="text-light-text mt-2">Yes, tracking details sent via email after dispatch</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Contact;

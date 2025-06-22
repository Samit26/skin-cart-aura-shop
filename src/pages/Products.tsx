
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const Products = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      
      <main className="container-max section-padding py-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-poppins font-bold mb-4">Products Page</h1>
          <p className="text-light-text text-lg">Coming soon with full product catalog and filtering</p>
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Products;

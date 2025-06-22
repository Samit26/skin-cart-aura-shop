
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const Account = () => {
  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      
      <main className="container-max section-padding py-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-poppins font-bold mb-4">My Account</h1>
          <p className="text-light-text text-lg">Login or register to access your account</p>
          <div className="flex gap-4 justify-center mt-6">
            <button className="btn-primary">Login</button>
            <button className="btn-secondary">Register</button>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Account;

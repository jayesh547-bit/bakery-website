import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Products from "../sections/Products";
import CustomOrders from "../sections/CustomOrders";
import About from "../sections/About";
import Gallery from "../sections/Gallery";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";

import CartDrawer from "../components/CartDrawer";
import ProductModal from "../components/ProductModal";
import CustomCakeModal from "../components/CustomCakeModal";
import OrderConfirmationModal from "../components/OrderConfirmationModal";

import useLenis from "../hooks/useLenis";
import useReveal from "../hooks/useReveal";

export default function Home() {
  useLenis();
  useReveal();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />

      <main>
        <Hero />
        <Products />
        <CustomOrders />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductModal />
      <CustomCakeModal />
      <OrderConfirmationModal />
    </div>
  );
}

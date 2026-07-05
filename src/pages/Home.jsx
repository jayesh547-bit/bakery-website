import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Products from "../sections/Products";
import About from "../sections/About";
import Gallery from "../sections/Gallery";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";
import useLenis from "../hooks/useLenis";
import useReveal from "../hooks/useReveal";

function Home() {
  useLenis();
  useReveal();

  return (
    <div className="min-h-screen overflow-hidden bg-[#0f0f0f] text-white">
      <Navbar />

      <main>
        <Hero />
        <Products />
        <About />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
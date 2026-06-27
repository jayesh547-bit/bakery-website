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
    <main className="min-h-screen overflow-hidden bg-[#0F0F0F] text-white">
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="menu">
        <Products />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}

export default Home;
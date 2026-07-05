import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroVideo from "../assets/videos/cake.mp4";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".hero-kling-content", {
          opacity: 1,
          y: 0,
          filter: "none",
        });

        gsap.set(".hero-bg", {
          scale: 1,
        });

        return;
      }

      gsap.from(".hero-kling-content", {
        y: isMobile ? 20 : 60,
        opacity: 0,
        filter: isMobile ? "none" : "blur(8px)",
        duration: isMobile ? 0.45 : 0.9,
        ease: "power3.out",
        force3D: true,
      });

      // Disable infinite video zoom on mobile.
      if (!isMobile) {
        gsap.to(".hero-bg", {
          scale: 1.06,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-28 text-white"
    >
      <video
        className="hero-bg absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="hero-kling-content relative z-10 mx-auto w-full max-w-7xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
          Fresh Every Morning
        </p>

        <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl lg:text-8xl">
          All-New Sweet Crumbs Signature Bakery
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
          Premium cakes, artisan breads, pastries, and desserts crafted fresh
          every day.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#menu"
            className="rounded-full bg-amber-400 px-8 py-4 text-center font-bold text-black transition hover:bg-amber-300"
          >
            Order Now
          </a>

          <a
            href="#about"
            className="rounded-full border border-white/30 px-8 py-4 text-center font-bold text-white transition hover:bg-white/10"
          >
            Explore Bakery
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroVideo from "../assets/videos/cake.mp4";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-kling-content", {
        y: 70,
        opacity: 0,
        filter: "blur(14px)",
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.to(".hero-bg", {
        scale: 1.08,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 pb-10 pt-32 text-white"
    >
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="hero-bg absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/80" />

      <div className="hero-kling-content relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <p className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white backdrop-blur-xl sm:text-sm">
          Fresh Every Morning
        </p>

        <h1 className="mt-8 max-w-5xl font-serif text-5xl font-black italic leading-tight text-white sm:text-7xl lg:text-8xl">
          All-New Sweet Crumbs
          <span className="block">Signature Bakery</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-2xl">
          Premium cakes, artisan breads, pastries, and desserts crafted fresh
          every day.
        </p>

        <a
          href="#menu"
          className="mt-8 rounded-full border border-white/70 bg-white/10 px-9 py-4 text-lg font-semibold text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
        >
          Order Now
        </a>
      </div>
    </section>
  );
}

export default Hero;
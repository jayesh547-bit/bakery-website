import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, Star, ArrowRight } from "lucide-react";
import heroVideo from "../assets/videos/cake.mp4";
import { useCart } from "../context/useCart";

export default function Hero() {
  const heroRef = useRef(null);
  const { openCustomCakeModal } = useCart();

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
        });
        return;
      }

      gsap.from(".hero-kling-content", {
        y: isMobile ? 25 : 50,
        opacity: 0,
        duration: isMobile ? 0.5 : 0.85,
        ease: "power3.out",
      });

      if (!isMobile) {
        gsap.to(".hero-bg", {
          scale: 1.05,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-32 text-white"
    >
      {/* Background Video */}
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

      {/* Dark Black & Charcoal Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f0f0f_90%)] opacity-85" />

      {/* Hero Content */}
      <div className="hero-kling-content relative z-10 mx-auto w-full max-w-5xl text-center">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/60 px-4 py-1.5 shadow-lg backdrop-blur-md">
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Artisanal Patisserie &bull; Fresh Daily at 5:00 AM
          </span>
        </div>

        {/* Main Headline with Serif Typography */}
        <h1 className="font-serif mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Handcrafted Bakes,{" "}
          <span className="bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent italic">
            Straight From the Hearth.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
          Slow-fermented artisan sourdough, 72-layer flaky French butter croissants,
          and rich Belgian chocolate cakes baked in small daily batches in Jaipur.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#menu"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-8 py-4 font-bold text-black shadow-xl shadow-amber-400/20 transition hover:scale-105 hover:bg-amber-300 active:scale-95 sm:w-auto"
          >
            <span>Explore Menu & Order</span>
            <ArrowRight size={18} />
          </a>

          <button
            type="button"
            onClick={openCustomCakeModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:border-amber-400 hover:bg-white/10 active:scale-95 sm:w-auto"
          >
            <Sparkles size={18} className="text-amber-400" />
            <span>Design Custom Cake</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={16} fill="currentColor" />
              <span className="font-bold">4.9 / 5</span>
            </div>
            <span className="mt-1 text-[11px] text-white/60">1,200+ Reviews</span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
            <span className="font-bold text-white">100% Eggless</span>
            <span className="mt-1 text-[11px] text-amber-400">Options Available</span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
            <span className="font-bold text-white">AOP French Butter</span>
            <span className="mt-1 text-[11px] text-white/60">No Preservatives</span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-md">
            <span className="font-bold text-white">Same-Day Pickup</span>
            <span className="mt-1 text-[11px] text-amber-400">Jaipur Citywide</span>
          </div>
        </div>
      </div>
    </section>
  );
}

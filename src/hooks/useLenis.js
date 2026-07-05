import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function useLenis() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Native mobile scroll is faster than JS smooth scroll.
    if (isMobile || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.75,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.08,
    });

    lenis.on("scroll", ScrollTrigger.update);

    let frameId;

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);
}

export default useLenis;
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useReveal() {
  useEffect(() => {
    const sections = gsap.utils.toArray(".reveal");

    if (!sections.length) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Accessibility: if user prefers less motion, show everything directly
    if (prefersReducedMotion) {
      gsap.set(sections, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "none",
      });

      return;
    }

    // Mobile: very light animation to avoid lag during fast scroll
    if (isMobile) {
      gsap.set(sections, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "none",
      });

      return;
    }

    // Desktop: keep premium reveal effect
    const animations = sections.map((section) => {
      const inner = section.querySelector(":scope > div");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });

      timeline.fromTo(
        section,
        {
          opacity: 0,
          y: 70,
          scale: 0.98,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "none",
          duration: 0.75,
          ease: "power3.out",
          force3D: true,
        }
      );

      if (inner) {
        timeline.fromTo(
          inner.children,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.4"
        );
      }

      return timeline;
    });

    ScrollTrigger.refresh();

    return () => {
      animations.forEach((animation) => animation.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

export default useReveal;
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

    if (prefersReducedMotion) {
      gsap.set(sections, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "none",
      });

      return;
    }

    sections.forEach((section) => {
      const inner = section.querySelector(":scope > div");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: isMobile ? "top 90%" : "top 82%",
          once: true,
        },
      });

      timeline.fromTo(
        section,
        {
          opacity: 0,
          y: isMobile ? 35 : 80,
          scale: isMobile ? 1 : 0.97,
          filter: isMobile ? "none" : "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "none",
          duration: isMobile ? 0.55 : 0.85,
          ease: "power3.out",
          force3D: true,
        }
      );

      if (inner && !isMobile) {
        timeline.fromTo(
          inner.children,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            force3D: true,
          },
          "-=0.45"
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

export default useReveal;
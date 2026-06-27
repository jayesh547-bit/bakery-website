import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useReveal() {
  useEffect(() => {
    const sections = gsap.utils.toArray(".reveal");

    sections.forEach((section) => {
      const inner = section.querySelector(":scope > div");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "bottom 18%",
          toggleActions: "play reverse play reverse",
        },
      });

      timeline.fromTo(
        section,
        {
          opacity: 0,
          y: 120,
          scale: 0.94,
          filter: "blur(18px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power4.out",
        }
      );

      if (inner) {
        timeline.fromTo(
          inner.children,
          {
            opacity: 0,
            y: 70,
            scale: 0.96,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.75"
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
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Ananya Sharma",
    location: "Jaipur",
    review: "The chocolate cake was absolutely premium and fresh.",
  },
  {
    name: "Rohit Mehra",
    location: "Mansarovar",
    review: "Best croissants I have ever had in Jaipur.",
  },
  {
    name: "Priya Kapoor",
    location: "Vaishali Nagar",
    review: "Beautiful packaging, amazing taste, and quick delivery.",
  },
  {
    name: "Karan Saini",
    location: "C-Scheme",
    review: "The custom birthday cake looked stunning and tasted even better.",
  },
  {
    name: "Megha Jain",
    location: "Malviya Nagar",
    review: "Their cupcakes are soft, fresh, and perfect for gifting.",
  },
  {
    name: "Aman Verma",
    location: "Raja Park",
    review: "Fresh bread, clean packaging, and very warm service.",
  },
];

function Testimonials() {
  const sliderRef = useRef(null);

  const scrollSlider = (direction = "right") => {
    const slider = sliderRef.current;

    if (!slider) return;

    const cardWidth = slider.firstElementChild?.offsetWidth || 320;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (direction === "right") {
      if (slider.scrollLeft >= maxScroll - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }

    if (direction === "left") {
      if (slider.scrollLeft <= 10) {
        slider.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Avoid background auto-scroll on mobile.
    if (isMobile) return;

    const interval = setInterval(() => {
      scrollSlider("right");
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="reveal px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-amber-300">
              Testimonials
            </p>

            <h2 className="max-w-2xl text-4xl font-black text-white md:text-6xl">
              Loved by our customers.
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              className="rounded-full border border-white/15 bg-white/6 p-4 text-white transition hover:bg-amber-400 hover:text-black"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={() => scrollSlider("right")}
              className="rounded-full border border-white/15 bg-white/6 p-4 text-white transition hover:bg-amber-400 hover:text-black"
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="no-scrollbar flex snap-x gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {reviews.map((item) => (
            <article
              key={item.name}
              className="min-w-70 snap-start rounded-4xl border border-white/10 bg-white/6 p-7 md:min-w-95"
            >
              <Quote className="mb-6 text-amber-300" size={34} />

              <p className="mb-6 text-lg leading-8 text-white/80">
                “{item.review}”
              </p>

              <div className="mb-4 flex gap-1 text-amber-300">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>

              <h3 className="text-xl font-bold text-white">{item.name}</h3>
              <p className="text-white/55">{item.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
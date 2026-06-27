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
    const interval = setInterval(() => {
      scrollSlider("right");
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="reveal bg-[#0F0F0F] px-6 py-24 text-white sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Testimonials
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              Loved by our customers.
            </h2>
          </div>

          <div className="flex justify-center gap-3 md:justify-end">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => scrollSlider("left")}
              className="rounded-full border border-white/15 bg-white/6 p-4 text-white transition hover:bg-amber-400 hover:text-black"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              aria-label="Next review"
              onClick={() => scrollSlider("right")}
              className="rounded-full border border-white/15 bg-white/6 p-4 text-white transition hover:bg-amber-400 hover:text-black"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="mt-14 flex snap-x gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((item) => (
            <article
              key={item.name}
              className="min-w-[85%] snap-start rounded-4xl border border-white/10 bg-white/6 p-8 text-left transition duration-500 hover:-translate-y-2 hover:bg-white/10 sm:min-w-105 lg:min-w-97.5"
            >
              <Quote className="text-amber-400" size={34} />

              <p className="mt-6 min-h-24 text-lg leading-8 text-white/70">
                {item.review}
              </p>

              <div className="mt-6 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <h3 className="font-bold text-white">{item.name}</h3>
                <p className="mt-1 text-sm text-white/50">{item.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
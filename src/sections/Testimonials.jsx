import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle, Heart } from "lucide-react";

const reviews = [
  {
    name: "Ananya Sharma",
    location: "Vaishali Nagar, Jaipur",
    item: "Belgian Dark Truffle Cake (1kg)",
    rating: 5,
    review:
      "Ordered the Belgian dark truffle for my sister's 25th birthday. The custom piping was flawless, the sponge was incredibly moist, and the chocolate was genuinely premium Callebaut. Truly Jaipur's finest patisserie!",
  },
  {
    name: "Rohit Mehra",
    location: "Mansarovar, Jaipur",
    item: "AOP Butter Croissants & Brioche",
    rating: 5,
    review:
      "Having lived in Paris, I was skeptical about finding authentic laminated viennoiserie in Jaipur. Sweet Crumbs proved me completely wrong. Flaky, fragrant with real butter, and baked fresh daily at dawn.",
  },
  {
    name: "Priya Kapoor",
    location: "C-Scheme, Jaipur",
    item: "Custom Two-Tier Engagement Cake",
    rating: 5,
    review:
      "They designed our engagement cake with delicate edible gold leaf and blush florals. Delivered on time in a refrigerated box. Every guest praised the Lotus Biscoff flavor!",
  },
  {
    name: "Dr. Karan Saini",
    location: "Raja Park, Jaipur",
    item: "San Francisco Country Sourdough",
    rating: 5,
    review:
      "Their 36-hour fermented sourdough has completely transformed our morning breakfasts. Crisp caramelized crust, open airy crumb, and naturally easy to digest. We subscribe every week.",
  },
  {
    name: "Megha Jain",
    location: "Malviya Nagar, Jaipur",
    item: "Eggless Velvet Cupcakes & Cookies",
    rating: 5,
    review:
      "Finding 100% eggless bakery items that don't taste dense or dry is usually impossible. Sweet Crumbs' eggless cupcakes and sea salt cookies are soft, melt-in-the-mouth, and beautifully packaged.",
  },
  {
    name: "Aman Verma",
    location: "Civil Lines, Jaipur",
    item: "Sea Salt Dark Chocolate Cookies",
    rating: 5,
    review:
      "Warm, molten chocolate centers with crunchy edges and flakes of sea salt. Ordered for our office celebration and the box disappeared in 5 minutes. Outstanding quality!",
  },
];

export default function Testimonials() {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollSlider = (direction = "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cardWidth = slider.firstElementChild?.offsetWidth || 340;
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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      scrollSlider("right");
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="testimonials" className="reveal bg-[#0f0f0f] px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
              <Heart size={13} />
              <span>Customer Stories</span>
            </div>
            <h2 className="font-serif mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              Loved by bakery lovers across Jaipur.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              className="rounded-full border border-white/15 bg-white/5 p-3.5 text-white transition hover:bg-amber-400 hover:text-black"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scrollSlider("right")}
              className="rounded-full border border-white/15 bg-white/5 p-3.5 text-white transition hover:bg-amber-400 hover:text-black"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="no-scrollbar flex snap-x gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {reviews.map((item) => (
            <article
              key={item.name}
              className="flex min-w-[300px] sm:min-w-[380px] md:min-w-[420px] snap-start flex-col justify-between rounded-3xl border border-white/10 bg-white/6 p-7 transition duration-300 hover:border-amber-400/40 hover:bg-white/10"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Quote className="text-amber-400" size={28} />
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-white/85 sm:text-base">
                  &ldquo;{item.review}&rdquo;
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs text-amber-300">
                  <span>Ordered:</span>
                  <span className="font-semibold text-white">{item.item}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <h3 className="font-serif text-base font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-white/60">{item.location}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <CheckCircle size={14} />
                  <span>Verified Order</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

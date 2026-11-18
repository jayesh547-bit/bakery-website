import { Camera, ArrowRight } from "lucide-react";
import chocolateCake from "../assets/images/chocolate-cake.png";
import croissant from "../assets/images/croissant.png";
import cupcake from "../assets/images/cupcake.png";
import sourdough from "../assets/images/sourdough.png";
import cookies from "../assets/images/cookies.png";
import pastry from "../assets/images/pastry.png";
import { useCart } from "../context/useCart";
import { PRODUCTS } from "../data/products";

const galleryShowcase = [
  {
    productId: "prod-choc-truffle",
    image: chocolateCake,
    title: "Belgian Opera & Truffle Cakes",
    tag: "Signature Cakes",
    caption: "Layered sponge with 64% Callebaut dark ganache, hand-piped chocolate curls, and 24K edible gold dust.",
    prepTime: "Fresh Daily",
  },
  {
    productId: "prod-butter-croissant",
    image: croissant,
    title: "Honeycomb Butter Croissants",
    tag: "Morning Viennoiserie",
    caption: "Laminated with pure cultured French butter for an impossibly crisp shell and feather-light interior.",
    prepTime: "Baked 6:00 AM",
  },
  {
    productId: "prod-artisan-sourdough",
    image: sourdough,
    title: "San Francisco Country Sourdough",
    tag: "Wild Yeast Ferment",
    caption: "Stone-ground wheat fermented for 36 hours. Blistered crust with a custardy, open crumb structure.",
    prepTime: "36h Fermentation",
  },
  {
    productId: "prod-red-velvet-cupcake",
    image: cupcake,
    title: "Madagascar Vanilla Velvet Cupcakes",
    tag: "Patisserie Bites",
    caption: "Velvety cocoa sponge piped with Philadelphia cream cheese frosting and dusted with crimson ruby crumbs.",
    prepTime: "100% Eggless",
  },
  {
    productId: "prod-choc-chunk-cookies",
    image: cookies,
    title: "Sea Salt Dark Callebaut Cookies",
    tag: "Warm Fresh Batches",
    caption: "Crisp caramelized rims with a molten chocolate center, finished with crushed Maldon sea salt flakes.",
    prepTime: "Warm Batches",
  },
  {
    productId: "prod-golden-danish",
    image: pastry,
    title: "Wild Berry Vanilla Danish",
    tag: "French Pastry",
    caption: "Crispy puff pastry nests filled with slow-simmered vanilla bean custard and fresh seasonal berry compote.",
    prepTime: "Breakfast Special",
  },
];

export default function Gallery() {
  const { openProductModal } = useCart();

  const handleOrderShowcaseItem = (productId) => {
    const item = PRODUCTS.find((p) => p.id === productId);
    if (item) {
      openProductModal(item);
    }
  };

  return (
    <section id="gallery" className="reveal bg-[#0f0f0f] px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
              <Camera size={13} />
              <span>Visual Showcase</span>
            </div>
            <h2 className="font-serif mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              Made to look as good as it tastes.
            </h2>
          </div>

          <a
            href="#menu"
            className="w-fit rounded-full border border-white/20 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:border-amber-400 hover:bg-amber-400 hover:text-black"
          >
            Explore Full Menu
          </a>
        </div>

        {/* Alternate Gallery Cards Grid */}
        <div className="mt-14 space-y-12 sm:space-y-16">
          {galleryShowcase.map((item, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <article
                key={item.title}
                className={`grid items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-500 hover:border-amber-400/40 hover:bg-white/10 sm:p-8 md:grid-cols-2 md:gap-12 ${
                  isReversed ? "md:[&>.gallery-image-col]:order-2" : ""
                }`}
              >
                {/* Image Column */}
                <div className="gallery-image-col relative h-72 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl sm:h-96">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute bottom-4 left-4 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
                    {item.prepTime}
                  </span>
                </div>

                {/* Content Column */}
                <div className="p-2 sm:p-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    {item.tag}
                  </span>

                  <h3 className="font-serif mt-3 text-2xl font-bold leading-snug sm:text-3xl md:text-4xl text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                    {item.caption}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleOrderShowcaseItem(item.productId)}
                      className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 active:scale-95"
                    >
                      <span>Book / Order This</span>
                      <ArrowRight size={14} />
                    </button>

                    <a
                      href="#menu"
                      className="text-xs font-semibold text-white/70 transition hover:text-amber-400"
                    >
                      View in Menu &rarr;
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

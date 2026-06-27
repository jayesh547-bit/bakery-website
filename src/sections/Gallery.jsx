import chocolateCake from "../assets/images/chocolate-cake.png";
import croissant from "../assets/images/croissant.png";
import cupcake from "../assets/images/cupcake.png";
import sourdough from "../assets/images/sourdough.png";
import cookies from "../assets/images/cookies.png";
import pastry from "../assets/images/pastry.png";

const gallery = [
  {
    image: chocolateCake,
    title: "Signature Cakes",
    tag: "Custom Cakes",
    text: "Layered cakes with rich cream, premium toppings, and celebration-ready finishing.",
  },
  {
    image: croissant,
    title: "Fresh Croissants",
    tag: "Morning Fresh",
    text: "Golden, flaky croissants baked fresh every morning with buttery layers.",
  },
  {
    image: pastry,
    title: "Golden Pastries",
    tag: "Handcrafted",
    text: "Soft, delicate pastries crafted with smooth fillings and beautiful presentation.",
  },
  {
    image: cupcake,
    title: "Cupcake Box",
    tag: "Party Favorite",
    text: "Colorful cupcakes with soft sponge, creamy frosting, and playful toppings.",
  },
  {
    image: cookies,
    title: "Cookie Bites",
    tag: "Fresh Batch",
    text: "Crisp edges, soft centers, and rich flavors baked in small daily batches.",
  },
  {
    image: sourdough,
    title: "Artisan Bread",
    tag: "Slow Fermented",
    text: "Naturally fermented bread with a crisp crust, airy crumb, and deep flavor.",
  },
];

function Gallery() {
  return (
    <section className="reveal bg-[#0F0F0F] px-6 py-24 text-white sm:py-28 lg:px-10">
      <style>
        {`
          @keyframes galleryFloatUp {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-22px) rotate(1.5deg);
            }
          }

          @keyframes galleryFloatDown {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(22px) rotate(-1.5deg);
            }
          }

          .gallery-float-up {
            animation: galleryFloatUp 4.2s ease-in-out infinite;
            will-change: transform;
          }

          .gallery-float-down {
            animation: galleryFloatDown 4.8s ease-in-out infinite;
            will-change: transform;
          }
        `}
      </style>

      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Gallery
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
          Made to look as good as it tastes.
        </h2>

        <div className="mt-16 space-y-16">
          {gallery.map((item, index) => {
            const reverse = index % 2 !== 0;
            const floatClass =
              index % 2 === 0 ? "gallery-float-up" : "gallery-float-down";

            return (
              <article
                key={item.title}
                className={`grid items-center gap-8 rounded-4xl border border-white/10 bg-white/6 p-5 transition duration-500 hover:bg-white/10 md:grid-cols-2 md:p-8 ${
                  reverse ? "md:[&>.gallery-image]:order-2" : ""
                }`}
              >
                <div
                  className={`gallery-image ${floatClass} relative h-72 overflow-hidden rounded-3xl shadow-[0_35px_90px_rgba(0,0,0,0.45)] md:h-96`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
                </div>

                <div className="p-2 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                    {item.tag}
                  </p>

                  <h3 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                    {item.title}
                  </h3>

                  <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                    {item.text}
                  </p>

                  <a
                    href="#menu"
                    className="mt-8 inline-flex rounded-full border border-white/20 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
                  >
                    Explore Menu
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
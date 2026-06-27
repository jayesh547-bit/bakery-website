import { Heart, ShoppingBag, Star } from "lucide-react";

import chocolateCake from "../assets/images/chocolate-cake.png";
import croissant from "../assets/images/croissant.png";
import cupcake from "../assets/images/cupcake.png";
import sourdough from "../assets/images/sourdough.png";

const products = [
  {
    name: "Chocolate Truffle Cake",
    category: "Cakes",
    price: "₹899",
    image: chocolateCake,
    rating: "4.9",
    description: "Rich chocolate layers with smooth cream.",
  },
  {
    name: "Butter Croissant",
    category: "Pastries",
    price: "₹149",
    image: croissant,
    rating: "4.8",
    description: "Flaky, buttery, and freshly baked.",
  },
  {
    name: "Red Velvet Cupcake",
    category: "Cupcakes",
    price: "₹99",
    image: cupcake,
    rating: "4.7",
    description: "Soft sponge topped with cream frosting.",
  },
  {
    name: "Artisan Sourdough",
    category: "Bread",
    price: "₹249",
    image: sourdough,
    rating: "4.9",
    description: "Slow-fermented bread with a crisp crust.",
  },
];

function Products() {
  return (
    <section className="reveal bg-[#0F0F0F] px-6 py-24 text-white sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400 sm:tracking-[0.35em]">
              Best Sellers
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              Fresh from our oven.
            </h2>
          </div>

          <a
            href="#contact"
            className="w-fit rounded-full border border-white/15 px-7 py-4 font-semibold text-white/80 transition hover:bg-white hover:text-black"
          >
            View All Products
          </a>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((item) => (
            <article
              key={item.name}
              className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/6 p-5 transition duration-500 hover:-translate-y-3 hover:bg-white/10 sm:p-6"
            >
              <button
                type="button"
                aria-label={`Add ${item.name} to wishlist`}
                className="absolute right-5 top-5 z-10 rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-amber-400 hover:text-black"
              >
                <Heart size={18} />
              </button>

              <div className="h-48 overflow-hidden rounded-3xl sm:h-52">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 sm:text-sm">
                {item.category}
              </p>

              <h3 className="mt-3 text-2xl font-black leading-tight">
                {item.name}
              </h3>

              <p className="mt-3 min-h-12 text-sm leading-6 text-white/60">
                {item.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-amber-400">
                <Star size={18} fill="currentColor" />
                <span className="font-semibold">{item.rating}</span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-2xl font-black">{item.price}</p>

                <button
                  type="button"
                  aria-label={`Add ${item.name} to cart`}
                  className="rounded-full bg-amber-400 p-4 text-black transition hover:scale-110 hover:bg-amber-300"
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
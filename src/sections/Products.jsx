import { useState, useMemo } from "react";
import {
  Star,
  Plus,
  Search,
  Sparkles,
  Clock,
  Heart,
} from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { useCart } from "../context/useCart";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [egglessOnly, setEgglessOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState({});

  const { openProductModal, addToCart, openCustomCakeModal } = useCart();

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      // Eggless filter
      if (egglessOnly && !item.isEggless) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.categoryLabel.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat;
      }
      return true;
    });
  }, [activeCategory, egglessOnly, searchQuery]);

  return (
    <section id="menu" className="reveal bg-[#0f0f0f] px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
              <Sparkles size={13} />
              <span>Artisanal Daily Offerings</span>
            </div>
            <h2 className="font-serif mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              Fresh from our ovens.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Explore small-batch bakes prepared with stone-ground flours, fresh cultured butter, and single-origin chocolates.
            </p>
          </div>

          {/* Quick Pre-order Action */}
          <button
            type="button"
            onClick={openCustomCakeModal}
            className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-lg transition hover:border-amber-400 hover:bg-amber-400 hover:text-black"
          >
            <Sparkles size={16} />
            <span>Design Bespoke Cake</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#161616] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          {/* Category Tabs */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                    isActive
                      ? "bg-amber-400 text-black shadow-md shadow-amber-400/20"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Dietary Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Eggless Only Toggle */}
            <button
              type="button"
              onClick={() => setEgglessOnly((prev) => !prev)}
              aria-pressed={egglessOnly}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                egglessOnly
                  ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300"
                  : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
              }`}
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>Eggless Only</span>
            </button>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bakes..."
                className="w-full rounded-full border border-white/10 bg-black/60 py-2 pl-9 pr-3 text-xs text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-white/10 bg-[#161616] py-16 text-center">
            <p className="font-serif text-2xl font-bold">No bakery items found</p>
            <p className="mt-2 text-xs text-white/50">
              Try adjusting your search query or reset the eggless filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setEgglessOnly(false);
                setSearchQuery("");
              }}
              className="mt-4 rounded-full border border-amber-400/40 px-5 py-2 text-xs font-bold text-amber-400 hover:bg-amber-400/10"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((item) => {
              const isWishlisted = !!wishlist[item.id];

              return (
                <article
                  key={item.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-2 hover:border-amber-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-black/60 sm:p-6"
                >
                  {/* Top Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item.id)}
                    aria-label={`Save ${item.name} to favorites`}
                    className={`absolute right-5 top-5 z-10 rounded-full border p-2.5 backdrop-blur-md transition ${
                      isWishlisted
                        ? "border-rose-500 bg-rose-500/20 text-rose-400"
                        : "border-white/10 bg-black/50 text-white/70 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>

                  <div>
                    {/* Image container */}
                    <div className="relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:h-52">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-108"
                      />

                      {/* Prep time badge */}
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
                        <Clock size={12} className="text-amber-400" />
                        <span>{item.prepTime}</span>
                      </div>
                    </div>

                    {/* Category & Badge */}
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                        {item.categoryLabel}
                      </span>
                      {item.badge && (
                        <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="font-serif mt-2.5 text-xl font-bold leading-snug tracking-tight text-white group-hover:text-amber-300 transition">
                      {item.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/65">
                      {item.description}
                    </p>

                    {/* Dietary Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.dietary.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-400">
                      <Star size={14} fill="currentColor" />
                      <span className="font-bold">{item.rating}</span>
                      <span className="text-[11px] text-white/40">({item.reviewCount})</span>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-white/50">Starts at</span>
                      <p className="text-xl font-black text-amber-400">₹{item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Customize & Book Button */}
                      <button
                        type="button"
                        onClick={() => openProductModal(item)}
                        className="rounded-full bg-amber-400 px-4 py-2.5 text-xs font-bold text-black shadow-md transition hover:scale-105 hover:bg-amber-300 active:scale-95"
                      >
                        Customize & Book
                      </button>

                      {/* Quick Add with standard options */}
                      <button
                        type="button"
                        onClick={() => addToCart(item, {}, 1)}
                        aria-label={`Quick add 1 ${item.name} to cart`}
                        className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white/80 transition hover:border-amber-400 hover:bg-amber-400 hover:text-black"
                        title="Quick add to basket"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

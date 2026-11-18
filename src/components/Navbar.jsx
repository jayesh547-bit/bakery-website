import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "../context/useCart";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItemCount, subtotal, openCart } = useCart();

  const links = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "Custom Cakes", href: "#custom-orders" },
    { label: "Our Story", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit Us", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-40 w-full px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main Navigation"
        className={`mx-auto flex h-20 max-w-7xl items-center justify-between rounded-full border px-5 transition duration-300 sm:px-8 ${
          scrolled
            ? "border-white/15 bg-black/75 shadow-2xl shadow-black/80 backdrop-blur-xl"
            : "border-white/10 bg-black/40 shadow-xl shadow-black/40 backdrop-blur-lg"
        }`}
      >
        {/* Brand Logo & Tagline */}
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-black shadow-md shadow-amber-400/30 transition group-hover:scale-105">
            <span className="font-serif text-xl font-black">S</span>
          </div>
          <div>
            <span className="font-serif block text-xl font-bold tracking-tight text-white sm:text-2xl">
              Sweet Crumbs
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400">
              Artisanal Bakery &bull; Jaipur
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-7 text-xs font-bold uppercase tracking-wider text-white/80 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="transition hover:text-amber-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA & Cart Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`View bakery basket, ${totalItemCount} items`}
            className="group relative flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-white shadow-md transition hover:border-amber-400 hover:bg-white/10"
          >
            <div className="relative">
              <ShoppingBag size={18} className="text-amber-400 transition group-hover:scale-110" />
              {totalItemCount > 0 && (
                <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-black shadow-sm shadow-black animate-warm-pulse">
                  {totalItemCount}
                </span>
              )}
            </div>
            <span className="hidden text-xs font-bold sm:inline-block">
              {totalItemCount > 0 ? `₹${subtotal}` : "Basket"}
            </span>
          </button>

          {/* Primary Action Button */}
          <a
            href="#menu"
            className="hidden rounded-full bg-amber-400 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-md shadow-amber-400/20 transition hover:scale-105 hover:bg-amber-300 md:block"
          >
            Order Online
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white/80 transition hover:bg-white/15 hover:text-white lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-white/10 bg-[#161616]/98 p-6 shadow-2xl shadow-black/80 backdrop-blur-2xl lg:hidden">
          <ul className="space-y-4 text-base font-semibold text-white">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  onClick={() => setOpen(false)}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-white/80 transition hover:bg-white/5 hover:text-amber-400"
                >
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openCart();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-amber-400 transition hover:bg-white/10"
            >
              <ShoppingBag size={18} />
              <span>View Bakery Basket ({totalItemCount} items)</span>
            </button>

            <a
              onClick={() => setOpen(false)}
              href="#menu"
              className="block w-full rounded-full bg-amber-400 px-5 py-3 text-center text-sm font-bold text-black transition hover:bg-amber-300"
            >
              Explore Full Menu & Order
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

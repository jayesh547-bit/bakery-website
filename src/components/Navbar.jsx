import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = ["Home", "Menu", "About", "Gallery", "Contact"];

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/30 px-6 shadow-2xl shadow-black/20 backdrop-blur-xl lg:px-8">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="text-2xl font-black tracking-wide text-white md:text-3xl"
        >
          Sweet Crumbs
        </a>

        <ul className="hidden items-center gap-10 text-sm font-semibold text-white/80 md:flex">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="transition hover:text-amber-400"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#menu"
          className="hidden rounded-full bg-amber-400 px-6 py-3 font-bold text-black transition hover:scale-105 hover:bg-amber-300 md:block"
        >
          Order Now
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="rounded-full border border-white/10 bg-white/10 p-3 text-white transition hover:bg-white/20 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-[#181818]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden">
          <ul className="space-y-5 text-lg font-semibold text-white">
            {links.map((link) => (
              <li key={link}>
                <a
                  onClick={() => setOpen(false)}
                  href={`#${link.toLowerCase()}`}
                  className="block transition hover:text-amber-400"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <a
            onClick={() => setOpen(false)}
            href="#menu"
            className="mt-6 block w-full rounded-full bg-amber-400 px-6 py-4 text-center font-bold text-black transition hover:bg-amber-300"
          >
            Order Now
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
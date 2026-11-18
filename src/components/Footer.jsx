import { Heart, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Artisanal Menu", href: "#menu" },
  { label: "Custom Occasion Cakes", href: "#custom-orders" },
  { label: "Our Story & Heritage", href: "#about" },
  { label: "Visual Gallery", href: "#gallery" },
  { label: "Visit & Contact", href: "#contact" },
];

function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0f0f0f] px-4 py-16 text-white sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Column */}
        <div className="space-y-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-black">
              <span className="font-serif text-lg font-black">S</span>
            </div>
            <div>
              <span className="font-serif block text-2xl font-bold tracking-tight text-white">
                Sweet Crumbs
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400">
                Artisanal Patisserie
              </span>
            </div>
          </a>

          <p className="text-xs leading-relaxed text-white/70">
            Handcrafted celebration cakes, 36-hour slow-fermented sourdough, and flaky French butter viennoiserie baked fresh daily in Vaishali Nagar, Jaipur.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Sweet Crumbs on Instagram"
              className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:border-amber-400 hover:text-amber-400"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Sweet Crumbs on Facebook"
              className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:border-amber-400 hover:text-amber-400"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with Sweet Crumbs on WhatsApp"
              className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:border-emerald-400 hover:text-emerald-400"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-white">
            Quick Navigation
          </h3>
          <ul className="mt-4 space-y-2.5 text-xs text-white/70">
            {quickLinks.map((link) => (
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
        </div>

        {/* Bakery Counter & Hours */}
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-white">
            Bakery Counter
          </h3>
          <div className="mt-4 space-y-3 text-xs text-white/70">
            <div className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-amber-400" />
              <span>Plot 42, Queen's Road, Vaishali Nagar, Jaipur - 302021</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={15} className="shrink-0 text-amber-400" />
              <span>Open Daily: 8:00 AM – 10:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={15} className="shrink-0 text-amber-400" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>

        {/* Dietary & Freshness Pledge */}
        <div>
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-white">
            Artisanal Pledge
          </h3>
          <div className="mt-4 space-y-2 text-xs text-white/70">
            <p className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              🌱 <strong className="text-white">100% Eggless Options</strong>: Clearly segregated and prepared with meticulous hygiene.
            </p>
            <p className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              🌾 <strong className="text-white">Zero Preservatives</strong>: Pure flours, slow cold fermentation, and real French butter.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Sweet Crumbs Bakery. All rights reserved.</p>
        <p className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart size={12} className="text-amber-400" fill="currentColor" />
          <span>in Vaishali Nagar, Jaipur</span>
        </p>
      </div>
    </footer>
  );
}

const quickLinks = ["Home", "Menu", "About", "Gallery", "Contact"];
const socials = ["Instagram", "Facebook", "WhatsApp"];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0F0F0F] px-6 py-12 text-white lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <a href="#home" className="text-3xl font-black text-white">
            Sweet Crumbs
          </a>

          <p className="mt-4 max-w-sm leading-7 text-white/50">
            Premium cakes, artisan breads, pastries, cookies, and desserts baked
            fresh every day.
          </p>
        </div>

        <div>
          <h3 className="font-black text-white">Quick Links</h3>

          <div className="mt-4 flex flex-wrap gap-4 text-white/50">
            {quickLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="transition hover:text-amber-400"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black text-white">Opening Hours</h3>

          <p className="mt-4 text-white/50">Monday - Sunday</p>
          <p className="mt-1 text-white/50">8:00 AM - 10:00 PM</p>

          <div className="mt-5 flex flex-wrap gap-4 text-white/50">
            {socials.map((item) => (
              <a
                key={item}
                href="#contact"
                className="transition hover:text-amber-400"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Sweet Crumbs Bakery. All rights reserved.</p>
        <p>Made fresh with love in Jaipur.</p>
      </div>
    </footer>
  );
}

export default Footer;
import { Sparkles, MessageCircle } from "lucide-react";
import chocolateCake from "../assets/images/chocolate-cake.png";
import { useCart } from "../context/useCart";

export default function CustomOrders() {
  const { openCustomCakeModal } = useCart();

  const leadTimeSteps = [
    {
      step: "01",
      title: "Reserve in Advance",
      time: "24-48 Hours Notice",
      description:
        "Signature celebration cakes require 24 hours; grand multi-tier wedding cakes require 3 to 5 days advance booking.",
    },
    {
      step: "02",
      title: "Bespoke Flavor Profile",
      time: "Personalized",
      description:
        "Choose between Belgian dark ganache, Lotus Biscoff, Tahitian vanilla berries, with 100% eggless options for every recipe.",
    },
    {
      step: "03",
      title: "Artisanal Handcrafting",
      time: "Baked on Event Morning",
      description:
        "Our head patissier hand-pipes custom inscriptions, edible gold leaf, and delicate sugar florals on the morning of your event.",
    },
    {
      step: "04",
      title: "Chilled Safe Delivery",
      time: "Pristine Handling",
      description:
        "Delivered in reinforced temperature-controlled bakery packaging across Jaipur or ready for pickup at our counter.",
    },
  ];

  return (
    <section id="custom-orders" className="reveal bg-[#0f0f0f] px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0f0f0f] p-6 shadow-2xl shadow-black/80 sm:rounded-[2.5rem] sm:p-12 lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Sparkles size={13} />
                <span>Bespoke Celebration Cakes</span>
              </div>

              <h2 className="font-serif mt-5 text-4xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-5xl md:text-6xl">
                Custom occasion cakes baked for your milestones.
              </h2>

              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                Whether celebrating a 25th birthday, an intimate engagement, or a corporate milestone, our bakery custom crafts tiered centerpieces with flawless aesthetic and exceptional flavor.
              </p>

              {/* Lead times list */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {leadTimeSteps.map((s) => (
                  <div
                    key={s.step}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-amber-400/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-amber-400">{s.step}</span>
                      <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                        {s.time}
                      </span>
                    </div>
                    <h3 className="font-serif mt-2 text-base font-bold text-white">{s.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">{s.description}</p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={openCustomCakeModal}
                  className="flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-xs font-bold uppercase tracking-wider text-black shadow-xl shadow-amber-400/20 transition hover:scale-105 hover:bg-amber-300 active:scale-95"
                >
                  <Sparkles size={16} />
                  <span>Design & Pre-Order Now</span>
                </button>

                <a
                  href="https://wa.me/919876543210?text=Hi%20Sweet%20Crumbs%20Bakery!%20I%20would%20like%20to%20inquire%20about%20a%20custom%20cake%20order."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  <MessageCircle size={16} className="text-emerald-400" />
                  <span>Chat with Pastry Chef</span>
                </a>
              </div>
            </div>

            {/* Visual preview column */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
                <img
                  src={chocolateCake}
                  alt="Custom celebration cake with gold leaf and chocolate piping"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        Featured Masterpiece
                      </span>
                      <p className="font-serif text-lg font-bold text-white">
                        Belgian Opera Two-Tier
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-black">
                      From ₹2,499
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/60">
                    Pure Callebaut dark truffle with customized calligraphy piping & gold flakes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

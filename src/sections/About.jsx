import { Clock, Sparkles, Wheat, Heart } from "lucide-react";

const stats = [
  { value: "50+", label: "Fresh Bakes Daily" },
  { value: "10k+", label: "Jaipur Celebrations" },
  { value: "4.9 ★", label: "Customer Rating" },
  { value: "36 hrs", label: "Sourdough Ferment" },
];

const pillars = [
  {
    icon: Clock,
    title: "Baked Fresh at 5:00 AM",
    description:
      "Every croissant, brioche, and artisan loaf is baked before dawn in small batches to guarantee crisp crusts and delicate honeycomb crumbs.",
  },
  {
    icon: Wheat,
    title: "Heritage Stone-Milled Flours",
    description:
      "We source unbleached stone-milled grains and natural wild yeast starters with zero artificial improvers, chemicals, or preservatives.",
  },
  {
    icon: Sparkles,
    title: "Pure Butter & Belgian Chocolate",
    description:
      "Real cultured butter for our 72-layer croissants and single-origin Callebaut dark chocolate for our signature cake ganaches.",
  },
];

export default function About() {
  return (
    <section id="about" className="reveal bg-[#0f0f0f] px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Main Story Hero Block (7 cols) - Signature Amber Card */}
          <div className="flex flex-col justify-between rounded-3xl bg-amber-400 p-7 text-black shadow-2xl sm:rounded-[2.5rem] sm:p-12 lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-black">
                <Heart size={13} />
                <span>Our Bakery Heritage</span>
              </div>

              <h2 className="font-serif mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight sm:text-4xl md:text-5xl">
                Born in Jaipur. Crafted with old-world European discipline.
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-black/80 sm:text-base">
                Sweet Crumbs started with a humble passion: to bring the authentic aroma of Parisian boulangeries and traditional sourdough bakeries to Jaipur, without compromising on vegetarian and eggless baking traditions.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-black/75 sm:text-base">
                From our 36-hour slow-fermented country sourdough to our velvet eggless birthday cakes, every creation honors time-tested fermentation techniques, patient resting, and hand-finished presentation.
              </p>
            </div>

            {/* Stats Row */}
            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-black/15 pt-8 sm:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl bg-black/10 p-3.5 text-center">
                  <p className="font-serif text-2xl font-black sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-black/70">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pillars Column (5 cols) - Dark Black Cards */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="flex-1 rounded-3xl border border-white/10 bg-white/6 p-6 transition duration-300 hover:border-amber-400/40 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-amber-400/20 p-2.5 text-amber-400">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/65">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

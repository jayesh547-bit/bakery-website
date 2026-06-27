import { Award, Clock, Sparkles } from "lucide-react";

const stats = [
  { value: "50+", label: "Fresh Items" },
  { value: "5k+", label: "Happy Orders" },
  { value: "4.9", label: "Customer Rating" },
];

const features = [
  {
    icon: Clock,
    title: "Baked Fresh",
    text: "Every product is prepared in small batches every morning for better taste, softness, and freshness.",
  },
  {
    icon: Sparkles,
    title: "Premium Ingredients",
    text: "We use rich chocolate, real butter, fresh cream, quality flour, and carefully selected flavors.",
  },
  {
    icon: Award,
    title: "Made for Moments",
    text: "From birthdays to celebrations, our desserts are designed to make every moment feel special.",
  },
];

function About() {
  return (
   <section className="reveal bg-[#0F0F0F] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-4xl bg-amber-400 p-6 text-black sm:rounded-[3rem] sm:p-10 lg:p-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] sm:text-sm sm:tracking-[0.3em]">
            About Sweet Crumbs
          </p>

          <h2 className="mt-5 max-w-full wrap-break-word text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Handcrafted bakery made fresh every day.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-black/70 sm:mt-8 sm:text-lg sm:leading-8">
            We create premium cakes, breads, pastries, cookies, and desserts
            using traditional baking methods, rich ingredients, and modern
            presentation.
          </p>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl bg-black/10 p-5 text-center sm:p-6"
              >
                <h3 className="text-3xl font-black sm:text-4xl">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm font-semibold text-black/60">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:gap-6">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-4xl border border-white/10 bg-white/6 p-6 transition hover:-translate-y-2 hover:bg-white/10 sm:p-8"
              >
                <Icon className="text-amber-400" size={34} />

                <h3 className="mt-5 text-2xl font-black sm:mt-6 sm:text-3xl">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-white/60">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default About;
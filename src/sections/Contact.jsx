import { Clock, MapPin, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    text: "+91 98765 43210",
  },
  {
    icon: MapPin,
    title: "Bakery Location",
    text: "Vaishali Nagar, Jaipur",
  },
  {
    icon: Clock,
    title: "Open Daily",
    text: "8:00 AM - 10:00 PM",
  },
];

function Contact() {
  return (
   <section className="reveal bg-[#0F0F0F] px-6 py-24 text-white sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl border border-white/10 bg-white/6 p-8 text-center sm:rounded-[3rem] sm:p-10 lg:p-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Visit Us
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
          Order fresh bakery today.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/60">
          Available for pickup, custom cakes, birthday orders, and daily fresh
          bakery delivery.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {contactInfo.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-4xl border border-white/10 bg-black/20 p-6"
              >
                <Icon className="mx-auto text-amber-400" size={32} />
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-white/60">{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="tel:+919876543210"
            className="rounded-full bg-amber-400 px-8 py-4 font-semibold text-black transition hover:scale-105 hover:bg-amber-300"
          >
            Call Now
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Vaishali+Nagar+Jaipur"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
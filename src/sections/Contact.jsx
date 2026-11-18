import { useState } from "react";
import { Clock, MapPin, Phone, Send, CheckCircle2, MessageCircle } from "lucide-react";

export default function Contact() {
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formOccasion, setFormOccasion] = useState("Custom Cake Consultation");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formContact.trim() || !formMessage.trim()) {
      setErrorMsg("Please complete all required fields before sending.");
      return;
    }
    setErrorMsg("");
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="reveal bg-[#0f0f0f] px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] to-[#0f0f0f] p-6 shadow-2xl sm:rounded-[2.5rem] sm:p-12 lg:p-16">
          {/* Section Header */}
          <div className="text-center">
            <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
              Visit & Connect
            </span>
            <h2 className="font-serif mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
              Visit our Jaipur patisserie or plan an event.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Step into our aroma-filled counter in Vaishali Nagar, grab freshly baked breakfast croissants, or collaborate with our chefs for custom catering.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 items-start">
            {/* Left Contact Cards (5 cols) */}
            <div className="space-y-4 lg:col-span-5">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-400/30">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-amber-400/20 p-3 text-amber-400">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">Bakery Location</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                      Plot 42, Main Queen's Road, Near Vaishali Circle, Vaishali Nagar, Jaipur, Rajasthan 302021
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Vaishali+Nagar+Jaipur"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-xs font-bold text-amber-400 transition hover:underline"
                    >
                      Open Google Maps &rarr;
                    </a>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-400/30">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-amber-400/20 p-3 text-amber-400">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">Opening Hours</h3>
                    <p className="mt-1 text-xs text-white/70">
                      Monday to Sunday &bull; 8:00 AM – 10:00 PM
                    </p>
                    <p className="mt-0.5 text-[11px] text-amber-300">
                      Fresh viennoiserie batch ready by 8:00 AM daily
                    </p>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-400/30">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-amber-400/20 p-3 text-amber-400">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">Call & WhatsApp</h3>
                    <p className="mt-1 text-xs text-white/70">
                      Direct bakery counter: +91 98765 43210
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href="tel:+919876543210"
                        className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white transition hover:bg-white/20"
                      >
                        Call Now
                      </a>
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 rounded-full bg-emerald-600/30 px-3.5 py-1 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-600/50"
                      >
                        <MessageCircle size={12} />
                        <span>WhatsApp Chat</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Right Interactive Inquiry Form (7 cols) */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:col-span-7">
              {isSubmitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-serif mt-4 text-2xl font-bold text-white">
                    Inquiry Received!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-white/70">
                    Thank you, <strong>{formName}</strong>! Our head pastry coordinator will call you back at <strong>{formContact}</strong> shortly to discuss your request.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormName("");
                      setFormContact("");
                      setFormMessage("");
                    }}
                    className="mt-6 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">
                      Direct Chef Inquiry & Special Orders
                    </h3>
                    <p className="text-xs text-white/60">
                      Have a query about custom wedding tiers, bulk corporate hampers, or dietary requests? Drop us a note!
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-xs font-semibold text-white/70 mb-1">
                        Your Name *
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g., Priya Kapoor"
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-contact" className="block text-xs font-semibold text-white/70 mb-1">
                        Phone or Email *
                      </label>
                      <input
                        id="inquiry-contact"
                        type="text"
                        value={formContact}
                        onChange={(e) => setFormContact(e.target.value)}
                        placeholder="e.g., +91 98765 00000"
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry-type" className="block text-xs font-semibold text-white/70 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      id="inquiry-type"
                      value={formOccasion}
                      onChange={(e) => setFormOccasion(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Custom Cake Consultation">Custom Cake Consultation</option>
                      <option value="Wedding Tier Cake">Wedding Tier Cake</option>
                      <option value="Corporate Gift Hampers">Corporate Gift Hampers</option>
                      <option value="Party Bulk Bakes">Party Bulk Pastry Order</option>
                      <option value="Special Dietary Inquiry">Special Dietary / Allergy Request</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inquiry-message" className="block text-xs font-semibold text-white/70 mb-1">
                      Message & Requirements *
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Tell us about your event date, expected guests, or preferred flavors..."
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 active:scale-[0.99]"
                  >
                    <Send size={15} />
                    <span>Send Inquiry to Bakery</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

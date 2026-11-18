import { useState, useEffect } from "react";
import { X, Sparkles, Clock, Check } from "lucide-react";
import { useCart } from "../context/useCart";
import chocolateCake from "../assets/images/chocolate-cake.png";

const CAKE_OCCASIONS = [
  "Birthday Celebration",
  "Anniversary",
  "Wedding / Engagement Tier",
  "Milestone & Baby Shower",
  "Corporate Event",
];

const CAKE_TIERS = [
  { label: "1kg (Serves 8-10)", price: 1299 },
  { label: "1.5kg (Serves 12-15)", price: 1849 },
  { label: "2kg Two-Tier (Serves 18-22)", price: 2499 },
  { label: "3kg Grand Tier (Serves 30+)", price: 3699 },
];

const FLAVORS = [
  "Belgian Dark Chocolate Truffle",
  "Lotus Biscoff & Salted Caramel",
  "Madagascar Vanilla & Fresh Strawberries",
  "Ferrero Rocher & Hazelnut Praline",
  "Red Velvet with Cream Cheese",
  "Tiramisu Espresso Cream",
];

export default function CustomCakeModal() {
  const { customCakeModalOpen, closeCustomCakeModal, addToCart } = useCart();

  const [occasion, setOccasion] = useState(CAKE_OCCASIONS[0]);
  const [tierIndex, setTierIndex] = useState(0);
  const [flavor, setFlavor] = useState(FLAVORS[0]);
  const [dietary, setDietary] = useState("100% Eggless (Standard)");
  const [inscription, setInscription] = useState("");
  const [designNotes, setDesignNotes] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeCustomCakeModal();
    };
    if (customCakeModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [customCakeModalOpen, closeCustomCakeModal]);

  if (!customCakeModalOpen) return null;

  const selectedTier = CAKE_TIERS[tierIndex];

  const handleAddCustomCakeToCart = () => {
    const customProduct = {
      id: "custom-bespoke-cake",
      name: `Custom ${occasion} Cake`,
      category: "custom",
      categoryLabel: "Custom Occasion",
      price: selectedTier.price,
      image: chocolateCake,
      isEggless: dietary.includes("Eggless"),
      allowCustomMessage: true,
    };

    addToCart(
      customProduct,
      {
        size: selectedTier.label,
        extraPrice: 0,
        flavor,
        dietary,
        customMessage: inscription
          ? `${inscription}${designNotes ? ` | Theme: ${designNotes}` : ""}`
          : designNotes || "Custom Design",
        isCustomOrder: true,
      },
      1
    );

    closeCustomCakeModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-cake-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={closeCustomCakeModal}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#161616] text-white shadow-2xl shadow-black/80">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#161616]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Sparkles size={14} />
              <span>Bespoke Pre-Order</span>
            </span>
            <span className="text-xs text-white/60">24-48h Advance Baking</span>
          </div>
          <button
            type="button"
            onClick={closeCustomCakeModal}
            aria-label="Close dialog"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/15 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 id="custom-cake-modal-title" className="font-serif text-3xl font-extrabold sm:text-4xl text-white">
              Design Your Celebration Cake
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Each custom cake is individually sculpted by our head pastry chefs with gourmet Belgian chocolate, hand-piped florals, or edible 24K gold accents.
            </p>
          </div>

          {/* Lead Time Notice Alert */}
          <div className="flex items-start gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-xs text-amber-300">
            <Clock size={18} className="mt-0.5 shrink-0" />
            <div>
              <strong className="block font-bold text-white">Lead Time Requirement</strong>
              <span>Custom tiered cakes require a minimum of 24 to 48 hours for delicate sponge setting and hand-piped detailing.</span>
            </div>
          </div>

          {/* Occasion Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              1. Select Occasion
            </label>
            <div className="flex flex-wrap gap-2">
              {CAKE_OCCASIONS.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setOccasion(occ)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    occasion === occ
                      ? "border-amber-400 bg-amber-400 text-black"
                      : "border-white/10 bg-white/5 text-white/80 hover:border-white/20"
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Tier & Size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              2. Choose Size & Servings
            </label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {CAKE_TIERS.map((tier, idx) => {
                const isSelected = tierIndex === idx;
                return (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setTierIndex(idx)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition ${
                      isSelected
                        ? "border-amber-400 bg-amber-400/15 text-white ring-1 ring-amber-400"
                        : "border-white/10 bg-white/5 text-white/80 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold">{tier.label}</p>
                      <p className="text-xs text-amber-300 font-semibold">₹{tier.price}</p>
                    </div>
                    {isSelected && <Check size={18} className="text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flavor Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              3. Signature Flavor & Sponge
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {FLAVORS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFlavor(f)}
                  className={`rounded-xl border p-3 text-left text-xs font-semibold transition ${
                    flavor === f
                      ? "border-amber-400 bg-amber-400 text-black font-bold"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Choice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
              4. Dietary Preference
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "100% Eggless (Standard)",
                "Regular (Rich Buttercream)",
                "Gluten-Friendly Sponge (+₹200)",
              ].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDietary(d)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    dietary === d
                      ? "border-amber-400 bg-amber-400/20 text-amber-300"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Piping Inscription */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="custom-inscription" className="text-xs font-bold uppercase tracking-wider text-white/70">
                5. Piping Inscription on Cake
              </label>
              <span className="text-xs text-white/50">{inscription.length}/40 characters</span>
            </div>
            <input
              id="custom-inscription"
              type="text"
              maxLength={40}
              value={inscription}
              onChange={(e) => setInscription(e.target.value)}
              placeholder="e.g., Happy 25th Anniversary Mom & Dad ❤️"
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Design Theme Notes */}
          <div>
            <label htmlFor="custom-theme-notes" className="text-xs font-bold uppercase tracking-wider text-white/70 block mb-1">
              6. Theme or Color Palette Requests (Optional)
            </label>
            <textarea
              id="custom-theme-notes"
              rows={2}
              value={designNotes}
              onChange={(e) => setDesignNotes(e.target.value)}
              placeholder="e.g., Pastel blush pink florals, gold dust edging, chocolate drip finish"
              className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Bottom Action */}
          <div className="flex items-center justify-between border-t border-white/10 pt-5">
            <div>
              <span className="text-xs text-white/60">Estimated Total:</span>
              <p className="text-2xl font-black text-amber-400">₹{selectedTier.price}</p>
            </div>

            <button
              type="button"
              onClick={handleAddCustomCakeToCart}
              className="flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 font-bold text-black shadow-lg shadow-amber-400/25 transition hover:bg-amber-300 active:scale-[0.98]"
            >
              <Sparkles size={18} />
              <span>Add Custom Cake to Basket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

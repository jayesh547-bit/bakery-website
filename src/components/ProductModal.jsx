import { useState, useEffect } from "react";
import { X, Check, Star, Clock, ShieldCheck, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/useCart";

export default function ProductModal() {
  const { activeProductModal, closeProductModal, addToCart } = useCart();
  const product = activeProductModal;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedDietary, setSelectedDietary] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedSizeIndex(0);
      setSelectedFlavor(product.options?.flavors?.[0] || "");
      setSelectedDietary(
        product.options?.dietaryChoices?.[0] || (product.isEggless ? "100% Eggless" : "Standard")
      );
      setCustomMessage("");
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeProductModal();
    };
    if (product) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, closeProductModal]);

  if (!product) return null;

  const selectedSize = product.options?.sizes?.[selectedSizeIndex];
  const extraPrice = selectedSize?.extraPrice || 0;
  const currentUnitPrice = product.price + extraPrice;
  const currentTotalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(
      product,
      {
        size: selectedSize?.label || "Standard",
        extraPrice,
        flavor: selectedFlavor,
        dietary: selectedDietary,
        customMessage,
      },
      quantity
    );
    closeProductModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={closeProductModal}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#161616] text-white shadow-2xl shadow-black/80">
        {/* Header bar with close */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#161616]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
              {product.categoryLabel}
            </span>
            {product.badge && (
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                {product.badge}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeProductModal}
            aria-label="Close dialog"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/15 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Top Info Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/50">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md">
                <Star size={14} fill="currentColor" />
                <span>{product.rating}</span>
                <span className="text-white/50">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div>
              <h2 id="product-modal-title" className="font-serif text-2xl font-bold leading-tight sm:text-3xl text-white">
                {product.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {product.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-white/80">
                  <Clock size={14} className="text-amber-400" />
                  <span>{product.prepTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/80">
                  <ShieldCheck size={14} className="text-amber-400" />
                  <span>100% Artisanal Guarantee</span>
                </div>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-amber-400">
                  ₹{currentUnitPrice}
                </span>
                {extraPrice > 0 && (
                  <span className="text-xs text-white/60">
                    (Base ₹{product.price} + ₹{extraPrice} upgrade)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Options Section */}
          <div className="mt-8 space-y-6 border-t border-white/10 pt-6">
            {/* Size / Portion Selection */}
            {product.options?.sizes && product.options.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold tracking-wide text-white/90">
                  Select Size / Quantity
                </label>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                  {product.options.sizes.map((size, idx) => {
                    const isSelected = selectedSizeIndex === idx;
                    return (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`flex flex-col rounded-xl border p-3 text-left transition ${
                          isSelected
                            ? "border-amber-400 bg-amber-400/15 text-white ring-1 ring-amber-400"
                            : "border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <span className="text-sm font-semibold">{size.label}</span>
                        <span className="mt-1 text-xs text-amber-300 font-bold">
                          {size.extraPrice === 0 ? "Standard price" : `+₹${size.extraPrice}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Flavor / Variant Selection */}
            {product.options?.flavors && product.options.flavors.length > 0 && (
              <div>
                <label className="block text-sm font-semibold tracking-wide text-white/90">
                  Select Flavor / Finish
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.options.flavors.map((flavor) => {
                    const isSelected = selectedFlavor === flavor;
                    return (
                      <button
                        key={flavor}
                        type="button"
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                          isSelected
                            ? "border-amber-400 bg-amber-400 text-black"
                            : "border-white/10 bg-white/5 text-white/80 hover:border-white/20"
                        }`}
                      >
                        {isSelected && <Check size={14} />}
                        <span>{flavor}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dietary Preference Selection */}
            {product.options?.dietaryChoices && product.options.dietaryChoices.length > 0 && (
              <div>
                <label className="block text-sm font-semibold tracking-wide text-white/90">
                  Dietary Preparation
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.options.dietaryChoices.map((diet) => {
                    const isSelected = selectedDietary === diet;
                    return (
                      <button
                        key={diet}
                        type="button"
                        onClick={() => setSelectedDietary(diet)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                          isSelected
                            ? "border-amber-400 bg-amber-400/20 text-amber-300"
                            : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                        }`}
                      >
                        {diet}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Piping Message (Cakes & Custom) */}
            {product.allowCustomMessage && (
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="cake-piping-message" className="text-sm font-semibold tracking-wide text-white/90">
                    Piped Cake Message (Complimentary)
                  </label>
                  <span className="text-xs text-white/50">{customMessage.length}/40 characters</span>
                </div>
                <input
                  id="cake-piping-message"
                  type="text"
                  maxLength={40}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g., Happy 30th Birthday Rahul! 🎉"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            )}

            {/* Quantity Selector & Add Button */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white/80">Quantity:</span>
                <div className="flex items-center rounded-full border border-white/15 bg-black/60 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-30"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    aria-label="Increase quantity"
                    className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 font-bold text-black shadow-lg shadow-amber-400/20 transition hover:scale-[1.02] hover:bg-amber-300 active:scale-[0.98]"
              >
                <ShoppingBag size={18} />
                <span>Add to Cart • ₹{currentTotalPrice}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

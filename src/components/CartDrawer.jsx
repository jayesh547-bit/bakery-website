import { useState } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Calendar,
  Truck,
  Store,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "../context/useCart";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    openConfirmation,
  } = useCart();

  const [fulfillment, setFulfillment] = useState("pickup"); // 'pickup' | 'delivery'
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  // Calculate minimum selectable date (today formatted as YYYY-MM-DD)
  const today = new Date();
  const minDateStr = today.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(minDateStr);
  const [selectedSlot, setSelectedSlot] = useState("09:00 AM - 12:00 PM");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = fulfillment === "delivery" ? 50 : 0;
  const taxesAndPackaging = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryFee + taxesAndPackaging;

  const validateForm = () => {
    const errs = {};
    if (!customerName.trim()) {
      errs.name = "Full name is required";
    }
    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Valid 10-digit mobile number required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.trim() || !emailRegex.test(customerEmail.trim())) {
      errs.email = "Valid email address required";
    }
    if (fulfillment === "delivery" && !deliveryAddress.trim()) {
      errs.address = "Delivery address in Jaipur is required";
    }
    if (!selectedDate) {
      errs.date = "Please select a pickup/delivery date";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `SC-${today.getFullYear()}-${randomHex}`;

    const orderPayload = {
      bookingId,
      createdAt: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      customer: {
        name: customerName.trim(),
        phone: customerPhone.trim(),
        email: customerEmail.trim(),
        address: fulfillment === "delivery" ? deliveryAddress.trim() : "Store Pickup (Vaishali Nagar)",
      },
      fulfillment,
      date: selectedDate,
      timeSlot: selectedSlot,
      specialNotes: specialNotes.trim(),
      items: [...items],
      pricing: {
        subtotal,
        deliveryFee,
        taxesAndPackaging,
        grandTotal,
      },
    };

    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      openConfirmation(orderPayload);
    }, 450);
  };

  if (!isCartOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6">
        <aside className="w-screen max-w-xl bg-[#141414] text-white shadow-2xl flex flex-col border-l border-white/10">
          {/* Cart Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-[#181818]">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-400/20 p-2 text-amber-400">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h2 id="cart-drawer-title" className="font-serif text-xl font-bold">
                  Bakery Basket & Booking
                </h2>
                <p className="text-xs text-white/60">
                  {items.length === 0
                    ? "0 items"
                    : `${items.reduce((s, i) => s + i.quantity, 0)} items in your basket`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-white/50 transition hover:text-amber-400"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="rounded-full border border-white/10 bg-white/5 p-6 text-amber-400">
                  <ShoppingBag size={48} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif mt-5 text-2xl font-bold">Your basket is empty</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
                  Our ovens are warm and artisanal sourdough, fresh croissants, and Belgian cakes are waiting for you.
                </p>
                <a
                  href="#menu"
                  onClick={closeCart}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-black transition hover:bg-amber-300"
                >
                  <span>Explore Menu</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Items List */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Selected Items ({items.length})
                  </h3>

                  {items.map((item) => (
                    <article
                      key={item.cartItemId}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/60">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-base font-bold leading-snug">
                              {item.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.cartItemId)}
                              aria-label={`Remove ${item.name} from basket`}
                              className="text-white/40 transition hover:text-rose-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-white/65">
                            <span className="rounded bg-white/10 px-2 py-0.5">{item.selectedSize}</span>
                            {item.selectedFlavor && (
                              <span className="rounded bg-white/10 px-2 py-0.5">{item.selectedFlavor}</span>
                            )}
                            {item.selectedDietary && (
                              <span className="rounded bg-amber-400/15 px-2 py-0.5 text-amber-300">
                                {item.selectedDietary}
                              </span>
                            )}
                          </div>

                          {item.customMessage && (
                            <p className="mt-2 rounded-lg bg-amber-400/10 px-2.5 py-1 text-xs italic text-amber-300">
                              &ldquo;{item.customMessage}&rdquo;
                            </p>
                          )}
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                          <span className="text-sm font-extrabold text-amber-400">
                            ₹{item.unitPrice * item.quantity}
                          </span>

                          <div className="flex items-center rounded-full border border-white/15 bg-black/60 p-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Fulfillment Mode Toggle */}
                <div className="rounded-2xl border border-white/10 bg-[#1c1c1c] p-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Fulfillment Preference
                  </label>
                  <div className="mt-2.5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillment("pickup")}
                      className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition ${
                        fulfillment === "pickup"
                          ? "border-amber-400 bg-amber-400/15 text-amber-300"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                      }`}
                    >
                      <Store size={16} />
                      <span>Store Pickup (Free)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillment("delivery")}
                      className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition ${
                        fulfillment === "delivery"
                          ? "border-amber-400 bg-amber-400/15 text-amber-300"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                      }`}
                    >
                      <Truck size={16} />
                      <span>Local Delivery (+₹50)</span>
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-white/50">
                    {fulfillment === "pickup"
                      ? "📍 Pick up fresh at our bakery counter in Vaishali Nagar, Jaipur."
                      : "🚚 Hand-delivered with temperature-controlled bakery packaging in Jaipur."}
                  </p>
                </div>

                {/* Date & Time Slot Picker */}
                <div className="rounded-2xl border border-white/10 bg-[#1c1c1c] p-4 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60">
                    <Calendar size={14} className="text-amber-400" />
                    <span>Preferred Date & Time Slot</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="order-date" className="block text-xs text-white/70 mb-1">
                        Date (Blocking past dates)
                      </label>
                      <input
                        id="order-date"
                        type="date"
                        min={minDateStr}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                      {errors.date && (
                        <p className="mt-1 text-xs text-rose-400">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="order-slot" className="block text-xs text-white/70 mb-1">
                        Time Slot
                      </label>
                      <select
                        id="order-slot"
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</option>
                        <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                        <option value="03:00 PM - 06:00 PM">Evening (03:00 PM - 06:00 PM)</option>
                        <option value="06:00 PM - 08:30 PM">Night Fresh (06:00 PM - 08:30 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="rounded-2xl border border-white/10 bg-[#1c1c1c] p-4 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
                    Your Contact & Delivery Information
                  </h3>

                  <div>
                    <label htmlFor="cust-name" className="block text-xs text-white/70 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="cust-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g., Ananya Sharma"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cust-phone" className="block text-xs text-white/70 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="cust-phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g., 9876543210"
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
                      />
                      {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="cust-email" className="block text-xs text-white/70 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="cust-email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g., ananya@example.com"
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
                      />
                      {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                    </div>
                  </div>

                  {fulfillment === "delivery" && (
                    <div>
                      <label htmlFor="cust-address" className="block text-xs text-white/70 mb-1">
                        Delivery Address in Jaipur *
                      </label>
                      <textarea
                        id="cust-address"
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Flat/House No., Street, Landmark, Vaishali Nagar / C-Scheme, Jaipur"
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
                      />
                      {errors.address && (
                        <p className="mt-1 text-xs text-rose-400">{errors.address}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label htmlFor="cust-notes" className="block text-xs text-white/70 mb-1">
                      Baker Notes & Dietary Allergies (Optional)
                    </label>
                    <input
                      id="cust-notes"
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g., Ring doorbell, strictly nut-free allergy"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-2">
                  <div className="flex justify-between text-white/70">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>
                      {fulfillment === "delivery" ? "Local Delivery (Jaipur)" : "Store Pickup"}
                    </span>
                    <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Packaging & Taxes (5% GST)</span>
                    <span>₹{taxesAndPackaging}</span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-white/10 pt-2 text-sm font-bold text-white">
                    <span>Total Amount</span>
                    <span className="text-xl font-extrabold text-amber-400">₹{grandTotal}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer Action */}
          {items.length > 0 && (
            <div className="border-t border-white/10 bg-[#181818] p-5">
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-4 font-bold text-black shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 active:scale-[0.99] disabled:opacity-50"
              >
                <ShieldCheck size={18} />
                <span>
                  {isSubmitting
                    ? "Generating Booking Reference..."
                    : `Confirm & Book Order • ₹${grandTotal}`}
                </span>
              </button>
              <p className="mt-2 text-center text-[11px] text-white/50">
                🔒 Pay on pickup or UPI upon delivery. Confirmation sent via SMS & WhatsApp.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

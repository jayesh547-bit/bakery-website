import { useState } from "react";
import { CheckCircle2, Copy, Check, MessageCircle, Store, Truck, Calendar, X, ArrowRight } from "lucide-react";
import { useCart } from "../context/useCart";

export default function OrderConfirmationModal() {
  const { orderConfirmation, closeConfirmation } = useCart();
  const [copied, setCopied] = useState(false);

  if (!orderConfirmation) return null;

  const {
    bookingId,
    createdAt,
    customer,
    fulfillment,
    date,
    timeSlot,
    specialNotes,
    items,
    pricing,
  } = orderConfirmation;

  const handleCopyId = () => {
    navigator.clipboard?.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Sweet Crumbs Bakery! 🥐\nI have just booked order *${bookingId}* for ${fulfillment === "delivery" ? "Delivery" : "Store Pickup"} on *${date}* (${timeSlot}).\nCustomer: ${customer.name} (${customer.phone})\nTotal: ₹${pricing.grandTotal}.\nPlease confirm preparation!`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={closeConfirmation}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#161616] text-white shadow-2xl shadow-black/90">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#181818] px-6 py-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Order Booked Successfully
          </span>
          <button
            type="button"
            onClick={closeConfirmation}
            aria-label="Close confirmation"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/15 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Header checkmark */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/20 text-amber-400 ring-8 ring-amber-400/10">
              <CheckCircle2 size={36} />
            </div>
            <h2 id="confirmation-modal-title" className="font-serif mt-4 text-3xl font-extrabold sm:text-4xl text-white">
              Fresh Bakes Confirmed!
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Thank you, <strong className="text-white">{customer.name}</strong>! Your artisanal order has been scheduled in our morning bake rotation.
            </p>

            {/* Booking Reference Pill */}
            <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-amber-400/40 bg-amber-400/10 px-5 py-3">
              <span className="text-xs uppercase tracking-wider text-white/60">Booking ID:</span>
              <span className="font-mono text-lg font-black text-amber-300">{bookingId}</span>
              <button
                type="button"
                onClick={handleCopyId}
                aria-label="Copy booking reference ID"
                className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Fulfillment Details Card */}
          <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-amber-400/20 p-2 text-amber-400">
                {fulfillment === "delivery" ? <Truck size={16} /> : <Store size={16} />}
              </div>
              <div>
                <p className="font-semibold text-white/50">Fulfillment Type</p>
                <p className="mt-0.5 text-sm font-bold text-white capitalize">
                  {fulfillment === "delivery" ? "Local Delivery (Jaipur)" : "Store Pickup (Vaishali Nagar)"}
                </p>
                <p className="text-[11px] text-white/50">{customer.address}</p>
                <p className="mt-1 text-[10px] text-white/40">Booked: {createdAt}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-amber-400/20 p-2 text-amber-400">
                <Calendar size={16} />
              </div>
              <div>
                <p className="font-semibold text-white/50">Scheduled Slot</p>
                <p className="mt-0.5 text-sm font-bold text-amber-300">{date}</p>
                <p className="text-[11px] text-white/70">{timeSlot}</p>
                {specialNotes && (
                  <p className="mt-1 text-[10px] text-amber-300/80 italic">Notes: {specialNotes}</p>
                )}
              </div>
            </div>
          </div>

          {/* Ordered Items Itemized Breakdown */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
              Order Summary ({items.length} item{items.length > 1 ? "s" : ""})
            </h3>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-black/60 p-4 text-xs">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between border-b border-white/5 py-2 last:border-none"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-lg object-cover border border-white/10"
                    />
                    <div>
                      <p className="font-bold text-white">
                        {item.name} <span className="text-amber-400">× {item.quantity}</span>
                      </p>
                      <p className="text-[11px] text-white/60">
                        {item.selectedSize} • {item.selectedFlavor || item.selectedDietary}
                      </p>
                      {item.customMessage && (
                        <p className="text-[11px] text-amber-300 italic">
                          Message: &ldquo;{item.customMessage}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-white">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}

              <div className="pt-3 border-t border-white/10 space-y-1.5 text-white/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{pricing.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{pricing.deliveryFee === 0 ? "FREE" : `₹${pricing.deliveryFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging & Tax (5%)</span>
                  <span>₹{pricing.taxesAndPackaging}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-base font-extrabold text-white">
                  <span>Total Due</span>
                  <span className="text-xl text-amber-400">₹{pricing.grandTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-700/25 transition hover:bg-emerald-500"
            >
              <MessageCircle size={18} />
              <span>Confirm on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={closeConfirmation}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <span>Back to Bakery</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

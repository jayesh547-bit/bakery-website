import { useEffect, useState } from "react";
import { CartContext } from "./CartContextInstance";

const CART_STORAGE_KEY = "sweet_crumbs_cart_v2";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [customCakeModalOpen, setCustomCakeModalOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [items]);

  // Lock body scroll when cart or modal is open
  useEffect(() => {
    const isAnyOpen = isCartOpen || !!activeProductModal || customCakeModalOpen || !!orderConfirmation;
    if (isAnyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen, activeProductModal, customCakeModalOpen, orderConfirmation]);

  const addToCart = (product, selectedOptions = {}, quantity = 1) => {
    const size = selectedOptions.size || product.options?.sizes?.[0]?.label || "Standard";
    const extraPrice = selectedOptions.extraPrice || 0;
    const flavor = selectedOptions.flavor || product.options?.flavors?.[0] || "";
    const dietary = selectedOptions.dietary || product.options?.dietaryChoices?.[0] || (product.isEggless ? "100% Eggless" : "Standard");
    const customMessage = selectedOptions.customMessage ? selectedOptions.customMessage.trim() : "";

    const unitPrice = product.price + extraPrice;
    const cartItemId = `${product.id}__${size}__${flavor}__${dietary}__${customMessage}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          cartItemId,
          id: product.id,
          name: product.name,
          categoryLabel: product.categoryLabel,
          image: product.image,
          unitPrice,
          basePrice: product.price,
          selectedSize: size,
          selectedFlavor: flavor,
          selectedDietary: dietary,
          customMessage,
          quantity,
          isCustomOrder: !!selectedOptions.isCustomOrder,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQuantity } : i))
    );
  };

  const removeFromCart = (cartItemId) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openProductModal = (product) => setActiveProductModal(product);
  const closeProductModal = () => setActiveProductModal(null);

  const openCustomCakeModal = () => setCustomCakeModalOpen(true);
  const closeCustomCakeModal = () => setCustomCakeModalOpen(false);

  const openConfirmation = (orderData) => {
    setOrderConfirmation(orderData);
    setIsCartOpen(false);
  };
  const closeConfirmation = () => setOrderConfirmation(null);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemCount,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        activeProductModal,
        openProductModal,
        closeProductModal,
        customCakeModalOpen,
        openCustomCakeModal,
        closeCustomCakeModal,
        orderConfirmation,
        openConfirmation,
        closeConfirmation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

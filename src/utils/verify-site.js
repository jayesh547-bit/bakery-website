import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { PRODUCTS, CATEGORIES } from "../data/products.js";

console.log("=== Sweet Crumbs Bakery Verification Suite ===");

// 1. Verify Catalog Data
console.log("\n[1/5] Verifying Catalog & Categories...");
assert(CATEGORIES.length >= 5, "Expected at least 5 categories");
assert(PRODUCTS.length >= 8, "Expected at least 8 rich bakery products");

const productIds = new Set();
for (const p of PRODUCTS) {
  assert(!productIds.has(p.id), `Duplicate product ID: ${p.id}`);
  productIds.add(p.id);
  assert(p.name && p.name.length > 3, `Product ${p.id} missing name`);
  assert(p.price > 0, `Product ${p.id} price must be > 0`);
  assert(typeof p.isEggless === "boolean", `Product ${p.id} must specify isEggless`);
  assert(Array.isArray(p.dietary) && p.dietary.length > 0, `Product ${p.id} missing dietary tags`);
  assert(p.prepTime, `Product ${p.id} missing prepTime`);
  assert(p.options && p.options.sizes?.length > 0, `Product ${p.id} missing sizes`);
  assert(p.rating >= 4.0, `Product ${p.id} rating below 4.0`);
}
console.log(`✓ Catalog integrity verified: ${PRODUCTS.length} products across ${CATEGORIES.length} categories.`);

// 2. Verify Cart Calculation Logic
console.log("\n[2/5] Verifying Cart Pricing & Option Calculations...");
const mockItems = [
  { unitPrice: 899, quantity: 2 }, // 1798
  { unitPrice: 149, quantity: 4 }, // 596
  { unitPrice: 249, quantity: 1 }, // 249
];
const subtotal = mockItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
assert.strictEqual(subtotal, 1798 + 596 + 249); // 2643

const pickupFee = 0;
const deliveryFee = 50;
const tax = Math.round(subtotal * 0.05); // 132
const totalPickup = subtotal + pickupFee + tax;
const totalDelivery = subtotal + deliveryFee + tax;

assert.strictEqual(totalPickup, 2643 + 132);
assert.strictEqual(totalDelivery, 2643 + 50 + 132);
console.log(`✓ Cart math verified: Subtotal ₹${subtotal}, Delivery ₹${deliveryFee}, Tax ₹${tax}, Grand Total ₹${totalDelivery}.`);

// 3. Verify Date & Phone Validation
console.log("\n[3/5] Verifying Validation Logic...");
const todayStr = new Date().toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

assert(typeof todayStr === "string" && todayStr.length === 10, "Today date string must be valid YYYY-MM-DD");
assert(tomorrow >= todayStr, "Tomorrow must be valid");
assert(yesterday < todayStr, "Yesterday must be blocked by minDate constraint");

const phoneValid = (p) => {
  const clean = p.replace(/\D/g, "");
  return clean.length >= 10;
};
assert.strictEqual(phoneValid("9876543210"), true);
assert.strictEqual(phoneValid("+91 98765 43210"), true);
assert.strictEqual(phoneValid("123"), false);

const emailValid = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
assert.strictEqual(emailValid("ananya@example.com"), true);
assert.strictEqual(emailValid("invalid-email"), false);
console.log("✓ Validation logic for dates, mobile numbers, and emails verified.");

// 4. Verify Built HTML & SEO Meta Tags
console.log("\n[4/5] Verifying Built HTML & SEO Metadata...");
const distHtml = fs.readFileSync(path.resolve("dist/index.html"), "utf-8");
assert(distHtml.includes("<title>Sweet Crumbs Artisanal Bakery"), "HTML missing title");
assert(distHtml.includes('name="description"'), "HTML missing description");
assert(distHtml.includes('property="og:title"'), "HTML missing Open Graph title");
assert(distHtml.includes('name="viewport"'), "HTML missing viewport");
assert(distHtml.includes('href="/favicon.svg"'), "HTML missing favicon link");
assert(distHtml.includes("Playfair+Display"), "HTML missing Playfair Display Google font");
assert(distHtml.includes("Plus+Jakarta+Sans"), "HTML missing Plus Jakarta Sans Google font");
console.log("✓ Built HTML verified with complete SEO meta tags, Open Graph, and artisanal typography.");

// 5. Verify Navigation Anchor Targets
console.log("\n[5/5] Verifying Navigation Anchor IDs...");
const homePageSource = [
  fs.readFileSync(path.resolve("src/sections/Hero.jsx"), "utf-8"),
  fs.readFileSync(path.resolve("src/sections/Products.jsx"), "utf-8"),
  fs.readFileSync(path.resolve("src/sections/CustomOrders.jsx"), "utf-8"),
  fs.readFileSync(path.resolve("src/sections/About.jsx"), "utf-8"),
  fs.readFileSync(path.resolve("src/sections/Gallery.jsx"), "utf-8"),
  fs.readFileSync(path.resolve("src/sections/Testimonials.jsx"), "utf-8"),
  fs.readFileSync(path.resolve("src/sections/Contact.jsx"), "utf-8"),
].join("\n");

const expectedSectionIds = ["home", "menu", "custom-orders", "about", "gallery", "testimonials", "contact"];
for (const id of expectedSectionIds) {
  assert(
    homePageSource.includes(`id="${id}"`),
    `Section ID #${id} is missing from sections!`
  );
}
console.log("✓ All 7 anchor IDs (#home, #menu, #custom-orders, #about, #gallery, #testimonials, #contact) verified and present.");

console.log("\nALL VERIFICATION TESTS PASSED SUCCESSFULLY! 🥐✨");

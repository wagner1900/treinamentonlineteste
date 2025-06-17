"use client";
import { loadStripe } from "@stripe/stripe-js";

export function CheckoutButton({ priceId }: { priceId: string }) {
  async function handleClick() {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const { sessionId } = await res.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
    await stripe?.redirectToCheckout({ sessionId });
  }
  return (
    <button
      onClick={handleClick}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg shadow-md transition"
    >
      Assinar
    </button>
  );
}

"use client";

import CheckoutPage from "@/components/payment/CheckoutPage";
import { convertToSubcurrency } from "@/lib/utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const amount = 10.99;
  console.log("A", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  return (
    <div style={{ minHeight: "200vh", padding: "20vh 5vh" }}>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "eur",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </div>
  );
}

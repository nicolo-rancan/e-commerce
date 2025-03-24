"use client";

import { convertToSubcurrency, useGlobals } from "@/lib/utils";
import { Elements, EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Basket as BasketType } from "@/lib/types";

//import Payment from "./Payment";
import { useEffect, useState } from "react";
import { emptyBasket, getBasket } from "../product/actions";
import { useSession } from "next-auth/react";
import Stripe from "stripe";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type Item = {
  price: string | Stripe.Price | null | undefined;
  quantity: number;
};

const Checkout = () => {
  const [basket, setBasket] = useState<Array<BasketType>>([]);
  const [clientSecret, setClientSecret] = useState("");
  const { paymentAmount, stripeProducts, setPopupFull } = useGlobals();
  const { data: session, status } = useSession();

  useEffect(() => {
    (async () => {
      let data = await getBasket(session!.userId);
      let items: Array<Item> = [];

      if (data && Object.hasOwn(data, "data")) {
        data.data.forEach((art) => {
          let id = art.articleId;
          let product = stripeProducts?.find((pr) => pr.id == id);

          if (product) {
            items.push({
              price: product?.default_price,
              quantity: art.quantity,
            });
          }
        });
      }

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setClientSecret(data.clientSecret);
        });
    })();
  }, [paymentAmount]);

  const orderCompleted = () => {
    if (session?.userId) {
      emptyBasket(session?.userId);
      setPopupFull(false);
    }
  };

  return (
    <div>
      {paymentAmount > 0 ? (
        /*<Elements
					stripe={stripePromise}
					options={{
						mode: "payment",
						amount: convertToSubcurrency(paymentAmount),
						currency: "eur",
					}}
				>
					<Payment />
				</Elements>*/
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{
            onComplete: orderCompleted,
            clientSecret,
          }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </div>
  );
};

export default Checkout;

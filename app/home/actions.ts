"use server";

import { stripe } from "@/lib/utils";

export const getArticles = async () => {
  const products = await stripe.products.list({
    active: true,
  });
  return { data: products.data };
};

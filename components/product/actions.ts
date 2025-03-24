"use server";

import { db } from "@/drizzle/db";
import { eq, and } from "drizzle-orm";
import { basket as basketSchema } from "@/drizzle/schema";
import { NewBasket, Basket } from "@/lib/types";
import Stripe from "stripe";

export const addArticleToBasket = async (article: Stripe.Product, userId: number) => {
  console.log(article);
  const articles = await db
    .select()
    .from(basketSchema)
    .where(and(eq(basketSchema.articleId, article.id), eq(basketSchema.userId, userId)));

  if (articles.length == 0) {
    const insertBasket = async (user: NewBasket) => {
      return db.insert(basketSchema).values(user);
    };
    const newBasket: NewBasket = { articleId: article.id, userId, quantity: 1 };
    await insertBasket(newBasket);
    return true;
  } else {
    return false;
  }
};

export const updateBasketArticleQuantity = async (basketId: number, quantity: number) => {
  await db.update(basketSchema).set({ quantity }).where(eq(basketSchema.basketId, basketId));
};

export const removeArticleFromBasket = async (article: Stripe.Product, userId: number) => {
  if (!userId) return false;

  const articles = await db
    .select()
    .from(basketSchema)
    .where(and(eq(basketSchema.articleId, article.id), eq(basketSchema.userId, userId)));

  if (articles.length > 0) {
    await db.delete(basketSchema).where(and(eq(basketSchema.articleId, article.id), eq(basketSchema.userId, userId)));
    return true;
  } else {
    return false;
  }
};

export const emptyBasket = async (userId: number) => {
  await db.delete(basketSchema).where(eq(basketSchema.userId, userId));
};

export const getBasket = async (userId: number | undefined) => {
  if (!userId) return false;

  const basket = await db.select().from(basketSchema).where(eq(basketSchema.userId, userId));
  return { data: basket };
};

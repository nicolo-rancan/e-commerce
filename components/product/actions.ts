"use server";

import { db } from "@/drizzle/db";
import { eq, and } from "drizzle-orm";
import { articles as articleSchema, basket as basketSchema } from "@/drizzle/schema";
import { Articles, NewBasket, Basket } from "@/lib/types";

export const addArticleToBasket = async (article: Articles, userId: number) => {
  const articles = await db
    .select()
    .from(basketSchema)
    .where(and(eq(basketSchema.articleId, article.articleId), eq(basketSchema.userId, userId)));

  if (articles.length == 0) {
    const insertBasket = async (user: NewBasket) => {
      return db.insert(basketSchema).values(user);
    };
    const newBasket: NewBasket = { articleId: Number(article.articleId), userId, quantity: 1 };
    await insertBasket(newBasket);
    return true;
  } else {
    return false;
  }
};

export const updateBasketArticleQuantity = async (basketId: number, quantity: number) => {
  await db.update(basketSchema)
  .set({ quantity })
  .where(eq(basketSchema.basketId, basketId));
}

export const removeArticleFromBasket = async (article: Articles, userId: number) => {
  if (!userId) return false;

  const articles = await db
    .select()
    .from(basketSchema)
    .where(and(eq(basketSchema.articleId, article.articleId), eq(basketSchema.userId, userId)));

  if (articles.length > 0) {
    await db.delete(basketSchema).where(and(eq(basketSchema.articleId, article.articleId), eq(basketSchema.userId, userId)));
    return true;
  } else {
    return false;
  }
};

export const getBasket = async (userId: number | undefined) => {
  if (!userId) return false;

  const articles = await db.select().from(basketSchema).where(eq(basketSchema.userId, userId)).innerJoin(articleSchema, eq(basketSchema.articleId, articleSchema.articleId));
  return { data: articles };
};

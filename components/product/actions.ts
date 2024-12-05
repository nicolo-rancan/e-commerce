"use server";

import { db } from "@/drizzle/db";
import { eq, and } from "drizzle-orm";
import { articles as articleSchema, basket as basketSchema } from "@/drizzle/schema";

export const addArticleToBasket = async (article: typeof articleSchema, userId: number) => {
  console.log(userId);

  const articleAlreadyPresent = await db
    .select()
    .from(basketSchema)
    .where(and(eq(basketSchema.articleId, article.articleId), eq(basketSchema.userId, userId)));

  console.log(articleAlreadyPresent);
};

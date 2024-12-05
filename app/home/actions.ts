"use server";

import { db } from "@/drizzle/db";
import { articles as articleSchema } from "@/drizzle/schema";

export const getArticles = async () => {
  const articles = await db.select().from(articleSchema);
  return { data: articles };
};

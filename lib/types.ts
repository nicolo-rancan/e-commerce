import NextAuth from "next-auth";
import { relations, type InferSelectModel } from "drizzle-orm"
import { articles, basket, reviews, users } from "@/drizzle/schema";
import { basketRelations } from "@/drizzle/relations";

export type Articles = typeof articles.$inferSelect;
export type Basket = typeof basket.$inferSelect;
export type Reviews = typeof reviews.$inferSelect;
export type Users = typeof users.$inferSelect;

export type NewArticles = typeof articles.$inferInsert;
export type NewBasket = typeof basket.$inferInsert;
export type NewReviews = typeof reviews.$inferInsert;
export type NewUsers = typeof users.$inferInsert;

export type BasketRelation = {
  articles: Articles
  users: Users
};


export type Globals = {
  showBasketDialog: boolean;
  setShowBasketDialog: (state: boolean) => void;
};

declare module "next-auth" {
  interface Session {
    userId: number;
  }
}

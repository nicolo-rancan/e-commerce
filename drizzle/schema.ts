import { pgTable, foreignKey, serial, integer, text, varchar, numeric, doublePrecision } from "drizzle-orm/pg-core";
import { bytea } from "./types";

export const reviews = pgTable(
  "reviews",
  {
    reviewId: serial("review_id").primaryKey().notNull(),
    userId: integer("user_id"),
    articleId: integer("article_id"),
    description: text(),
  },
  (table) => {
    return {
      reviewsUsersFk: foreignKey({
        columns: [table.userId],
        foreignColumns: [users.userId],
        name: "reviews_users_fk",
      }),
      reviewsArticlesFk: foreignKey({
        columns: [table.articleId],
        foreignColumns: [articles.articleId],
        name: "reviews_articles_fk",
      }),
    };
  }
);

export const users = pgTable("users", {
  userId: serial("user_id").primaryKey().notNull(),
  email: varchar({ length: 100 }),
});

export const articles = pgTable("articles", {
  articleId: serial("article_id").primaryKey().notNull(),
  description: varchar({ length: 255 }),
  price: numeric(),
  name: varchar({ length: 50 }),
  // TODO: failed to parse database type 'bytea'
  image: bytea("image"),
});

export const basket = pgTable(
  "basket",
  {
    basketId: serial("basket_id").primaryKey().notNull(),
    articleId: integer("article_id"),
    quantity: doublePrecision(),
    userId: integer("user_id"),
  },
  (table) => {
    return {
      bascketUsersFk: foreignKey({
        columns: [table.userId],
        foreignColumns: [users.userId],
        name: "bascket_users_fk",
      }),
      bascketArticlesFk: foreignKey({
        columns: [table.articleId],
        foreignColumns: [articles.articleId],
        name: "bascket_articles_fk",
      }),
    };
  }
);

import { relations } from "drizzle-orm/relations";
import { users, reviews, articles, basket } from "./schema";

export const reviewsRelations = relations(reviews, ({one}) => ({
	user: one(users, {
		fields: [reviews.userId],
		references: [users.userId]
	}),
	article: one(articles, {
		fields: [reviews.articleId],
		references: [articles.articleId]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	reviews: many(reviews),
	baskets: many(basket),
}));

export const articlesRelations = relations(articles, ({many}) => ({
	reviews: many(reviews),
	baskets: many(basket),
}));

export const basketRelations = relations(basket, ({one}) => ({
	user: one(users, {
		fields: [basket.userId],
		references: [users.userId]
	}),
	article: one(articles, {
		fields: [basket.articleId],
		references: [articles.articleId]
	}),
}));
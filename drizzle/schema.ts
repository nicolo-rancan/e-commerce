import { pgTable, serial, varchar, foreignKey, integer, text, doublePrecision } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	userId: serial("user_id").primaryKey().notNull(),
	email: varchar({ length: 100 }),
});

export const reviews = pgTable("reviews", {
	reviewId: serial("review_id").primaryKey().notNull(),
	userId: integer("user_id"),
	articleId: integer("article_id"),
	description: text(),
}, (table) => {
	return {
		reviewsUsersFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "reviews_users_fk"
		}),
	}
});

export const basket = pgTable("basket", {
	basketId: serial("basket_id").primaryKey().notNull(),
	articleId: varchar("article_id", { length: 100 }),
	quantity: doublePrecision().default(1).notNull(),
	userId: integer("user_id"),
}, (table) => {
	return {
		bascketUsersFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "bascket_users_fk"
		}),
	}
});

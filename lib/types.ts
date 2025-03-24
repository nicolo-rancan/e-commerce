import NextAuth from "next-auth";
import { relations, type InferSelectModel } from "drizzle-orm";
import { basket, reviews, users } from "@/drizzle/schema";
import { basketRelations } from "@/drizzle/relations";
import React, { ReactNode } from "react";
import Stripe from "stripe";

export type Basket = typeof basket.$inferSelect;
export type Reviews = typeof reviews.$inferSelect;
export type Users = typeof users.$inferSelect;

export type NewBasket = typeof basket.$inferInsert;
export type NewReviews = typeof reviews.$inferInsert;
export type NewUsers = typeof users.$inferInsert;

export type Globals = {
	showBasketDialog: boolean;
	setShowBasketDialog: (state: boolean) => void;
	showPaymentForm: boolean;
	setShowPaymentForm: (state: boolean) => void;
	paymentAmount: number;
	setPaymentAmount: (state: number) => void;
	popupComponent: ReactNode | null;
	setPopupComponent: (state: ReactNode) => void;
	showPopup: boolean;
	setShowPopup: (state: boolean) => void;
	popupFull: boolean;
	setPopupFull: (state: boolean) => void;
	stripeProducts: Array<Stripe.Product> | null;
	setStripeProducts: (state: Array<Stripe.Product>) => void;
};

declare module "next-auth" {
	interface Session {
		userId: number;
	}
}

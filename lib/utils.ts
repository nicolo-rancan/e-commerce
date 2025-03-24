import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import { Globals } from "./types";
import React, { ReactNode } from "react";
import Stripe from "stripe";

export const stripe = new Stripe("sk_test_51OVFIcAc9rG7JkiQLvINKatbaSiBddNBUIdqXIL5bR6XXprNH3Vf2iV2s6neEVeCqpDEIJB7Eg8VM0sq6l1Ngevg00HVCSSj6v");

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const useGlobals = create<Globals>((set, get) => ({
	showBasketDialog: false,
	setShowBasketDialog: (state: boolean) => set({ showBasketDialog: state }),
	showPaymentForm: false,
	setShowPaymentForm: (state: boolean) => set({ showPaymentForm: state }),
	paymentAmount: 0,
	setPaymentAmount: (state: number) => set({ paymentAmount: state }),
	popupComponent: null,
	setPopupComponent: (state: ReactNode) => set({ popupComponent: state }),
	showPopup: false,
	setShowPopup: (state: boolean) => set({ showPopup: state }),
	popupFull: false,
	setPopupFull: (state: boolean) => set({ popupFull: state }),
	stripeProducts: null,
	setStripeProducts: (state: Array<Stripe.Product>) => set({ stripeProducts: state }),
}));

export const convertToSubcurrency = (amount: number, factor = 100) => {
	return Math.round(amount * factor);
};

export const convertToCurrency = (amount: number, factor = 100) => {
	return Math.round(amount / factor);
};

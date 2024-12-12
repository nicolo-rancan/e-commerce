import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import { Globals } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useGlobals = create<Globals>((set, get) => ({
  showBasketDialog: false,
  setShowBasketDialog: (state: boolean) => set({ showBasketDialog: state }),
}));

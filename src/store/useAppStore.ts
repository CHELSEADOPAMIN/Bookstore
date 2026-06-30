"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { coffees } from "@/data/mock";
import type { MembershipPlan } from "@/lib/membership";

type Member = {
  name: string;
  phone: string;
  points: number;
  level: "Seed" | "Shelf" | "Collector";
  studentDiscountEligible: boolean;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  options?: string;
};

type AppState = {
  member: Member | null;
  membershipPurchased: boolean;
  membershipPlan: MembershipPlan;
  cart: CartItem[];
  purchaseMembership: (plan: MembershipPlan) => void;
  login: (name: string, phone: string) => void;
  logout: () => void;
  addCoffee: (id: string, options?: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      member: null,
      membershipPurchased: false,
      membershipPlan: "standard",
      cart: [],
      purchaseMembership: (plan) =>
        set((state) => ({
          membershipPurchased: true,
          membershipPlan: plan,
          member: state.member
            ? { ...state.member, studentDiscountEligible: plan === "student" }
            : state.member,
        })),
      login: (name, phone) =>
        set((state) => ({
          member: {
            name,
            phone,
            points: 2680,
            level: "Collector",
            studentDiscountEligible: state.membershipPlan === "student",
          },
        })),
      logout: () => set({ member: null }),
      addCoffee: (id, options) =>
        set((state) => {
          const coffee = coffees.find((item) => item.id === id);
          if (!coffee) return state;
          const key = `${id}-${options ?? "standard"}`;
          const exists = state.cart.find((item) => item.id === key);
          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item.id === key ? { ...item, qty: item.qty + 1 } : item,
              ),
            };
          }
          return {
            cart: [
              ...state.cart,
              {
                id: key,
                name: coffee.name,
                price: coffee.price,
                qty: 1,
                options,
              },
            ],
          };
        }),
      removeItem: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "bookstore-prototype" },
  ),
);

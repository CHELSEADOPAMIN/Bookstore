export type MembershipPlan = "standard" | "student";

export const MEMBERSHIP_PRICE = 29;
export const STUDENT_DISCOUNT_RATE = 0.1;
export const STUDENT_PRICE_FACTOR = 1 - STUDENT_DISCOUNT_RATE;

export function studentPrice(value: number) {
  return value * STUDENT_PRICE_FACTOR;
}

export function studentDiscount(value: number) {
  return value * STUDENT_DISCOUNT_RATE;
}

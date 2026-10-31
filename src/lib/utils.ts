import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian currency: ₹1,42,361
 */
export function formatINR(amount: number, includeSymbol: boolean = true): string {
  const formatted = Math.round(amount).toLocaleString('en-IN');
  return includeSymbol ? `₹${formatted}` : formatted;
}


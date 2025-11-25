import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind + conditional class names.
 * Example: cn('p-4', condition && 'bg-red-500')
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

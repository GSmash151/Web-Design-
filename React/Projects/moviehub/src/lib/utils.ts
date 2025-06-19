// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge Tailwind + conditional class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

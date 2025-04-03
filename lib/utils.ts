import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  timestamp: number,
  format: "full" | "short" = "full"
): string {
  const date = new Date(timestamp * 1000);

  if (format === "short") {
    // Return day name only (e.g., "Mon")
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
  }

  // Return full date (e.g., "Monday, April 3, 2023")
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Import necessary types and functions from the clsx library.
import { type ClassValue, clsx } from "clsx";

// Import the twMerge function from the tailwind-merge library.
import { twMerge } from "tailwind-merge";

// Custom function cn that merges class names from clsx and tailwind-merge.
export function cn(...inputs: ClassValue[]) {
  // Call clsx with the rest parameter ...inputs to merge class names conditionally.
  const mergedClassNames = clsx(inputs);

  // Call twMerge with the result of clsx to merge Tailwind CSS classes.
  return twMerge(mergedClassNames);

  // The returned value will be a string representing the merged class names.
}

// Custom function absoluteUrl that generates an absolute URL.
export function absoluteUrl(path: string) {
  // Combine the provided path with the NEXT_PUBLIC_APP_URL environment variable.
  // The environment variable should contain the base URL of your application.
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;

  // The returned value will be a string representing the absolute URL.
}

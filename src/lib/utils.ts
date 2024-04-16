import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateObj: Date): string {

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    "en-US",
    options
  );
  return formatter.format(dateObj);
}
export function timeSince(date: Date): string {
  const now = Date.now();
  const seconds = Math.floor((now - date.getTime()) / 1000);

  if (seconds < 60) {
    return "just now";
  } else if (seconds < 3600) {
    // Less than an hour
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  } else if (seconds < 86400) {
    // Less than a day
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  } else if (seconds < 2592000) {
    // Less than a month
    const days = Math.floor(seconds / 86400);
    return `${days}d`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(date);
  }
}

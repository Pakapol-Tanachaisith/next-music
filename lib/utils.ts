import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(sec: number) {
  const minute = Math.floor(sec / 60);
  const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
  const second = Math.floor(sec % 60);
  const secondString = second < 10 ? `0${second}` : `${second}`;

  return `${minuteString}:${secondString}`;
}

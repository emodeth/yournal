import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUsernameFromEmail(email: string) {
  return email?.split("@")?.at(0);
}

export function getMoodText(moodWeight: number) {
  const labels = {
    1: "Very Sad",
    2: "Sad",
    3: "Neutral",
    4: "Happy",
    5: "Very Happy",
  };
  return labels[moodWeight] || "Unknown";
}

export function getContentSubstring(content: string) {
  return content.substring(0, 30) + "...";
}

export function getMoodByMoodId(allMoods: any, moodId: number) {
  const mood = allMoods?.find((item) => item.id === moodId);
  return mood;
}

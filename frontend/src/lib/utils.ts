import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format number with commas */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

/** Debounce utility */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/** Safe fetch with timeout */
export async function safeFetch(
  url: string,
  options?: RequestInit,
  timeoutMs: number = 5000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/** Get backend API URL */
export function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  return `${baseUrl}${path}`;
}

/** Generate a share-friendly score card text */
export function generateScoreShareText(score: number, total: number, badge: string): string {
  const percentage = Math.round((score / total) * 100);
  return `🗳️ I scored ${percentage}% on VoteSphere AI's Election Quiz!\n🏆 Badge: ${badge}\n\nTest your election knowledge: `;
}

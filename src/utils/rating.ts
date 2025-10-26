// src/utils/rating.ts
export function clampRating(r: number) {
  return Math.max(0, Math.min(5, r || 0));
}

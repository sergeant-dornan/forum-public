export function parseNumber(num: unknown): number {
  const parsed = Number(num);
  if (isNaN(parsed)) throw new Error();
  return parsed;
}
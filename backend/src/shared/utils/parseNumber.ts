export function parseNumber(num: unknown): number {
  const parsed = Number(num);
  if (isNaN(parsed)) { 
    throw new Error(`ParseNumberUtil: Не число (NaN). Значение: ${num}`);
  }
  return parsed;
}
// Маппер типа для перевода domain-типа в db-тип
type ToDb<S extends string> =
  S extends `${infer T}${infer U}`
    ? T extends Uppercase<T>
      ? `_${Lowercase<T>}${ToDb<U>}`
      : `${T}${ToDb<U>}`
    : S;

// Маппер типа для перевода ключей интерфейса domain-типа в db-тип
export type ToDbType<T> =
  T extends Date ? T :
  T extends (infer U)[] ? ToDbType<U>[] :
  T extends object ? {
    [K in keyof T as ToDb<K & string>]: ToDbType<T[K]>;
  } : T;

// Функция-маппер для перевода переменной с domain-типом в db-тип
export function toDb<T = unknown>(obj: T): ToDbType<T> {
  if (obj === null || typeof obj !== "object") return obj as any;

  if (obj instanceof Date) return obj as any;

  if (Array.isArray(obj)) {
    return obj.map((item) => toDb(item)) as any;
  }

  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Поддерживает множественные заглавные буквы: "statusChangedAt" → "status_changed_at"
      const snakeKey = key.replace(/([A-Z])/g, (_, letter) => `_${letter.toLowerCase()}`);
      result[snakeKey] = toDb(obj[key]);
    }
  }
  return result;
}

// Маппер типа для перевода db-типа в domain-тип
type FromDb<S extends string> =
  S extends `${infer T}_${infer U}` 
  ? `${T}${FromDb<Capitalize<U>>}` 
  : S;

// Маппер типа для перевода ключей интерфейса db-типа в domain-тип
export type FromDbType<T> =
  T extends Date ? T :
  T extends (infer U)[] ? FromDbType<U>[] :
  T extends object ? {
    [K in keyof T as FromDb<K & string>]: FromDbType<T[K]>;
  } : T;

// Функция-маппер для перевода переменной с db-типом в domain-тип
export function fromDb<T = unknown>(obj: T): FromDbType<T> {
  if (obj === null || typeof obj !== "object") return obj as any;

  if (obj instanceof Date) return obj as any;

  if (Array.isArray(obj)) {
    return obj.map((item) => fromDb(item)) as any;
  }

  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = fromDb(obj[key]);
    }
  }
  return result;
}
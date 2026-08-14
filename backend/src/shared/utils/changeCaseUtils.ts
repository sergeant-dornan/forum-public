// Адаптер типа для перевода snake_case в camelCase
export type SnakeToCamelType<S extends string> =
  S extends `${infer T}_${infer U}` 
  ? `${T}${SnakeToCamelType<Capitalize<U>>}` 
  : S;

// Адаптер типа для перевода ключей интерфейса snake_case в camelCase
export type SnakeToCamelInterface<T> =
  T extends Date ? T :
  T extends (infer U)[] ? SnakeToCamelInterface<U>[] :  // ← добавить это!
  T extends object ? {
    [K in keyof T as SnakeToCamelType<K & string>]: SnakeToCamelInterface<T[K]>;
  } : T;

// Функция-адаптер для перевода snake-ключей объекта в camel-ключи
export function snakeToCamel<T>(obj: T): SnakeToCamelInterface<T> {
  if (obj === null || typeof obj !== "object") return obj as any;

  if (obj instanceof Date) return obj as any;

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item)) as any;
  }

  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Поддерживает multiple underscores: "status_changed_at" → "statusChangedAt"
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = snakeToCamel(obj[key]);
    }
  }
  return result;
}


// Адаптер типа для перевода camelCase в snake_case
export type CamelToSnakeType<S extends string> =
  S extends `${infer T}${infer U}`
    ? T extends Uppercase<T>
      ? `_${Lowercase<T>}${CamelToSnakeType<U>}`
      : `${T}${CamelToSnakeType<U>}`
    : S;

// Адаптер типа для перевода ключей интерфейса camelCase в snake_case
export type CamelToSnakeInterface<T> =
  T extends Date ? T :
  T extends (infer U)[] ? CamelToSnakeInterface<U>[] :
  T extends object ? {
    [K in keyof T as CamelToSnakeType<K & string>]: CamelToSnakeInterface<T[K]>;
  } : T;

// Функция-адаптер для перевода camel-ключей объекта в snake-ключи
export function camelToSnake<T>(obj: T): CamelToSnakeInterface<T> {
  if (obj === null || typeof obj !== "object") return obj as any;

  if (obj instanceof Date) return obj as any;

  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnake(item)) as any;
  }

  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Поддерживает множественные заглавные буквы: "statusChangedAt" → "status_changed_at"
      const snakeKey = key.replace(/([A-Z])/g, (_, letter) => `_${letter.toLowerCase()}`);
      result[snakeKey] = camelToSnake(obj[key]);
    }
  }
  return result;
}

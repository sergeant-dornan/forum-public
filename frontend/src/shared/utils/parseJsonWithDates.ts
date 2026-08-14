function isDateString(str: string): boolean {
  // Проверяем ISO формат или другие форматы дат
  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
  return dateRegex.test(str);
}
// Утилита для преобразования строк с датами в объекты Date, например для парса json
function parseDates<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item =>
      typeof item === 'object' ? parseDates(item) : item
    ) as unknown as T;
  }

  const result = { ...obj } as any;

  for (const key of Object.keys(result)) {
    const value = result[key];

    // Проверяем, похоже ли на дату
    if (typeof value === 'string' && isDateString(value)) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        result[key] = date;
      }
    }

    // Рекурсивно обрабатываем вложенные объекты
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = parseDates(value);
    }

    // Обрабатываем массивы
    if (Array.isArray(value)) {
      result[key] = value.map(item =>
        typeof item === 'object' ? parseDates(item) : item
      );
    }
  }

  return result;
}

export async function parseJsonWithDates<JsonType = unknown>(
  input: Response | string
): Promise<JsonType | Error> {
  try {
    if (input instanceof Response) {
      const json: JsonType = parseDates(await input.json());
      return json;
    }

    return parseDates(JSON.parse(input));
  }
  catch (error) {
    return new Error(`Ошибка парсинга json: ${error}`);
  }
}
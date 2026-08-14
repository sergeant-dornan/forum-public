export default class BaseHttpClientCore {
  constructor(
    private defaultOptions: RequestInit,
    protected cookieHeader?: string
  ) { }

  public buildFetchOptions(reqOptions: RequestInit): RequestInit {
    // Создаем заголовки на основе сначала заголовков по умолчанию, а потом переданых вручную
    const totalHeaders = new Headers({ ...this.defaultOptions.headers, ...reqOptions.headers });

    // Добавляем куки если переаны вручную
    if (this.cookieHeader) {
      totalHeaders.set('Cookie', this.cookieHeader);
    }

    // Собираем опции для fetch
    const fetchOptions: RequestInit = {
      ...this.defaultOptions,
      ...reqOptions,
      headers: totalHeaders,
      // Добавляем credentials если нет кука не передана вручную
      ...(!this.cookieHeader && { credentials: "include" })
    };

    return fetchOptions;
  }

  public async fetch(
    url: string, options: RequestInit, retries = 5, delay = 1000
  ): Promise<Response> {
    // Добавляем рефетч при долгом ожидании
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000)
    const fetchOptions = {
      ...options,
      signal: controller.signal
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PATH_TO_API}${url}`, fetchOptions);
      clearTimeout(timeout);

      return res;
    }
    catch (error) {
      clearTimeout(timeout);

      // Не ретраим при таймауте/отмене
      if (error instanceof DOMException && error.name === 'AbortError') throw error;

      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetch(url, options, retries - 1, delay * 1.5)
      }

      throw error;
    }
  }
}
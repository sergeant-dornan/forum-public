/** @returns ЧЧ:ММ */
export function getLocaleTime(date: Date, region: Intl.LocalesArgument): string {
  return date.toLocaleTimeString(region, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

/** @returns пт, 7 августа */
export function getLocaleDate(date: Date, region: Intl.LocalesArgument): string {
  return date.toLocaleDateString(region, {
    month: "long",
    weekday: "short",
    day: "numeric"
  });
}

/** Возвращает с учетом локали (Например "ru-RU") @returns ДД.ММ.ГГГГ */
export function getShortLocaleDate(date: Date, region: Intl.LocalesArgument): string {
  return date.toLocaleDateString(region, {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
}

/** @returns ГГГГ-ММ-ДД */
export function getDateISO(date: Date): string {
  return date.toLocaleDateString("sv-SE");
}
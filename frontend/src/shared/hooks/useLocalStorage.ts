import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { showErrorMessage } from "../utils/swalUtils";

export default function useLocalStorage<T>(
  key: string, defaultValue: T | null
): [T | null, Dispatch<SetStateAction<T | null>>, boolean] {
  const [loading, setLoading] = useState(true);
  const [storedValue, setStoredValue] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      showErrorMessage("Ошибка при чтении данных");
    } finally {
      setLoading(false);
    }
  }, [key]);

  // При изменении - меняем в хранилище
  useEffect(() => {
    if (typeof window === "undefined" || loading) return;

    try {
      if (storedValue === null || storedValue === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      showErrorMessage("Ошибка при сохранении данных");
    }
  }, [key, storedValue, loading]);

  return [storedValue, setStoredValue, loading];
}
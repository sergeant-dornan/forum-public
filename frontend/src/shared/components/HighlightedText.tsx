"use client";

export function HighlightedText({ text, query }: { text: string, query: string }) {
  if (!query) return <span>{text}</span>;

  // Разбиваем запрос на отдельные слова
  const words = query.split(/\s+/).filter(word => word.length > 0);
  if (words.length === 0) return <span>{text}</span>;

  // Экранируем каждое слово и объединяем через | (ИЛИ)
  const pattern = words
    .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => {
        // Проверяем, совпадает ли часть с ЛЮБЫМ из слов (без учета регистра)
        const isMatch = words.some(word =>
          part.toLowerCase() === word.toLowerCase()
        );
        return isMatch
          ? <mark key={i}>{part}</mark>
          : <span key={i}>{part}</span>;
      })}
    </span>
  );
}
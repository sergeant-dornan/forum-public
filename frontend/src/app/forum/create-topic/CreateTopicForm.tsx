"use client";

import styles from "./create-topic.module.css";
import { useUser } from "@/shared/contexts/UserContext";
import { useForum } from "@/shared/contexts/ForumContext";
import { useState } from "react";
import type { CategoryListItem } from "@forum/shared";
import { useCreateTopic } from "./useCreateTopic";

interface CreateTopicFormProps {
  categories: CategoryListItem[];
}

export default function CreateTopicForm({ categories }: CreateTopicFormProps) {
  const { navigationHidden } = useForum();
  // Состояния формы и полей формы
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { isSubmitting, handleSubmit } = useCreateTopic();

  const { loading } = useUser();

  // Загрузка
  if (loading) {
    return <div>Загрузка...</div>;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit} className={`grey rounded ${styles["form"]} ${!navigationHidden ? "mobile-hidden" : ""}`}>
      <h1>Заполните форму, чтобы создать тему</h1>
      <div>
        <label htmlFor="categories">В какой категории создать тему?</label>
        <select name="categoryId" className="white rounded">
          {categories.map((category) => {
            return <option key={category.categoryId} value={category.categoryId} className="black">{category.title}</option>
          })}
        </select>
      </div>
      <div>
        <label htmlFor="title">Придумайте название:</label>
        <input
          name="title"
          value={title ?? ""}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="До 70 символов"
          className="white"
        />
      </div>
      <label htmlFor="description">Придумайте описание:</label>
      <textarea
        name="description"
        value={description ?? ""}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Подробно опишите свою проблему (до 1500 символов)"
        className="white"
      ></textarea>

      {/* Отправить форму */}
      <button type="submit" disabled={isSubmitting} className="black rounded">
        {isSubmitting ? "Создание..." : "Создать"}
      </button>
    </form>
  )
}
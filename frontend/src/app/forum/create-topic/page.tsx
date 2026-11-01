"use client";

import styles from "./create-topic.module.css";
import { useState } from "react";
import { useCreateTopic } from "./useCreateTopic";
import { useAppSelector } from "@/lib/hooks";

export default function CreateTopicPage() {
  const categories = useAppSelector((state) => state.categories);

  // Состояния формы и полей формы
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { isSubmitting, handleSubmit } = useCreateTopic();

  return (
    <div className={`${styles["create-topic-div"]}`}>
      <form onSubmit={handleSubmit} className={`grey rounded ${styles["form"]}`}>
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
    </div>
  )
}
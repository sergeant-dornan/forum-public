"use client";

import styles from "./message-input.module.css";

import TextareaAutosize from "react-textarea-autosize";
import messageSubmit from "./messageSubmit";
import { useState, type KeyboardEvent, type SubmitEvent } from "react";
import Image from "next/image";
import { useForum } from "@/shared/contexts/ForumContext";
import { showErrorMessage } from "@/shared/utils/swalUtils";
import type { Topic } from "@forum/shared";

export default function MessageInput({ topicId }: { topicId: Topic["topicId"] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected } = useForum();
  
  // Ф-ия отправки сообщения
  const messageSubmitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    // Сообщение уже отправляется
    if (isSubmitting) return;
    if (!isConnected) {
      showErrorMessage("Отсутствие соединения", "Попробуйте позже");
      return;
    }

    setIsSubmitting(true);
    await messageSubmit(e, topicId);
    setIsSubmitting(false);
  }

  // Отправка на Enter, перенос строки на Shift + Enter
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest('form'); // Находим форму
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true });
        form.dispatchEvent(submitEvent); // Искусственно вызываем submit
      }
    }
  }

  return (
    <form onSubmit={messageSubmitHandler} className={`${styles["message-input"]}`}>
      {/* <textarea name="message" placeholder="Введите сообщение..." className="grey rounded"></textarea> */}
      <TextareaAutosize
        maxRows={5}
        minRows={2}
        onKeyDown={handleKeyDown}
        name="message"
        placeholder={!isSubmitting ? `Введите сообщение...` : `Отправляется, подождите...`}
        className="grey rounded"
      />
      <button type="submit" className="pink rounded">
        <Image src="/ui/send.svg" alt="Send message" width={36} height={36} />
      </button>
    </form>
  )
}
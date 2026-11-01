"use client";

import styles from "./options.module.css";
import Link from "next/link";

export default function Options() {
  return (
    <div className={`${styles["options"]}`}>
      <Link href={`/forum/create-topic`}>
        <h2 className="pink rounded">Создать тему</h2>
      </Link>
      <Link href={`/forum/my-topics`}>
        <h2 className="pink rounded">Мои темы</h2>
      </Link>
      <Link href={`/forum/search`}>
        <h2 className="pink rounded">Найти тему</h2>
      </Link>
    </div>
  )
}
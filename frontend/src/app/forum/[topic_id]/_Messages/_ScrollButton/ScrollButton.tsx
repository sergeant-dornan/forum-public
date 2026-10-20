"use client";

import Image from "next/image";
import styles from "./scroll-button.module.css";

export default function ScrollButton({ scrollFunc }: { scrollFunc: () => void }) {
  return (
    <button onClick={scrollFunc} className={`grey rounded ${styles["scroll-button"]}`}>
      <Image src="/ui/arrow-down.svg" alt="В конец страницы" height={48} width={48} />
    </button>
  )
}
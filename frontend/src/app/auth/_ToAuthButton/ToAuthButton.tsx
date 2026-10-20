"use client";

import Image from "next/image";
import styles from "./to-auth-button.module.css";
import Link from "next/link";

export default function ToAuthButton() {
  return (
    <Link href={"/auth"} className={`grey rounded ${styles["to-auth-button"]}`}>
      <Image src="/ui/back.svg" alt="Назад" height={48} width={48} />
    </Link>
  )
}
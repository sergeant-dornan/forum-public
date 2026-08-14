import styles from "./auth.module.css"
import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className={`${styles["auth-div"]}`}>
      <h1>Чтобы продолжить, войдите в аккаунт</h1>
      <div className={`${styles["auth-links"]}`}>
        <Link className={`crimson rounded ${styles["auth-link"]}`} href="/auth/registration">
          <h2>Регистрация</h2>
        </Link>
        <Link className={`crimson rounded ${styles["auth-link"]}`} href="/auth/login">
          <h2>Вход</h2>
        </Link>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import styles from "./category.module.css";
import type { CategoryData } from "../../navigation.types";

interface CategoryProps {
  categoryData: CategoryData;
}

export default function Category({ categoryData }: CategoryProps) {
  const { categoryIndex, categoriesCount } = categoryData;

  if (!categoryData.current) return null;

  const { src, alt, title } = categoryData.current;

  return (
    <div className={`${styles["category"]}`}>
      <div className={`${styles["row"]}`}>
        <Image src={`/ui/categories/${src}`} alt={alt} width={36} height={36} />
        <h3>{title}</h3>
      </div>
      <h5>{`${categoryIndex + 1}/${categoriesCount}`}</h5>
    </div>
  )
}
// Файл с заготовленными функциями-фасадами для красивых alert, confirm

import Swal, { type SweetAlertOptions } from "sweetalert2";

export async function confirmDialog(
  title: string, text?: string, options?: SweetAlertOptions
): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Да",
    cancelButtonText: "Отмена",
    ...options
  });
  return result.isConfirmed;
}

export function showErrorMessage(
  title: string, text?: string, options?: SweetAlertOptions
): void {
  Swal.fire({
    title,
    text,
    icon: "error",
    ...options
  });
}

export function showInfoMessage(
  title: string, text?: string, options?: SweetAlertOptions
): void {
  Swal.fire({
    title,
    text,
    icon: "info",
    ...options
  });
}
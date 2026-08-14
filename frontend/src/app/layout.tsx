import "./globals.css";
import { UserProvider } from "../shared/contexts/UserContext";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import WebSocketProvider from "./WebSocketProvider";

export const metadata: Metadata = {
  title: "Форум",
  description: "Переадресация",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <WebSocketProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </WebSocketProvider>
      </body>
    </html>
  );
}

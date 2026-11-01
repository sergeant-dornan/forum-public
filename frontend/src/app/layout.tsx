import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import WebSocketProvider from "@/providers/WebSocketProvider";
import StoreProvider from "@/lib/StoreProvider";
import { AppProvider } from "@/contexts/AppContext";
import NextTopLoader from "nextjs-toploader";

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
        <NextTopLoader
          height={5}
          color="rgb(187, 65, 75)"
        />
        <StoreProvider>
          <WebSocketProvider>
            <AppProvider>
              {children}
            </AppProvider>
          </WebSocketProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

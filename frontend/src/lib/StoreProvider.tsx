"use client";

import { useRef, type ReactNode } from "react";
import { makeStore, type AppStore } from "./store";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) storeRef.current = makeStore();

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
}
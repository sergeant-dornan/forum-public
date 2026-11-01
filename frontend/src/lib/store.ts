import { categoriesReducer } from "@/features/categories/categoriesSlice";
import { topicsReducer } from "@/features/topics/topicsSlice";
import { uiReducer } from "@/features/ui/uiSlice";
import { userReducer } from "@/features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit"

export function makeStore() {
  return configureStore({
    reducer: {
      ui: uiReducer,
      user: userReducer,
      topics: topicsReducer,
      categories: categoriesReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
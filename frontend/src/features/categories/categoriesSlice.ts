import type { CategoryListItem } from "@forum/shared/schemas";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: CategoryListItem[] = [];

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (_state, action: PayloadAction<CategoryListItem[]>) => {
      return action.payload;
    }
  }
});

export const { setCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
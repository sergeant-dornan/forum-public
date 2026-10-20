import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SetTopicRolePayload, User, UserState } from "./userTypes";

const initialState: UserState = {
  userId: null,
  username: null,
  roles: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { roles, userId, username } = action.payload;

      state.roles = roles;
      state.userId = userId;
      state.username = username;
    },
    clearUser: () => {
      return initialState;
    },
    setTopicRole: (state, action: PayloadAction<SetTopicRolePayload>) => {
      const { topicId, role } = action.payload;

      if (role === null) delete state.roles[topicId];
      else state.roles[topicId] = role;
    }
  },
});

export const { setUser, clearUser, setTopicRole } = userSlice.actions;
export const userReducer = userSlice.reducer;
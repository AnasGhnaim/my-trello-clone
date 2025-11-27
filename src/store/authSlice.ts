import { createSlice } from "@reduxjs/toolkit";
export type User = {
  uid: string;
  displayName: string | null;
  token: string;
};

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: { payload: User }) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

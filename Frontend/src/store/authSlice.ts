import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

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
    login: (state, action) => {
      const { user } = action.payload;
      state.user = user;

      localStorage.setItem("user", JSON.stringify(user));

      cookies.set("token", user.token, {
        path: "/",
        maxAge: 60 * 60 * 2,
      });
    },
    logout: (state) => {
      state.user = null;

      localStorage.removeItem("user");

      cookies.remove("token", { path: "/" });
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

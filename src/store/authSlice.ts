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
    login: (state, action) => {
      const { user, setCookie } = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      if (setCookie) {
        setCookie("token", user.token, { path: "/", maxAge: 60 * 60 * 2 }); // 2 hours
      }
    },
    logout: (state, action) => {
      const { removeCookie } = action.payload || {};
      state.user = null;
      localStorage.removeItem("user");
      if (removeCookie) {
        removeCookie("token", { path: "/" });
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

import axios from "axios";

const backendUrl = (import.meta as any).env?.VITE_API_URL ?? "";

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// I will keep it if we return to use token with no need to store it in cookies
// export const setAuthToken = (token: string) => {
//   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

//I use this to pull the token from my cookie cuase my backend only have token not cookie so i pull it from auth headers from both right now
api.interceptors.request.use((config) => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((c) => c.startsWith("token="));
  if (tokenCookie) {
    const token = tokenCookie.split("=")[1];
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

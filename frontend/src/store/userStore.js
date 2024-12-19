import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: localStorage.getItem("user") || null,
      token: localStorage.getItem("token") || null,
      setUser: (user) => set({ user: user }),
      setToken: (token) => set({ token: token }),
      logout: () => {
        // Remove the token from cookies when logging out
        Cookies.remove("token"); // Remove token from cookies
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export default useAuthStore;

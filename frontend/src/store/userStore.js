import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: JSON.parse(localStorage.getItem("user")) || null,
      token: JSON.parse(localStorage.getItem("token")) || null,
      setUser: (user, token) => {
        set({ user, token });
      },
      clearUser: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

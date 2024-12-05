import { create } from "zustand";
import { persist } from "zustand/middleware";
const user = (set, get) => ({
  user: null,
  token: null,
  setUser: (user) => set((state) => (state.user !== user ? { user } : state)),
  setToken: (token) =>
    set((state) => (state.token !== token ? { token } : state)),
  getToken: () => get().token,
  logout: () => set({ user: null, token: null }),
});

const useUser = create(persist(user, { name: "my-application" }));

export { useUser };

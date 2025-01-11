import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAdminLoginStore = create(
  persist(
    (set) => ({
      admin: null,
      error: null,
      login: async (username, password) => {
        set({ error: null, isLoading: true });
        try {
          const response = await axios.post("/api/v1/admin/login", {
            username,
            password,
          });
          const { accessToken, refreshToken } = response.data.data;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
          set({
            admin: response.data,
            isLoading: false,
            error: null,
          });
          return response;
        } catch (error) {
          set({
            error:
              error.response?.data?.data?.message || "Something went wrong",
          });
        }
      },
    }),
    {
      name: "admin-login-store",
      getStorage: () => sessionStorage,
    }
  )
);

export { useAdminLoginStore };

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useAdminAuthStore = create(
  persist(
    (set) => ({
      currentAdmin: null,
      isLoading: false,
      error: null,
      getCurrentUser: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get("/api/v1/admin/current-admin", {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          });

          set({ currentAdmin: response.data, isLoading: false, error: null });
          return response;
        } catch (error) {
          set({
            isLoading: false,
            error:
              error.response?.data?.message || "Failed to fetch current user",
          });
        }
      },
    }),
    {
      name: "admin-auth-store",
      getStorage: () => sessionStorage,
    }
  )
);

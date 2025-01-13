import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAdminLogoutStore = create()(
  persist(
    (set) => ({
      isLoggedIn: true,
      userData: null,
      logout: async () => {
        try {
          const response = await axios.post("/api/v1/admin/logout", {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          });
          localStorage.removeItem("admin-auth-store");
          sessionStorage.clear();
          set({ isLoggedIn: false, userData: null });
          return response;
        } catch (error) {
          console.error("Logout  failed:", error);
        }
      },
    }),
    {
      name: "admin-logout-store",
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    }
  )
);

export default useAdminLogoutStore;

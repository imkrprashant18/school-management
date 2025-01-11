import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAdminLogoutStore = create()(
  persist(
    (set) => ({
      isLoggedIn: true,
      logout: async () => {
        try {
          const response = await axios.post("/api/v1/admin/logout", {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          });
          set({ isLoggedIn: false });
          sessionStorage.clear();
          return response;
        } catch (error) {
          console.error("Logout  failed:", error);
        }
      },

      setLoggedIn: (status) => set({ isLoggedIn: status }),
    }),
    {
      name: "admin-logout-store",
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
    }
  )
);

export default useAdminLogoutStore;

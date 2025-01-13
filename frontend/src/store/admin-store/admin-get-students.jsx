import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useGetAllStudentStore = create(
  persist(
    (set) => ({
      allCurrentStudents: null,
      isLoading: false,
      error: null,
      getAllStudents: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get("/api/v1/admin/get-students", {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          });

          set({
            allCurrentStudents: response.data,
            isLoading: false,
            error: null,
          });
          return response;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Failed to fetch students",
          });
        }
      },
    }),
    {
      name: "admin-student-store",
      getStorage: () => localStorage,
    }
  )
);

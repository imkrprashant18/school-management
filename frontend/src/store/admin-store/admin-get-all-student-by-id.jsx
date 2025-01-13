import { create } from "zustand";
import axios from "axios";

export const useGetAllStudentByIdStore = create((set) => ({
  allCurrentStudentsById: null,
  isLoading: false,
  error: null,
  getAllStudentsById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/v1/admin/get-student/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data);
      set({
        allCurrentStudentsById: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch student data",
      });
    }
  },
}));

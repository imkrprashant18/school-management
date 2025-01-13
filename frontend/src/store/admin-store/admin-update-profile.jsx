import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useAdminProfileStore = create(
  persist(
    (set) => ({
      profileData: null,
      isLoading: false,
      updateProfile: async (formData) => {
        set({ isLoading: true });
        try {
          const response = await axios.post(
            "/api/v1/admin/update-profile",
            formData,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "accessToken"
                )}`,
              },
            }
          );

          set({
            profileData: {
              email: response.data.email,
              fullName: response.data.fullName,
              image: response.data.image,
            },
          });

          console.log("Profile updated successfully:", response.data);
        } catch (error) {
          console.error("Error updating profile:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      setProfileData: (profile) => {
        set({ profileData: profile });
      },
    }),
    {
      name: "admin-profile-store",
      getStorage: localStorage,
    }
  )
);

import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";
import { apiService } from "@/services/apiService";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("token"));

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem("token");
    router.push("/login");
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearToken();
      router.push("/login");
    }
  };

  return { token, setToken, clearToken, logout };
});

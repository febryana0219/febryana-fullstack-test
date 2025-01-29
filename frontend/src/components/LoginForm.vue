<template>
  <div class="d-flex min-vh-100 align-items-center justify-content-center bg-light">
    <div class="card shadow-lg p-4" style="width: 24rem; border-radius: 1rem;">
      <h2 class="text-center mb-4">Login</h2>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="login">
        <div class="mb-3 position-relative">
          <label for="email" class="form-label">Email</label>
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <i class="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control border-start-0"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <div class="mb-3 position-relative">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <i class="bi bi-lock"></i>
            </span>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control border-start-0"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary w-100 mb-3 shadow-sm"
          style="border-radius: 0.5rem;"
        >
          Login
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary w-100 shadow-sm"
          style="border-radius: 0.5rem;"
          @click="navigateToRegister"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/modules/auth";
import { authService } from "../services/authService";
import Swal from "sweetalert2";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const login = async () => {
      if (!email.value || !password.value) {
        errorMessage.value = "All fields are required.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errorMessage.value = "Invalid email format.";
        return;
      }
      try {
        const response = await authService.login(email.value, password.value);
        authStore.setToken(response.data.data.token);
        
        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/");
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Login failed. Please check your credentials.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    };

    const navigateToRegister = () => {
      router.push("/register");
    };

    return {
      email,
      password,
      errorMessage,
      login,
      navigateToRegister,
    };
  },
});
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}

.input-group-text {
  background-color: #f8f9fa;
}

.input-group-text i {
  font-size: 1.2rem;
  color: #6c757d;
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  border-color: #80bdff;
}

.btn-primary {
  background: linear-gradient(45deg, #007bff, #0056b3);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #0056b3, #003d80);
}
</style>

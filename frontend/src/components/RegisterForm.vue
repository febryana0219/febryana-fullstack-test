<template>
  <div class="d-flex min-vh-100 align-items-center justify-content-center bg-light">
    <div class="card shadow-lg p-4" style="width: 24rem; border-radius: 1rem;">
      <h2 class="text-center mb-4">Register</h2>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" v-model="name" class="form-control" placeholder="Enter your name" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" placeholder="Enter your password" required />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" placeholder="Confirm your password" required />
        </div>
        <button type="submit" class="btn btn-primary w-100 mb-3 shadow-sm" style="border-radius: 0.5rem;">Register</button>
        <button type="button" class="btn btn-outline-secondary w-100 shadow-sm" style="border-radius: 0.5rem;" @click="navigateToLogin">Back to Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default defineComponent({
  name: "RegisterForm",
  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");

    const register = async () => {
      if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        errorMessage.value = "All fields are required.";
        return;
      }
      if (password.value !== confirmPassword.value) {
        errorMessage.value = "Passwords do not match.";
        return;
      }
      try {
        Swal.fire({
          title: "Success!",
          text: "Registration successful!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/login");
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Registration failed.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    };

    const navigateToLogin = () => {
      router.push("/login");
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      errorMessage,
      register,
      navigateToLogin,
    };
  },
});
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>

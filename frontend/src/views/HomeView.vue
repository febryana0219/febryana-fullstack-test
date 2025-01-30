<template>
  <div class="container mt-5 text-center">
    <div class="row justify-content-center align-items-center" style="min-height: 80vh;">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-lg border-0">
          <div class="card-body py-5">
            <h1 class="display-4 fw-bold mb-3 text-primary">
              Inventory Apps
            </h1>
            <p class="lead text-muted mb-4">
              Dibuat untuk keperluan technical test
            </p>
            <p class="mb-4">
              Please <router-link to="/login" class="btn btn-outline-primary btn-lg me-2">Login</router-link>
              or <router-link to="/register" class="btn btn-primary btn-lg">Register</router-link> to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
});
</script>

<style scoped>
/* Main container */
.container {
  max-width: 100%;
  padding: 0 15px;
}

/* Card styling */
.card {
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 2rem;
  background-color: #fff;
}

/* Heading styling */
h1 {
  color: #0d6efd;
  font-size: 2.5rem;
}

p.lead {
  font-size: 1.25rem;
}

/* Button styling */
.btn-lg {
  padding: 10px 25px;
  font-size: 1.1rem;
}

/* Adjust card size and content spacing for smaller screens */
@media (max-width: 768px) {
  .card-body {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .btn-lg {
    padding: 8px 20px;
    font-size: 1rem;
  }
}

/* Adjust layout for very small screens */
@media (max-width: 480px) {
  h1 {
    font-size: 1.8rem;
  }

  .lead {
    font-size: 1rem;
  }

  .btn-lg {
    font-size: 0.9rem;
  }

  .container {
    padding: 0 10px;
  }
}
</style>

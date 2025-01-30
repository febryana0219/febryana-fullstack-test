<template>
  <div class="dashboard-container">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <span class="fs-4"><i class="bi bi-box"></i> Inventory Apps</span>
        </a>
        <button class="navbar-toggler" type="button" @click="toggleSidebar" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>

    <div class="dashboard-content d-flex">
      <!-- Sidebar -->
      <nav class="sidebar bg-light text-dark p-3" :class="{'collapsed': !isSidebarOpen}">
        <ul class="list-unstyled d-flex flex-column h-100">
          <li>
            <router-link to="/dashboard" class="text-dark text-decoration-none d-block py-2 sidebar-link" :class="{ active: isActive('/dashboard') }">
              <i class="fas fa-tachometer-alt me-2"></i> Dashboard
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/categories" class="text-dark text-decoration-none d-block py-2 sidebar-link" :class="{ active: isActive('/dashboard/categories') }">
              <i class="fas fa-cogs me-2"></i> Category
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/items" class="text-dark text-decoration-none d-block py-2 sidebar-link" :class="{ active: isActive('/dashboard/items') }">
              <i class="fas fa-cube me-2"></i> Item
            </router-link>
          </li>
          <li class="mt-auto">
            <button class="btn btn-danger w-100" @click="logout">
              <i class="fas fa-sign-out-alt me-2"></i> Logout
            </button>
          </li>
        </ul>
      </nav>

      <!-- Main Content -->
      <div class="main-content flex-grow-1 p-4">
        <router-view />

        <!-- Chart Component Display on Dashboard -->
        <ChartComponent v-if="isActive('/dashboard')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from 'vue-router';
import { useAuthStore } from "../store/modules/auth";
import ChartComponent from "../components/ChartComponent.vue";

export default defineComponent({
  name: "MenuView",
  components: { ChartComponent },
  setup() {
    const authStore = useAuthStore();
    const isSidebarOpen = ref(true);
    const route = useRoute();

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const logout = () => {
      authStore.logout();
    };

    const isActive = (path: string) => {
      if (path === '/dashboard') {
        return route.path === path;
      }
      return route.path.startsWith(path);
    };

    return { isSidebarOpen, toggleSidebar, logout, isActive };
  },
});
</script>


<style scoped>
.dashboard-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-content {
  display: flex;
  height: calc(100vh - 56px);
}

.sidebar {
  width: 250px;
  min-width: 250px;
  background-color: #f8f9fa;
  color: #343a40;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-right: 1px solid #dee2e6;
  position: relative;
}

.sidebar .sidebar-header {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #495057;
}

.sidebar .sidebar-link {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s, padding-left 0.2s, color 0.2s;
  color: #495057;
  display: flex;
  align-items: center;
}

.sidebar .sidebar-link:hover {
  background-color: #007bff;
  color: #ffffff;
  padding-left: 1rem;
}

.sidebar .sidebar-link i {
  font-size: 1.2rem;
  margin-right: 10px;
  transition: transform 0.2s ease-in-out;
}

.sidebar .sidebar-link:hover i {
  transform: scale(1.2);
}

.sidebar .sidebar-link.active {
  background-color: #007bff;
  color: #ffffff !important;
  font-weight: bold;
}

.sidebar.collapsed {
  transform: translateX(-100%);
  width: 0;
  padding: 0;
}

.main-content {
  background-color: #ffffff;
  flex-grow: 1;
  padding-left: 15px;
  padding-right: 15px;
  transition: all 0.3s ease;
  overflow-y: auto;
  height: calc(100vh - 56px);
}

@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    padding-top: 56px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sidebar.collapsed {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
    padding: 15px;
  }

  .navbar-toggler {
    z-index: 1001;
  }

  .sidebar button {
    position: absolute;
    bottom: 20px;
    left: 15px;
    z-index: 1000;
  }
}
</style>
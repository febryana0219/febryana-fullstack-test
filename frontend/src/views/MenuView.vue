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
        <div v-if="isActive('/dashboard')" class="mt-4">
          <ChartComponent :itemsData="itemsData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useAuthStore } from "../store/modules/auth";
import { useItemsStore } from "../store/modules/items";
import ChartComponent from "../components/ChartComponent.vue";  // Import ChartComponent

export default defineComponent({
  name: "MenuView",
  components: {
    ChartComponent,  // Register ChartComponent
  },
  setup() {
    const authStore = useAuthStore();
    const itemsStore = useItemsStore();
    const isSidebarOpen = ref(true);
    const route = useRoute();

    // Fetch items data on component mount
    onMounted(async () => {
      await itemsStore.fetchItems();
    });

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

    // Get items data from the store
    const itemsData = computed(() => itemsStore.items); 

    return { isSidebarOpen, toggleSidebar, logout, isActive, itemsData };
  },
});
</script>

<template>
  <div class="chart-container">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white text-center fw-bold">
        Quantity per Item
      </div>
      <div class="card-body">
        <!-- Dropdown Filter -->
        <div class="mb-3">
          <label for="categoryFilter" class="form-label">Select Category</label>
          <select v-model="selectedCategory" class="form-control">
            <option value="">All Category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Loading Spinner -->
        <div v-if="isLoading" class="text-center">Loading...</div>

        <!-- BarChart -->
        <BarChart v-else :chart-data="chartData" :chart-options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useItemsStore } from "../store/modules/items";

// Register Chart.js components
Chart.register(...registerables);

export default defineComponent({
  name: "ChartComponent",
  components: { BarChart },
  setup() {
    const itemsStore = useItemsStore();
    const isLoading = ref(true);
    const selectedCategory = ref(""); // Menyimpan kategori yang dipilih

    // Fetch items saat komponen dipasang
    onMounted(async () => {
      await itemsStore.fetchItems();
      isLoading.value = false;
    });

    // Ambil daftar kategori unik dari itemsStore
    const categories = computed(() => {
      const uniqueCategories = new Map();
      itemsStore.items.forEach((item) => {
        if (!uniqueCategories.has(item.category_id)) {
          uniqueCategories.set(item.category_id, { id: item.category_id, name: item.category_name });
        }
      });
      return Array.from(uniqueCategories.values());
    });

    // Filter item berdasarkan kategori yang dipilih
    const filteredItems = computed(() => {
      if (!selectedCategory.value) {
        return itemsStore.items;
      }
      return itemsStore.items.filter((item) => item.category_id === selectedCategory.value);
    });

    // Data untuk chart
    const chartData = computed(() => {
      return {
        labels: filteredItems.value.map((item) => item.name),
        datasets: [
          {
            label: "Quantity",
            backgroundColor: filteredItems.value.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`),
            data: filteredItems.value.map((item) => item.qty),
          },
        ],
      };
    });

    // Opsi chart
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        y: { beginAtZero: true },
      },
    };

    return { chartData, chartOptions, isLoading, categories, selectedCategory };
  },
});
</script>

<style scoped>
.chart-container {
  margin-top: 20px;
}
</style>

<template>
  <div class="card shadow-sm">
    <div class="card-header bg-success text-white text-center fw-bold">
      Price & Quantity per Item
    </div>
    <div class="card-body">
      <BarChart :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

export default defineComponent({
  name: "ChartComponent",
  components: {
    BarChart,
  },
  props: {
    itemsData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartData = computed(() => {
      return {
        labels: props.itemsData.map((item: any) => item.name),
        datasets: [
          {
            label: 'Price (IDR)',
            backgroundColor: props.itemsData.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`),
            data: props.itemsData.map((item: any) => item.price),
          },
          {
            label: 'Quantity',
            backgroundColor: props.itemsData.map(() => `hsl(${Math.random() * 360}, 70%, 40%)`),
            data: props.itemsData.map((item: any) => item.qty),
          }
        ]
      };
    });

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
      scales: {
        y: { beginAtZero: true },
      },
    };

    return { chartData, chartOptions };
  },
});
</script>

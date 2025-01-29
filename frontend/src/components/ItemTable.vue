<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white text-center fw-bold">
            Item List
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover table-bordered align-middle">
                <thead class="text-center">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Unit</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in items" :key="item.id">
                    <td class="text-center">{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td class="text-center">{{ item.qty }}</td>
                    <td class="text-end">{{ formatCurrency(item.price) }}</td>
                    <td class="text-center">{{ item.unit }}</td>
                    <td>{{ item.category_name }}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-primary me-2" @click="openEditModal(item)">
                        <i class="fas fa-edit"></i> Edit
                      </button>
                      <button class="btn btn-sm btn-outline-danger" @click="deleteItem(item.id)">
                        <i class="fas fa-trash-alt"></i> Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useItemsStore } from '../store/modules/items';

export default defineComponent({
  name: 'ItemTable',
  setup() {
    const itemsStore = useItemsStore();

    onMounted(async () => {
      await itemsStore.fetchItems();
    });

    const items = computed(() => itemsStore.items);
    const formatCurrency = (value: number) =>
      new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

    return { items, formatCurrency };
  },
});
</script>

import { defineStore } from 'pinia';
import { apiService } from '../../services/apiService';

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] as Array<any>,
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await apiService.getItems();
        this.items = response.data.data;
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    },

    async addItem(item: any) {
      try {
        const response = await apiService.createItem(item.name, item.qty, item.price, item.unit, item.category_id);
        this.items.push(response.data.data);
      } catch (error) {
        console.error('Failed to add item:', error);
      }
    },

    async updateItem(item: any) {
      try {
        // Pastikan Anda mengirimkan data yang benar sesuai dengan endpoint update di API
        const response = await apiService.updateItem(item.id, {
          name: item.name,
          qty: item.qty,
          price: item.price,
          unit: item.unit,
          category_id: item.category_id,
        });

        // Temukan item yang akan diupdate berdasarkan ID
        const index = this.items.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          // Ganti item yang sudah ada dengan data yang terbaru
          this.items[index] = response.data.data;
        }
      } catch (error) {
        console.error('Failed to update item:', error);
      }
    },

    async deleteItem(id: number) {
      try {
        await apiService.deleteItem(id);
        this.items = this.items.filter((i) => i.id !== id);
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    },
  },
});

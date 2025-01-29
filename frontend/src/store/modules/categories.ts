import { defineStore } from 'pinia';
import { apiService } from '../../services/apiService';

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as Array<any>,
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await apiService.getCategories();

        this.categories = response.data.data;
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },

    async addCategory(category: any) {
      try {
        const response = await apiService.createCategory(category.name);
        this.categories.push(response.data.data);
      } catch (error) {
        console.error('Failed to add category:', error);
      }
    },

    async updateCategory(category: any) {
      try {
        const response = await apiService.updateCategory(category.id, category.name);
        const index = this.categories.findIndex((c) => c.id === category.id);
        if (index !== -1) {
          this.categories[index] = response.data.data;
        }
      } catch (error) {
        console.error('Failed to update category:', error);
      }
    },

    async deleteCategory(id: number) {
      try {
        await apiService.deleteCategory(id);
        this.categories = this.categories.filter((c) => c.id !== id);
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    },
  },
});
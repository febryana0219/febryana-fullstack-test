import axios from 'axios';
import { useAuthStore } from '../store/modules/auth';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke dalam header
apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers['X-ACCESS-TOKEN'] = authStore.token;
  }
  return config;
});

export const apiService = {
  // User API
  login(email: string, password: string) {
    return apiClient.post('/users/login', { email, password });
  },
  register(email: string, password: string, name: string) {
    return apiClient.post('/users/register', { email, password, name });
  },

  // Category API
  createCategory(name: string) {
    return apiClient.post('/categories/create', { name });
  },
  getCategories() {
    return apiClient.get('/categories');
  },
  getCategory(id: number) {
    return apiClient.get(`/categories/${id}`);
  },
  updateCategory(id: number, name: string) {
    return apiClient.put(`/categories/${id}`, { name });
  },
  deleteCategory(id: number) {
    return apiClient.delete(`/categories/${id}`);
  },

  // Item API
  createItem(name: string, qty: number, price: number, unit: string, category_id: number) {
    return apiClient.post('/items/create', { name, qty, price, unit, category_id });
  },
  getItems() {
    return apiClient.get('/items');
  },
  getItem(id: number) {
    return apiClient.get(`/items/${id}`);
  },
  updateItem(id: number, items: any) {
    return apiClient.put(`/items/${id}`, { name: items.name, qty: items.qty, price: items.price, unit: items.unit, category_id: items.category_id });
  },
  deleteItem(id: number) {
    return apiClient.delete(`/items/${id}`);
  },
};
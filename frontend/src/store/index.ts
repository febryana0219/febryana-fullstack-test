import { createPinia } from 'pinia';
import { useAuthStore } from './modules/auth';
import { useCategoriesStore } from './modules/categories';
import { useItemsStore } from './modules/items';

const pinia = createPinia();

export { useAuthStore, useCategoriesStore, useItemsStore };
export default pinia;
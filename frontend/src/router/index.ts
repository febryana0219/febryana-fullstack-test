import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CategoriesView from '../views/CategoriesView.vue';
import ItemsView from '../views/ItemsView.vue';
import MenuView from '../views/MenuView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresGuest: true }, // Tambahkan meta untuk halaman yang hanya bisa diakses jika belum login
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresGuest: true },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: MenuView,
    meta: { requiresAuth: true }, // Hanya bisa diakses jika sudah login
    children: [
      {
        path: 'chart',
        name: 'Chart',
        component: CategoriesView,
        meta: { requiresAuth: true },
      },
      {
        path: 'categories',
        name: 'Categories',
        component: CategoriesView,
        meta: { requiresAuth: true },
      },
      {
        path: 'items',
        name: 'Items',
        component: ItemsView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' });
  } else if (to.meta.requiresGuest && isLoggedIn) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Products from './pages/Products.vue';
import WareHouse from './pages/WareHouse.vue';
import Supplies from './pages/Supplies.vue';
import AddSupplie from './pages/AddSupplie.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Products',
    component: Products,
  },
  {
    path: '/WareHouses',
    name: 'WareHouses',
    component: WareHouse,
  },
  {
    path: '/Supplies',
    name: 'Supplies',
    component: Supplies,
  },
  {
    path: '/AddSupplie',
    name: 'AddSupplie',
    component: AddSupplie,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;


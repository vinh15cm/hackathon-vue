// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import DashBoard from '../views/DashBoard.vue';
import ManagerUser from '../views/ManagerUser.vue';
import ManagerProduct from '../views/ManagerProduct.vue';

const routes = [
  {
    path: '/admin',
    name: 'Dashboard',
    component: DashBoard,
  },
  {
    path: '/admin/manager-user',
    name: 'ManagerUser',
    component: ManagerUser,
  },
  {
    path: '/admin/manager-product',
    name: 'ManagerProduct',
    component: ManagerProduct,
  },
  {
    path: '/',
    redirect: '/admin',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

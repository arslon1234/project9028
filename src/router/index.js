import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Auth/Login.vue'
import Warehouse from '../views/Warehouse/warehouse.vue'
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/warehouse',
    name: 'warehouse',
    component: Warehouse
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

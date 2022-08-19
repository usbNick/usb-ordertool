import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import NewOrder from '../views/NewOrder.vue'
import OrderArchive from '../views/OrderArchive.vue'

const routes = [
  {
    path: '/',
    name: 'NewOrder',
    component: NewOrder
  },
  {
    path: '/orders',
    name: 'OrderArchive',
    component: OrderArchive
  }
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
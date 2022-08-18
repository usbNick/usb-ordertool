import { createRouter, createWebHistory } from 'vue-router'
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

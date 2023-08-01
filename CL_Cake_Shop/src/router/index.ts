import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import ShoppingCart from '@/views/ShoppingCart.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCart
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Home from '@/components/Home.vue'
import Cart from '@/components/Cart.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      redirect: '/login'
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/register',
      name: 'register',
      component: Register
    },{
      path: '/home',
      name: 'home',
      component: Home
    },{
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})

export default router

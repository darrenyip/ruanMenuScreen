import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/lunch-menu',
      name: 'lunchMenu',
      component: () => import('../views/LunchMenuView.vue'),
    },
    {
      path: '/dinner-menu',
      name: 'dinnerMenu',
      component: () => import('../views/DinnerMenuView.vue'),
    },
    {
      path: '/other-menu',
      name: 'otherMenu',
      component: () => import('../views/OtherMenuView.vue'),
    },
  ],
})

export default router

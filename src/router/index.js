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
      path: '/lunch-menu-2',
      name: 'lunchMenu2',
      component: () => import('../views/LunchMenuView2.vue'),
    },
    {
      path: '/dinner-menu',
      name: 'dinnerMenu',
      component: () => import('../views/DinnerMenuView.vue'),
    },
    {
      path: '/dinner-menu-2',
      name: 'dinnerMenu2',
      component: () => import('../views/DinnerMenuView2.vue'),
    },
    {
      path: '/other-menu',
      name: 'otherMenu',
      component: () => import('../views/OtherMenuView.vue'),
    },
    {
      path: '/lunch-menu-tomorrow',
      name: 'lunchMenuTomorrow',
      component: () => import('../views/LunchMenuTomorrowView.vue'),
    },
    {
      path: '/dinner-menu-tomorrow',
      name: 'dinnerMenuTomorrow',
      component: () => import('../views/DinnerMenuTomorrowView.vue'),
    },
    {
      path: '/other-menu-tomorrow',
      name: 'otherMenuTomorrow',
      component: () => import('../views/OtherMenuTomorrowView.vue'),
    },
  ],
})

export default router

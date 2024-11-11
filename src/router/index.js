import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/stores/userStore.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {requiresAuth: true},
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {requiresAuth: true},
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

router.beforeEach(async(to, from, next) => {
  const userStore = useUserStore();
  await userStore.getCurrentUser();

  if(to.meta.requiresAuth && !userStore.user){
    next('/login');
  }else{
    next();
  }
});

export default router

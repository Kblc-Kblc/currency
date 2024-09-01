import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '../views/PageHome.vue'
import PageConvert from '../views/PageConvert.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome,
    },
    {
      path: '/convert',
      name: 'Convert',
      component: PageConvert,
    },
  ],
})

export default router

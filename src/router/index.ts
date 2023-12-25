import ClothingDonationViewVue from '@/views/ClothingDonationView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  //TODO: path / and /home to (../views/Home.vue), once this has been implemented
  routes: [
    {
      path: '/clothingdonation',
      name: 'clothingdonation',
      component: () => import('../views/ClothingDonationView.vue')
    },
    {
      path: '/',
      redirect: '/clothingdonation'
    },
    {
      path: '/home',
      redirect: '/clothingdonation'
    }
  ]
})

export default router

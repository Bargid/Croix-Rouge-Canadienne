import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ValidateCertificate from '../views/ValidateCertificate/ValidateCertificate.vue'
import ContactUs from '../views/ContactUs/ContactUs.vue'
import Shop from '../views/Shop/Shop.vue'
import SignIn from '../views/SignIn/SignIn.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  
  {
    path: '/validatecertificate',
    name: 'validatecertificate',
    component: ValidateCertificate
  },
  {
    path: '/contactus',
    name: 'contactus',
    component: ContactUs
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

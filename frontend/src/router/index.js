
import { createRouter, createWebHistory } from 'vue-router'

import Ticketform from '/src/views/Ticketform.vue'

const routes = [


   {
      path: '/',
      component: Ticketform,
   },

   {
      path: '/recap/:ticketId',
      component: () => import('/src/views/ticketRecap.vue'),
      props: true,
   },

]

const router = createRouter({
   history: createWebHistory('/'),
   routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

import Ticketform from '/src/views/Ticketform.vue'
import Ticketslist2 from '/src/views/ticketslist2.vue'
import Ticketslist from '/src/views/ticketslist.vue'
import TicketCard from '/src/components/TicketCard.vue'

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
   

   {
      path: '/ticketslist',
      component: Ticketslist, 
      // children: [
      //    {
      //       path: ':ticketId',
            
      //       component: TicketDetail,
      //       // component: () => import('/src/components/CityDetail.vue'),
      //       props: true
      //    },
      // ],
      
   },

   {
      path: '/ticketslist2',
      component: Ticketslist2,
   },

]

const router = createRouter({
   history: createWebHistory('/'),
   routes,
})

export default router
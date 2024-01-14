/**
 * Vue Router Configuration
 * 
 * Configures the Vue Router with the specified routes and history mode.
 * 
 * @module router
 */

import { createRouter, createWebHistory } from 'vue-router'

import Ticketform from '/src/views/Ticketform.vue'
import Ticketslist2 from '/src/views/ticketslist2.vue'
import Ticketslist from '/src/views/ticketslist.vue'

/**
 * Routes for the Vue Router.
 * 
 * Each route is defined with a path and a corresponding component.
 * Nested routes are used for detailed views or child components.
 * 
 * @type {Array}
 */
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
      path: '/tickets',
      component: Ticketslist,
      children: [
         {
            path: ':ticketId',
            component: () => import('/src/components/TicketDetail.vue'),
            props: true
         },
      ],
   },
   {
      path: '/ticketslist2',
      component: Ticketslist2,
   },
]

/**
 * Vue Router instance.
 * 
 * Configures the router with history mode and the defined routes.
 * 
 * @type {Object}
 */
const router = createRouter({
   history: createWebHistory('/'),
   routes,
})

// Export the router instance for use in the Vue app.
export default router

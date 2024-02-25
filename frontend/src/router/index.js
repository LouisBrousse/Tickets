import { createRouter, createWebHistory } from "vue-router";

import Ticketform from "/src/views/ticketForm.vue";
import Ticketslist from "/src/views/ticketsList.vue";
import signin from "/src/views/signIn.vue";
import Welcomepage from "/src/views/welcome.vue";
import register from "/src/views/register.vue";
import Admin from "/src/views/admin.vue";
import { authGuard } from "../_helpers/auth-gard";

const routes = [
  {
    path: "/",
    component: Welcomepage,
  },

  {
    path: "/signin",
    component: signin,
  },

  {
    path: "/register",
    component: register,
  },

  {
    path: "/ticketForm",
    component: Ticketform,
    beforeEnter: authGuard,
  },

  {
    path: "/admin",
    component: Admin,
    beforeEnter: authGuard,
  },

  {
    path: "/recap/:ticketId",
    component: () => import("/src/views/ticketRecap.vue"),
    props: true,
    beforeEnter: authGuard,
  },

  {
    path: "/tickets",
    component: Ticketslist,
    children: [
      {
        path: ":ticketId",
        component: () => import("/src/components/TicketDetail.vue"),
        props: true,
      },
    ],
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

// Export the router instance for use in the Vue app.
export default router;

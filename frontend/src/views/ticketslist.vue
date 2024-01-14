<template>
  <!-- Container for the entire component -->
  <div class="bg-gray-100 h-screen">
      <!-- Title of the ticket list -->
      <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center p-8">Liste des tickets</h1>

      <!-- Grid layout with two columns -->
      <div class="m-4 p-4 w-full grid grid-cols-2">
          <!-- Left column for ticket cards -->
          <div class="basis 1/2 p-4"> 
              <!-- Loop through all tickets and display TicketCard component for each -->
              <div id="card" v-for="ticket in allTickets" :key="ticket.id">
                  <TicketCard :ticketId="ticket.id" @click="onClick(ticket.id)" :selected="ticket.id === selectedTicketId"></TicketCard>
              </div>     
          </div>

          <!-- Right column for router view -->
          <div class="basis 2/2 p-4">
              <!-- Display the router view -->
              <router-view class="w-full"></router-view>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import TicketCard from '/src/components/TicketCard.vue'
import router from '/src/router'
import { allTickets } from '../use/useTickets'

// Reference for the list of tickets
const listetickets = ref([]);

// Reference for the current route
const route = useRoute();

// Reference for the selected ticket ID
const selectedTicketId = ref(route.params.ticketId)

// Assign the value of allTickets to listetickets
listetickets.value = allTickets

// Function to handle click events on ticket cards
const onClick = (ticketId) => {
  selectedTicketId.value = ticketId
  router.push(`/tickets/${ticketId}`)
}
</script>

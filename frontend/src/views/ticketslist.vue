<template>
    <div class="bg-gray-100">
       <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center p-8">Liste des tickets</h1>
       <div class="m-4 p-4 w-full grid grid-cols-2">
        <div class=  "basis 1/2 p-4">
         
         <div id="card" v-for="ticket in allTickets" >
            <TicketCard :ticketId="ticket.id" @click="onClick(ticket.id)" :selected="ticket.id == selectedTicketId"> </TicketCard>
         </div>
             
       </div>
       <div class=  "basis 2/2  p-4">
         <router-view class="w-full"></router-view>
       </div></div>
       
    </div>
    
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TicketCard from '/src/components/TicketCard.vue'
import router from '/src/router'
import { allTickets } from '../use/useTickets'

const listetickets = ref([])

const route = useRoute()
const selectedTicketId = ref(route.params.ticketId)


// onMounted(async () => {
listetickets.value = allTickets
//     console.log("All tickets loaded")
// })

const onClick = (ticketId) => {
  selectedTicketId.value = ticketId
  router.push(`/tickets/${ticketId}`)
}
  </script>
  
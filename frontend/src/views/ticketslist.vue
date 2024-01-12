<template>
    <div class="bg-gray-100 h-screen">
       <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center p-8">Liste des tickets</h1>
       <div class="flex p-4">
        <div class=  "basis 1/2">
         
         <div id="card" v-for="ticket in listetickets" >
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

const listetickets = ref([])

const route = useRoute()
const selectedTicketId = ref(route.params.ticketId)


onMounted(async () => {
    const response = await fetch(`/api/ticket`)
    listetickets.value= await response.json()
    console.log("liste", listetickets)
})

const onClick = (ticketId) => {
  selectedTicketId.value = ticketId
  router.push(`/tickets/${ticketId}`)
}
  </script>
  
<template>
    <div class="bg-gray-100 h-screen">
       <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center p-8">Liste des tickets</h1>
       <div class=  "basis 1/2">
         
         <div id="card" v-for="ticket in listetickets" >
            <TicketCard :ticketId="ticket.id"> </TicketCard>
         </div>
             
       </div>
       <div class=  "basis 2/2">
         <router-view></router-view>
       </div>
    </div>
    
  </template>
  
  <script setup>
 import { ref, onMounted } from 'vue'
 import { format } from 'date-fns';
 import TicketCard from '/src/components/TicketCard.vue'
 
 import { CATEGORIES, PRIORITIES } from '../constants'
 
 const listetickets = ref({})
 
 const formatDateTime = (dateTime) => {
   return format(new Date(dateTime), 'dd/MM/yyyy HH:mm:ss');
 };
 
 onMounted(async () => {
     const response = await fetch(`/api/ticket`)
     console.log("liste", response)
     listetickets.value= await response.json()
     console.log("liste", listetickets)
  })
  </script>
  
<template>
  <Menu></Menu>
  <!-- Container for the entire component -->
  <div class="bg-gray-100 h-content p-4">
    <div id="Filter" class="flex mb-3">
      <span class="mr-2 font-bold">Priorités :</span>
      <ul class="flex space-x-1">
        <li>
          <a
            href="#"
            @click="togglePriority('low')"
            :class="{ 'opacity-20': !filteredPriorities.has('low') }"
            class="bg-green-500 rounded-full px-3 py-2 text-sm font-semibold text-gray-700"
          >
            {{ PRIORITIES["low"] }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click="togglePriority('normal')"
            :class="{ 'opacity-20': !filteredPriorities.has('normal') }"
            class="bg-orange-500 rounded-full px-3 py-2 text-sm font-semibold text-gray-700"
          >
            {{ PRIORITIES["normal"] }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click="togglePriority('high')"
            :class="{ 'opacity-20': !filteredPriorities.has('high') }"
            class="bg-red-500 rounded-full px-3 py-2 text-sm font-semibold text-gray-700"
          >
            {{ PRIORITIES["high"] }}
          </a>
        </li>
      </ul>
      <span class="ml-8 mr-2 font-bold">Catégories :</span>
      <ul class="flex space-x-1">
        <li>
          <a
            href="#"
            @click="toggleCategory('furniture')"
            :class="{ 'opacity-20': !filteredCategories.has('furniture') }"
            class="bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700"
          >
            {{ CATEGORIES["furniture"] }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click="toggleCategory('computer')"
            :class="{ 'opacity-20': !filteredCategories.has('computer') }"
            class="bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700"
          >
            {{ CATEGORIES["computer"] }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click="toggleCategory('other')"
            :class="{ 'opacity-20': !filteredCategories.has('other') }"
            class="bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700"
          >
            {{ CATEGORIES["other"] }}
          </a>
        </li>
      </ul>
    </div>

    <!-- Title of the ticket list -->
    <h1 class="text-4xl font-bold mb-8 text-gray-800 text-center p-8">
      Liste des tickets
    </h1>

    <!-- Grid layout with two columns -->
    <div class="m-4 p-4 w-full grid grid-cols-2">
      <!-- Left column for ticket cards -->
      <div class="basis 1/2 p-4">
        <!-- Loop through all tickets and display TicketCard component for each -->
        <div id="card" v-for="ticket in visibleTickets" :key="ticket.id">
          <TicketCard
            :ticketId="ticket.id"
            @click="onClick(ticket.id)"
            :selected="ticket.id === selectedTicketId"
          ></TicketCard>
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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import TicketCard from "/src/components/TicketCard.vue";
import Menu from "../components/Menu.vue";
import router from "/src/router";
import { PRIORITIES, CATEGORIES } from "../constants";
import { allTickets } from "../use/useTickets";

// Reference for the current route
const route = useRoute();

// Reference for the selected ticket ID
const selectedTicketId = ref(route.params.ticketId);

// Function to handle click events on ticket cards
const onClick = (ticketId) => {
  selectedTicketId.value = ticketId;
  console.log("selectedTicketId :", selectedTicketId.value);
  router.push(`/tickets/${ticketId}`);
};  

const filteredPriorities = ref(new Set(["low", "normal", "high"]));
const togglePriority = (priority) => {
  if (filteredPriorities.value.has(priority)) {
    filteredPriorities.value.delete(priority);
  } else {
    filteredPriorities.value.add(priority);
  }
  router.push(`/tickets`);
};

const filteredCategories = ref(new Set(["furniture", "computer", "other"]));
const toggleCategory = (category) => {
  if (filteredCategories.value.has(category)) {
    filteredCategories.value.delete(category);
  } else {
    filteredCategories.value.add(category);
  }
  router.push(`/tickets`);
};

const visibleTickets = computed(() =>
  allTickets.value

    // filter list by priorities
    .filter((ticket) => filteredPriorities.value.has(ticket.priority))
    // filter list by categories
    .filter((ticket) => filteredCategories.value.has(ticket.category))
    // sort result by 'created_at' attribute
    .sort((ticket1, ticket2) => {
      // return new Date(ticket1.created_at) - new Date(ticket2.created_at)
      if (ticket1.created_at < ticket2.created_at) return -1;
      if (ticket1.created_at > ticket2.created_at) return 1;
      return 0;
    })
);
</script>

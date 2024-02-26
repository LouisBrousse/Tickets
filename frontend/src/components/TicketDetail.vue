<!-- 
This Vue.js Single File Component (SFC) represents a ticket detail view. 
It includes the template section for rendering the ticket information, 
such as category, ID, details, and priority. The script setup section 
defines the component logic using the Composition API, including the props 
definition, a function to format date and time, and the asynchronous fetching 
of ticket details from an API endpoint. The component fetches ticket details 
on mount and updates them when the ticketId prop changes. 
Additionally, class bindings are used for dynamic styling based on the 
ticket's category and priority.

-->

<template>
  <!-- Ticket Detail Component -->
  <div>
    Detail
    <div
      id="card"
      class="max-w-md rounded-lg overflow-hidden shadow-lg bg-white"
    >
      <!-- Category Information -->
      <div class="text-left px-2 py-2">
        <span
          class="inline-block rounded-full px-2 py-1 text-sm font-semibold mr-2 w-28 text-center"
          :class="{
            'bg-gray-200': ticket.category === 'furniture',
            'bg-gray-300 ': ticket.category === 'computer',
            'bg-gray-400': ticket.category === 'other',
          }"
        >
          {{ CATEGORIES[ticket.category] }}
        </span>
      </div>

      <!-- Ticket ID -->
      <div class="font-bold text-xl px-6 mb-2">
        Id# : <a>{{ ticket.id }}</a>
      </div>

      <!-- Ticket Details -->
      <div class="px-6 py-4">
        <div class="text-base mb-2">
          Email: <a>{{ ticket.email }}</a>
        </div>
        <div class="text-base mb-2">
          Date : <a>{{ formatDateTime(ticket.created_at) }}</a>
        </div>
        <div class="text-gray-700 text-lg">
          Description :
          <a class="text-gray-700 text-base">{{ ticket.description }}</a>
        </div>
      </div>

      <!-- Priority Information -->
      <div class="px-2 py-4 text-right">
        <span
          class="inline-block rounded-full px-2 py-1 text-sm font-semibold mr-2 w-28 text-center"
          :class="{
            'bg-green-500': ticket.priority === 'low',
            'bg-orange-500': ticket.priority === 'normal',
            'bg-red-500': ticket.priority === 'high',
          }"
        >
          {{ PRIORITIES[ticket.priority] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { format } from "date-fns";
import { CATEGORIES, PRIORITIES } from "../constants";
import { asyncTicket } from "../use/useTickets";

// Function to format date and time
const formatDateTime = (dateTime) => {
  if (!dateTime) return "";
  return format(new Date(dateTime), "dd/MM/yyyy HH:mm:ss");
};

// Props definition
const props = defineProps({
  ticketId: {
    type: [Number, String],
    required: true,
  },
});

// Ticket data reference
const ticket = ref({});

// Fetch ticket details on component mount
onMounted(async () => {
  ticket.value = await asyncTicket(props.ticketId);
  console.log("ticket detail", ticket.value);
});  

// Watch for changes in ticketId prop and update ticket details
watch(
  () => props.ticketId,
  async () => {
    const response = await fetch(`/api/ticket/${props.ticketId}`);
    ticket.value = await response.json();
    console.log("ticket : ", ticket.value);
  }
);
</script>

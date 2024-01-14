<template>
  <!-- Ticket Card Component -->
  <div class="max-w-md rounded-lg overflow-hidden shadow-lg m-4 cursor-pointer" :class="{'bg-gray-200': selected}">
    <!-- Category Information -->
    <div id="category" class="text-left px-2 py-2">
      <span
        class="inline-block rounded-full px-2 py-1 text-sm font-semibold mr-2 w-28 text-center"
        :class="{
          'bg-yellow-200': ticket.category === 'furniture',
          'bg-orange-200 ': ticket.category === 'computer',
          'bg-purple-200': ticket.category === 'other'
        }"
      >
        {{ CATEGORIES[ticket.category] }}
      </span>
    </div>

    <!-- Ticket ID -->
    <div id="id" class="font-bold text-xl px-6 mb-2">Id# : <a>{{ ticket.id }}</a></div>

    <!-- Ticket Date -->
    <div id="date" class="px-6 py-4">
      <div class="text-base mb-2">Date : <a>{{ formatDateTime(ticket.created_at) }}</a></div>
    </div>

    <!-- Priority Information -->
    <div id="priority" class="px-2 py-4 text-right">
      <span
        class="inline-block rounded-full px-2 py-1 text-sm font-semibold mr-2 w-28 text-center"
        :class="{
          'bg-blue-700 text-green-200': ticket.priority === 'low',
          'bg-green-500 text-green-100': ticket.priority === 'normal',
          'bg-red-700 text-red-200': ticket.priority === 'high'
        }"
      >
        {{ PRIORITIES[ticket.priority] }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
import { format } from 'date-fns';
import { CATEGORIES, PRIORITIES } from '../constants';
import { asyncTicket } from '../use/useTickets';

// Function to format date and time
const formatDateTime = (dateTime) => {
  if (!dateTime) return '';
  return format(new Date(dateTime), 'dd/MM/yyyy HH:mm:ss');
};

// Props definition
const props = defineProps({
  ticketId: {
    type: [Number, String],
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

// Ticket data reference
const ticket = ref({});

// Watch for changes in ticketId prop and update ticket details
watch(() => props.ticketId, async () => {
  ticket.value = await asyncTicket(props.ticketId);
}, {
  immediate: true
});
</script>

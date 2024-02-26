<template>
  <!-- Ticket Card Component -->
  <div
    class="max-w-md rounded-lg overflow-hidden shadow-lg m-4 cursor-pointer"
    :class="{ 'bg-gray-200': selected }"
  >
    <!-- Category Information -->
    <div id="category" class="text-left px-2 py-2">
      <span
        class="inline-block rounded-full px-2 py-1 text-sm font-semibold mr-2 w-28 text-center"
        :class="{
          'bg-gray-200': ticket.category === 'furniture',
          'bg-gray-300': ticket.category === 'computer',
          'bg-gray-400': ticket.category === 'other',
        }"
      >
        {{ CATEGORIES[ticket.category] }}
      </span>
    </div>

    <!-- Ticket ID -->
    <div id="id" class="font-bold text-xl px-6 mb-2">
      Id# : <a>{{ ticket.id }}</a>
    </div>
    <div id="id" class="text-xl px-6 mb-2">
      User : <a>{{ ticket.email }}</a>
    </div>

    <!-- Ticket Date -->
    <div id="date" class="px-6 py-4">
      <div class="text-base mb-2">
        Date : <a>{{ formatDate(ticket.created_at) }}</a>
      </div>
    </div>

    <!-- Priority Information -->
    <div id="priority" class="px-2 py-4 text-right">
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
</template>

javascript
<script setup>
import { computed } from "vue";
import { format } from "date-fns";
import { CATEGORIES, PRIORITIES } from "../constants";
import { ticketOfId } from "../use/useTickets";

// Définition des props
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

// Référence aux données du ticket
const ticket = computed(() => ticketOfId.value(props.ticketId));

// Fonction pour formater la date et l'heure
function formatDate(isoDate) {
  if (!isoDate) return "";
  return format(new Date(isoDate), "dd/MM/yyyy HH:mm");
}
</script>


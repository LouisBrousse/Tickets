<template>
  <!-- Container with maximum width, centered, and top margin -->
  <div class="max-w-md mx-auto mt-8">
    <!-- Success message -->
    <p class="my-4 p-2 w-full text-3xl">Votre demande a bien été enregistrée</p>

    <!-- Ticket details -->
    <label class="mt-4 text-xl font-medium text-gray-700"
      >Identifiant :
      <span class="mt-1 p-2 w-full text-2xl">{{ ticket.id }}</span></label
    >
    <label class="block mt-4 text-xl font-medium text-gray-700"
      >Email :
      <span class="mt-1 p-2 w-full text-2xl">{{ ticket.email }}</span></label
    >
    <label class="block mt-4 text-xl font-medium text-gray-700"
      >Catégorie :
      <span class="mt-1 p-2 w-full text-2xl">{{
        CATEGORIES[ticket.category]
      }}</span></label
    >

    <!-- Description with border and rounded corners -->
    <label class="block mt-4 text-xl font-medium text-gray-700"
      >Description</label
    >
    <p class="mt-1 p-2 border rounded-md w-full text-sm">
      {{ ticket.description }}
    </p>

    <!-- Priority details -->
    <label class="block mt-4 text-xl font-medium text-gray-700"
      >Priorité :
      <span class="mt-1 p-2 w-full text-2xl">{{
        PRIORITIES[ticket.priority]
      }}</span></label
    >

    <!-- Link to enter another request -->
    <a href="/ticketForm" class="block mt-4 text-blue-500 hover:underline"
      >Saisir une autre demande</a
    >
    <a href="/tickets" class="block mt-4 text-blue-500 hover:underline"
      >Voir la liste des tickets</a
    >
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CATEGORIES, PRIORITIES } from "../constants";

// Définir les props avec ticketId comme prop requis
const props = defineProps({
  ticketId: {
    type: [Number, String],
    required: true,
  },
});

// Référence pour les données du ticket
const ticket = ref({});

// Récupérer les données du ticket lors du montage du composant
onMounted(async () => {
  const response = await fetch(`/api/ticket/${props.ticketId}`);
  ticket.value = await response.json();
});
</script>

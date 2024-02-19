<template>
  <div class="relative bg-slate-900">
    <!-- Bouton d'icône pour afficher le menu -->
    <button @click="toggleMenu" class="text-gray-500 focus:outline-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0-5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Menu -->
    <transition name="fade">
      <div
        v-if="showMenu"
        class="absolute top-0 left-0 mt-12 w-48 bg-slate-900 rounded-lg shadow-lg z-10"
        v-on-click-outside="hideMenu"
      >
        <ul>
          <!-- Liens du menu -->
          <li
            @click="route2home"
            class="cursor-pointer px-4 py-2 text-white hover:bg-slate-700 rounded-lg"
          >
            Home
          </li>

          <li
            @click="route2tickets"
            class="cursor-pointer px-4 py-2 text-white hover:bg-slate-700 rounded-lg"
          >
            Tickets
          </li>
          <li
            @click="route2form"
            class="cursor-pointer px-4 py-2 text-white hover:bg-slate-700 rounded-lg"
          >
            Ticket Form
          </li>
          <li
            @click="route2signin"
            class="cursor-pointer px-4 py-2 text-white hover:bg-slate-700 rounded-lg"
          >
            Sign In
          </li>
          <!-- Ajoutez d'autres liens ici -->
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import router from "../router";
import { ref } from "vue";
import { vOnClickOutside } from '@vueuse/components';

const showMenu = ref(false);

const toggleMenu = () => {
  if (showMenu.value === false) {
    showMenu.value = true;
  } else {
    showMenu.value = false;
  }
};
const hideMenu = () => {
  showMenu.value = false;
};

const route2home = () => {
  router.push(`/`);
};

const route2tickets = () => {
  router.push(`/tickets`);
};

const route2form = () => {
  router.push(`/ticketForm`);
};

const route2signin = () => {
  router.push(`/signin`);
};
</script>

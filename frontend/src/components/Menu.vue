<template>
  <div class="relative bg-slate-900 flex justify-between p-2">
    <!-- Bouton d'icône pour afficher le menu -->
    <button @click="toggleMenu" class="text-gray-200 focus:outline-none">
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

    <span v-if="isLogin" class="mr-2 text-gray-200">User : {{ user }}</span>
    <!-- Section de déconnexion -->
    <div class="logoutbutton">
      <div v-if="isLogin">
        <button @click="logout" class="flex items-center">
          <span class="mr-2 text-gray-200">Log out</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-gray-200 logout"
            viewBox="0 0 20 20"
          >
            <g id="layer1">
              <path
                d="M 0 1 L 0 20 L 12 20 L 12 16 L 11 16 L 11 19 L 1 19 L 1 2 L 11 2 L 11 5 L 12 5 L 12 1 L 0 1 z M 15 7 L 18 10 L 5 10 L 5 11 L 18 11 L 15 14 L 16.5 14 L 20 10.5 L 16.5 7 L 15 7 z "
                style="
                  fill: #222222;
                  fill: currentColor;
                  stroke: none;
                  stroke-width: 0px;
                "
              />
            </g>
          </svg>
        </button>
      </div>
      <div v-else>
        <button @click="route2signin" class="flex items-center">
          <span class="mr-2 text-gray-200">Sign in</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-gray-200 login"
            viewBox="0 0 20 20"
          >
            <g id="layer1">
              <path
                d="M 8 1 L 8 5 L 9 5 L 9 2 L 19 2 L 19 19 L 9 19 L 9 16 L 8 16 L 8 20 L 20 20 L 20 1 L 8 1 z M 10 7 L 13 10 L 0 10 L 0 11 L 13 11 L 10 14 L 11.5 14 L 15 10.5 L 11.5 7 L 10 7 z "
                style="
                  fill: #222222;
                  fill: currentColor;
                  stroke: none;
                  stroke-width: 0px;
                "
              />
            </g>
          </svg>
        </button>
      </div>
    </div>

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
            @click="route2admin"
            class="cursor-pointer px-4 py-2 text-white hover:bg-slate-700 rounded-lg"
          >
            Admin
          </li>
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
import { vOnClickOutside } from "@vueuse/components";
import { getLoggedCookie } from "../_helper/cookie.js";

const showMenu = ref(false);
const isLogin = ref(getLoggedCookie()); // Détermine si l'utilisateur est connecté ou non
const user = ref(localStorage.getItem("username"));

const toggleMenu = () => {
  if (showMenu.value === false) {
    showMenu.value = true;
  } else {
    showMenu.value = false;
  }
};

const logout = async () => {
  // Effacer le local storage
  localStorage.removeItem("id2ticket"); // Supprimez les données de l'utilisateur (vous pouvez ajuster le nom de la clé selon votre cas)
  localStorage.removeItem("username");

  // Effacer les cookies
  document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  document.cookie = "logged=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";

  try {
    // Appel de l'API de logout côté serveur
    const response = await fetch("/api/logout", {
      method: "POST", // Utilisation de la méthode POST pour effectuer le logout
      credentials: "same-origin", // Inclure les cookies dans la requête
    });

    if (response.ok) {
      // Redirection vers la page d'accueil après le logout
      window.location.href = "/";
    } else {
      console.error("Logout request failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
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

const route2admin = () => {
  router.push(`/admin`);
};
</script>

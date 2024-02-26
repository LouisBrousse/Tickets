<template>
  <Menu></Menu>
  <div class="flex justify-center items-center h-screen gap-4">
    <div class="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4">
      <button
        @click="clearDB"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-60 p-4 rounded focus:outline-none focus:shadow-outline"
      >
        Effacer la DB
      </button>
      <button
        @click="toggleEffaceUser"
        class="p-4 bg-green-500 text-white rounded-md py-2 hover:bg-green-600 transition duration-300"
      >
        Effacer un User
      </button>

      <div v-if="showEffaceUser" class="effaceuser">
        <label class="block text-gray-700 text-l font-bold mb-2">
          Email de l'user</label
        >
        <input
          type="email"
          v-model="email"
          name="e-mail"
          Value=""
          placeholder="Email"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          @click="effacerUser"
          class="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Effacer
        </button>
        <p>{{ effacerUserMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from "../components/Menu.vue";
import { deleteDb } from "../use/useTickets";

// Référence réactive pour l'e-mail de l'utilisateur à supprimer
const email = ref("");

// Indicateur réactif pour afficher ou masquer la section de suppression d'utilisateur
const showEffaceUser = ref(false);

// Message de retour après la suppression d'utilisateur
const effacerUserMessage = ref("");

// Fonction pour basculer l'affichage de la section de suppression d'utilisateur
const toggleEffaceUser = () => {
  showEffaceUser.value = !showEffaceUser.value;
};

// Fonction pour supprimer un utilisateur
const effacerUser = async () => {
  // Envoi d'une requête DELETE à l'API pour supprimer l'utilisateur
  const response = await fetch("api/deleteUser", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.value }),
  });

  // Analyse de la réponse pour obtenir les données de retour
  const data = await response.json();

  // Gestion de la réponse de l'API
  if (data.status === "success") {
    console.log("User deleted", data);
    effacerUserMessage.value = "Utilisateur effacé avec succès.";
  } else {
    console.error("Failed to delete user:", data.message);
    effacerUserMessage.value =
      "Erreur lors de la suppression de l'utilisateur.";
  }
};

// Fonction pour effacer la base de données des tickets
const clearDB = async () => {
  await deleteDb();
};
</script>

<template>
  <Menu></Menu>
  <div class="flex flex-col justify-center items-center h-screen gap-4">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Connexion à l'App tickets</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="email" class="block">E-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            required
            class="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label for="password" class="block">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            required
            class="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300"
        >
          Se connecter
        </button>
      </form>
      <a v-if="errorMessage" class="text-red-500">{{ errorMessage }}</a>
    </div>
    <button
      @click="signIn2Register"
      class="p-4 bg-green-500 text-white rounded-md py-2 hover:bg-green-600 transition duration-300"
    >
      Première connection? Enregistrez vous ici!
    </button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Menu from "../components/Menu.vue";
import router from "../router";

// Références réactives pour les champs du formulaire et le message d'erreur
const email = ref("");
const password = ref("");
const errorMessage = ref("");

// Fonction pour soumettre le formulaire de connexion
const submitForm = async () => {
  // Envoyer les données de connexion à l'API pour authentification
  const response = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });

  // Récupérer la réponse de l'API
  const data = await response.json();

  // Gérer la réponse de l'API
  if (data.status === "success") {
    // Enregistrer le nom d'utilisateur dans le localStorage
    localStorage.setItem("username", data.user);
    console.log("Login successful");
    router.push("/tickets"); // Rediriger vers la page des tickets après une connexion réussie
  } else {
    console.error("Login failed:", data.message);
    errorMessage.value = data.message; // Afficher le message d'erreur en cas d'échec de connexion
  }
};

// Fonction pour rediriger vers la page d'inscription
const signIn2Register = () => router.push("/register");
</script>

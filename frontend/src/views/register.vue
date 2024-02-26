<template>
  <Menu></Menu>
  <div class="flex flex-col justify-center items-center h-screen gap-4">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4">Enregistrement de l'User</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div
          class="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        >
          <label for="email" class="block">E-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            required
          />
        </div>
        <div
          class="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
        >
          <label for="password" class="block">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            v-model="password"
            required
          />
        </div>
        <div>
          <input
            class="p-4"
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            value="isAmin"
            v-model="isAdmin"
          />
          <label class="p-4" for="isAdmin">Administrateur</label>
        </div>
        <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
        >
          Se connecter
        </button>
      </form>
      <a v-if="errorMessage" class="text-red-500">{{ errorMessage }}</a>
    </div>
    <button
      @click="register2SignIn"
      class="p-4 bg-green-500 text-white rounded-md py-2 hover:bg-green-600 transition duration-300"
    >
      Déjà enregistré? entrez par ici!
    </button>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import Menu from "../components/Menu.vue";
import router from "../router";

// Références réactives pour les champs du formulaire et le message d'erreur
const email = ref("");
const password = ref("");
const isAdmin = ref(false);
const errorMessage = ref("");

// Expression régulière pour la validation de l'e-mail
let regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Propriété calculée pour valider l'e-mail
const isEmailValid = computed(() => regEmail.test(email.value) && email.value);

// Propriété calculée pour valider le mot de passe
const isPasswordValid = computed(() => password.value.length > 0);

// Propriété calculée pour valider le formulaire
const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value);

// Fonction pour soumettre le formulaire d'inscription
const submitForm = async () => {
  // Récupérer la valeur de isAdmin
  const isAdminValue = isAdmin.value;

  // Envoyer les données de formulaire à l'API pour l'enregistrement
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      isAdmin: isAdminValue,
    }),
  });

  // Récupérer la réponse de l'API
  const data = await response.json();

  // Gérer la réponse de l'API
  if (data.status === "success") {
    console.log("User created", data);
    router.push("/signin"); // Rediriger vers la page de connexion après l'inscription réussie
  } else {
    console.error("Register failed:", data.message);
    errorMessage.value = data.message; // Afficher le message d'erreur en cas d'échec de l'inscription
  }
};

// Fonction pour rediriger vers la page de connexion
const register2SignIn = () => router.push("/signin");
</script>

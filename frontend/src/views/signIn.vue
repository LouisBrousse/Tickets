<template>
  <Menu></Menu>
  <div class="flex justify-center items-center h-screen">
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
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Menu from "../components/Menu.vue";
import router from "../router";
import bcrypt from "bcryptjs";

const email = ref("");
const password = ref("");
const passwordcrypted = bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});





const submitForm = async () => {
  //envoi des datas de connections dans le header de la requête
  const response = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email: email.value,
      password: passwordcrypted.value,
    }),
  });
  //récupération de la réponse du serveur
  const data = await response.json();

  //gestion de la réponse
  if (data.status === "success") {
    console.log("Login successful");
    router.push("/tickets");
  } else {
    console.error("Login failed:", data.message);
  }
};
</script>

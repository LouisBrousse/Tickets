<template>
  <Menu></Menu>
  <div
    class="flex items-center justify-center h-screen bg-white rounded px-8 pt-6 pb-8 mb-4"
  >
    <div class="w-full max-w-xl">
      <h1 class="text-center text-4xl font-bold mb-4">Tickets</h1>

      <div class="flex flex-col mb-4">
        <label class="block text-gray-700 text-l font-bold mb-2"> Email</label>
        <input
          type="email"
          v-model="formData.email"
          name="e-mail"
          Value=""
          placeholder="Email"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="!isEmailValid">E-mail invalide</p>
      </div>

      <div class="flex flex-col mb-4">
        <label class="block text-gray-700 text-l font-bold mb-2">
          Category</label
        >
        <select
          v-model="formData.category"
          name="category"
          placeholder="category"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option v-for="option in OPTIONS" :value="option.value">
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col mb-4">
        <label class="block text-gray-700 text-l font-bold mb-2">
          Description</label
        >
        <textarea
          type="text"
          v-model="formData.description"
          name="description"
          placeholder="description"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>

      <div class="flex flex-col mb-4">
        <label class="block text-gray-700 text-l font-bold mb-2">
          Priority</label
        >
        <select
          v-model="formData.priority"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option v-for="option in OPTIONSprio" :value="option.value">
            {{ option.name }}
          </option>
        </select>
      </div>

      <div class="flex items-center justify-between">
        <button
          @click="submitForm"
          :disabled="!isFormValid"
          class="bg-blue-500 disabled:bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Valider
        </button>
      </div>

      <div class="flex items-center justify-end py-2">
        <button
          @click="clearForm"
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 w-60 p-4 rounded focus:outline-none focus:shadow-outline"
        >
          Clear
        </button>
      </div>

      <div class="flex items-center justify-end py-2">
        <button
          @click="fillFormRandomly"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-60 p-4 rounded focus:outline-none focus:shadow-outline"
        >
          Remplir le formulaire
        </button>
      </div>

      <div class="flex items-center justify-end py-2">
        <button
          @click="clearDB"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-60 p-4 rounded focus:outline-none focus:shadow-outline"
        >
          Effacer la DB
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "vue";
import router from "../router";
import { addTicket, deleteDb } from "../use/useTickets";
import Menu from "../components/Menu.vue";
// import { isAuthenticated, checkAuth } from "../use/useAuth"

const OPTIONS = [
  { value: "furniture", name: "mobilier" },
  { value: "computer", name: "informatique" },
  { value: "other", name: "autre" },
];

const OPTIONSprio = [
  { value: "low", name: "Faible" },
  { value: "normal", name: "Normale" },
  { value: "high", name: "Haute" },
];

const formData = ref({
  email: null,
  category: null,
  description: null,
  priority: null,
});

//const formData = ref({}) présentation possible

let regemail = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);

const isEmailValid = computed(
  () => regemail.test(formData.value.email) && formData.value.email
);
const isCategoryValid = computed(() => !!formData.value.category);
const isDescriptionValid = computed(
  () => formData.value.description && formData.value.description.length > 0
);
const isPriorityValid = computed(() => !!formData.value.priority);

const isFormValid = computed(
  () =>
    isDescriptionValid.value &&
    isEmailValid.value &&
    isCategoryValid.value &&
    isPriorityValid.value
);

const submitForm = async () => {
  try {
    const response = await addTicket(formData);
    console.log("response front", response);
    router.push(`/recap/${response.id}`);
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire :', error);
    // Gérer l'erreur ici, par exemple, afficher un message à l'utilisateur ou rediriger vers une page d'erreur
  }
}
const clearDB = async () => {
  const response = await deleteDb();
};

// ___________________________________________

const getRandomOption = () => {
  const randomIndex = Math.floor(Math.random() * OPTIONS.length);
  return OPTIONS[randomIndex].value;
};

const getRandomOptionprio = () => {
  const randomIndex = Math.floor(Math.random() * OPTIONSprio.length);
  return OPTIONSprio[randomIndex].value;
};

const getRandomEmail = () => {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `user${randomString}@example.com`;
};

const getRandomLoremIpsum = () => {
  const loremIpsumOptions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    // Ajoutez d'autres phrases "Lorem Ipsum" au besoin
  ];

  const randomIndex = Math.floor(Math.random() * loremIpsumOptions.length);
  let loremIpsum = loremIpsumOptions[randomIndex];

  // Générer un nombre aléatoire entre 50 et 20 pour déterminer le nombre de mots à ajouter
  const wordCount = Math.floor(Math.random() * (50 - 20 + 1)) + 20;

  // Fractionner la phrase en mots
  const words = loremIpsum.split(" ");

  // Sélectionner les premiers mots jusqu'à atteindre le nombre de mots aléatoire
  loremIpsum = words.slice(0, wordCount).join(" ");

  return loremIpsum;
};

// Exemple d'utilisation
const randomLoremIpsum = getRandomLoremIpsum();

const fillFormRandomly = () => {
  formData.value.email = getRandomEmail();
  formData.value.category = getRandomOption();
  formData.value.description = `Random description ${randomLoremIpsum}`;
  formData.value.priority = getRandomOptionprio();
};

const clearForm = () => {
  formData.value.email = null;
  formData.value.category = null;
  formData.value.description = null;
  formData.value.priority = null;
};
</script>
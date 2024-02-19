import { ref } from "vue";
import { computed } from "vue";
import router from "../router";
import { addTicket } from "../use/useTickets";


export const formData = ref({
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

export const isFormValid = computed(
  () =>
    isDescriptionValid.value &&
    isEmailValid.value &&
    isCategoryValid.value &&
    isPriorityValid.value
);

export const submitForm = async () => {
  const response = await addTicket(formData);
  console.log("response ticketForm", response);
  router.push(`/recap/${response.id}`);
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

export const fillFormRandomly = () => {
  formData.value.email = getRandomEmail();
  formData.value.category = getRandomOption();
  formData.value.description = `Random description ${randomLoremIpsum}`;
  formData.value.priority = getRandomOptionprio();
};

export const clearForm = () => {
  formData.value.email = null;
  formData.value.category = null;
  formData.value.description = null;
  formData.value.priority = null;
};
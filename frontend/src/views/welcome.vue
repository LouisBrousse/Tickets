<template>
  <Menu></Menu>
  <div class="flex flex-col justify-center items-center h-screen gap-4">
    <h1 class="text-4xl text-center">Welcome to Ticket App</h1>
    <button
      @click="route2signin"
      type="submit"
      class=" bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300 w-fit p-4"
    >
      Sign In
    </button>
    <button
      @click="route2register"
      type="submit"
      class=" bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300 w-fit p-4"
    >
      Register
    </button>
  </div>
</template>

<script setup>
import Menu from "../components/Menu.vue";
import router from "../router";

const route2signin = () => {
  router.push(`/signin`);
};

const route2register = () => {
  router.push(`/register`);
};
</script>

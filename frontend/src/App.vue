

<template>
  <div class="flex items-center justify-center h-screen bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="w-full max-w-xl">
      <h1>Tickets</h1>
     
        <div class="flex flex-col mb-4">
          <label class="block text-gray-700 text-l font-bold mb-2">
            Email</label>
          <input type="email" v-model ="formData.email" name="e-mail" Value="" placeholder="Email" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          <p v-if="!isEmailValid">E-mail invalide</p>
        </div>

        <div class="flex flex-col mb-4">
          <label class="block text-gray-700 text-l font-bold mb-2">
            Category</label>
          <select v-model="formData.category" name="category" placeholder="category" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" >
            
            <option v-for="option in OPTIONS" :value="option.value"> {{ option.name }}</option>          

          </select>
        </div>

        <div class="flex flex-col mb-4">
          <label class="block text-gray-700 text-l font-bold mb-2">
            Description</label>
          <textarea type="text" v-model ="formData.description" name="description" placeholder="description" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>

        <div class="flex flex-col mb-4">
          <label class="block text-gray-700 text-l font-bold mb-2">
            Priority</label>
          <select v-model="formData.priority" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
            <option value="low">Faible</option>
            <option value="normal">Normale</option>
            <option value="high">Haute</option>
         </select>
        </div>

        <div class="flex items-center justify-between">
          <button @click="submitForm" :disabled="!isFormValid" class="bg-blue-500 disabled:bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
            Valider</button>
        </div>
      cd 
    </div>
  </div>
  
  
</template>


<script setup>
import {ref} from 'vue'
import { computed } from "vue"



const OPTIONS = [
  {value: "furniture", name: "mobilier"},
  {value: "computer", name: "informatique"},
  {value: "other", name: "autre"}
]

const formData = ref({
  email: null,
  category: null,
  description: null,
  priority: null,
})

//const formData = ref({}) présentation possible

let regemail = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);

const isEmailValid = computed(()=> regemail.test(formData.value.email) && formData.value.email);
const isCategoryValid = computed(()=> !!formData.value.category);
const isDescriptionValid = computed(()=> formData.value.description && formData.value.description.length > 0);
const isPriorityValid = computed(()=> !!formData.value.priority);

const isFormValid = computed(()=> isDescriptionValid.value && isEmailValid.value && isCategoryValid.value && isPriorityValid.value);


const submitForm = async () => {
    console.log('Form submitted with data:', formData.value)
    const response = await fetch('/api/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    const responseData = await response.json();
    // console.log('Form submitted with data:', responseData);
}


</script>



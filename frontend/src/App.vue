

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-xl">
      <h1>Tickets</h1>
      <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        
        <div class="flex flex-col mb-4">
          <label class="block text-gray-700 text-l font-bold mb-2">
            Email</label>
          <input type="email" v-model ="formData.email" name="e-mail" Value="" placeholder="Email" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" >
          
        </div>

        <div class="flex flex-col mb-4">
          <label class="block text-gray-700 text-l font-bold mb-2">
            Category</label>
          <select type="select" v-model="formData.category" name="category" placeholder="category" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>

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
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
            Valider</button>

            
        </div>
        
        <div>
          {{ formData.email }}
        
        </div>

        <div>
          {{ formData.category }}
        </div>
        
        <div>
          {{ formData.description }}
        </div>

        <div>{{ formData.priority }}</div>


      </form>
    </div>
  </div>
  
  
</template>


<script setup>
import {ref} from 'vue'

const submitForm = (evt)=> console.log(formData.value)

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


</script>



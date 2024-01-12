<template>
        
<div class="max-w-md rounded overflow-hidden shadow-lg bg-white" :class="{'bg-gray-200': selected}">
                <div id="category" class="text-left px-2 py-2">
                <span class="inline-block rounded-full px-2 py-1 text-sm font-semibold mr-2 w-28 text-center"
                      :class="{
                         'bg-yellow-200': ticket.category === 'furniture',
                         'bg-orange-200 ': ticket.category === 'computer',
                         'bg-purple-200': ticket.category === 'other'
                      }">{{ CATEGORIES[ticket.category]}}</span>
                </div>
 
                <div id="id" class="font-bold text-xl px-6  mb-2">Id# : <a>{{ticket.id}}</a></div>
             
                <div id="date" class="px-6 py-4">
                    <div class="text-base mb-2">Date : <a>{{formatDateTime(ticket.created_at)}}</a></div>
                </div>
                <div id="priority" class="px-2 py-4 text-right">
                    <span class="inline-block rounded-full px-2 py-1 text-sm font-semibold mr-2 w-28 text-center"
                        :class="{
                            'bg-blue-700 text-green-200': ticket.priority === 'low',
                            'bg-green-500 text-green-100': ticket.priority === 'normal',
                            'bg-red-700 text-red-200': ticket.priority === 'high'
                        }">{{ PRIORITIES[ticket.priority]}}</span>
                </div>     
</div> 
                    
 
    
  </template>
  
  <script setup>
 import { ref, onMounted} from 'vue';
 import { format } from 'date-fns';
 import { CATEGORIES, PRIORITIES } from '../constants';
 import { asyncTicket } from '../use/useTickets';
 
 
 const formatDateTime = (dateTime) => {
    if (!dateTime) return ''

   return format(new Date(dateTime), 'dd/MM/yyyy HH:mm:ss');
 };

const props = defineProps({
    ticketId: {
       type: [Number, String],
       required: true,
    },
    selected: {
      type: Boolean,
      default: false,
   },
 })

 const ticket = ref({});

 onMounted(async () => {
    ticket.value = await asyncTicket(props.ticketId)
    console.log('ti', ticket.value)
})
</script>
  
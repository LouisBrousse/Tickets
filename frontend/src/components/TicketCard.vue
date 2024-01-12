<div id="card" v-for="ticket in listetickets" class="max-w-md rounded overflow-hidden shadow-lg bg-white">
    <div class="text-left px-2 py-2">
        <span class="inline-block rounded-full px-2 py-1 text-sm font-semibold mr-2 w-28 text-center"
        :class="{
        'bg-yellow-200': ticket.category === 'furniture',
        'bg-orange-200 ': ticket.category === 'computer',
        'bg-purple-200': ticket.category === 'other'
        }">{{ CATEGORIES[ticket.category]}}</span>
    </div>

    <div class="font-bold text-xl px-6  mb-2">Id# : <a>{{ticket.id}}</a></div>

    <div class="px-6 py-4">
        <div class="text-base mb-2">Email: <a>{{ticket.email}}</a></div>
        <div class="text-base mb-2">Date : <a>{{formatDateTime(ticket.created_at)}}</a></div>
    </div>
    <div class="px-2 py-4 text-right">
        <span class="inline-block rounded-full px-2 py-1 text-sm font-semibold mr-2 w-28 text-center"
        :class="{
        'bg-blue-700 text-green-200': ticket.priority === 'low',
        'bg-green-500 text-green-100': ticket.priority === 'normal',
        'bg-red-700 text-red-200': ticket.priority === 'high'
        }">{{ PRIORITIES[ticket.priority]}}</span>
    </div>

</div>
import { ref } from 'vue'

const id2ticket = ref ({})



export async function asyncTicket(ticketid){
    if (id2ticket[ticketid]) {
        return id2ticket.value[ticketid];
    }else{
        const response = await fetch(`/api/ticket/${ticketid}`)
        const ticket = await response.json()
        id2ticket.value[ticket.id] = ticket;
        return ticket
    }
}
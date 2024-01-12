import { ref, computed } from 'vue'

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


const ticketlistReady = ref(false)

export const allTickets = computed(()=>{
    if(ticketlistReady.value) {
        return Object.values(id2ticket.value)
    }
    fetch('/api/ticket').then(response=>response.json()) .then(ticketlist =>{
        for (const ticket of ticketlist){
            id2ticket.value[ticket.id] = ticket
        }
        ticketlistReady.value = true
    })
    return id2ticket
})


export async function addTicket(formData){
    console.log('formData :', formData.value)
    const response = await fetch('/api/ticket', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.value),
    });
    const createdTicket= await response.json()
    console.log('createdTicket :', createdTicket)

    id2ticket.value[createdTicket.id] = createdTicket;
    
    return createdTicket;
    
}
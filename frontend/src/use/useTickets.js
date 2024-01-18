import { ref, computed } from 'vue'

// Reactive reference to store ticket data based on ticket IDs
const id2ticket = ref({})

// Reactive reference to indicate whether the ticket list data is ready
const ticketlistReady = ref(false)

// Computed property to get all tickets
export const allTickets = computed(() => {
    // If the ticket list data is ready, return all tickets as an array
    if (ticketlistReady.value) {
        return Object.values(id2ticket.value)
    }
    
    // If the ticket list data is not ready, fetch it from the API
    fetch('/api/ticket')
        .then(response => response.json())
        .then(ticketlist => {
            // Populate the id2ticket reference with fetched ticket data
            for (const ticket of ticketlist) {
                id2ticket.value[ticket.id] = ticket
            }
            // Set ticketlistReady to true to indicate that the data is ready
            ticketlistReady.value = true
        })
    // Return null while waiting for the data to be fetched
    return []
})

// Function to asynchronously fetch ticket data by ticket ID
export async function asyncTicket(ticketid) {                   
    // If ticket data already exists in the reference, return it
    if (id2ticket.value[ticketid]) {
        return id2ticket.value[ticketid];
    } else {
        // Otherwise, fetch the ticket data from the API
        const response = await fetch(`/api/ticket/${ticketid}`)
        const ticket = await response.json()
        // Store the fetched ticket data in the reference for future use
        id2ticket.value[ticket.id] = ticket;
        return ticket
    }
}

// Function to add a new ticket using the provided form data
export async function addTicket(formData) {
 
    // Send a POST request to the API to create a new ticket
    const response = await fetch('/api/ticket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.value),
    });

    // Parse the response to get the created ticket data
    const createdTicket = await response.json()

    // Store the created ticket data in the id2ticket reference for future use
    id2ticket.value[createdTicket.id] = createdTicket;

    // Return the created ticket data
    return createdTicket;
}


// export const ticketOfId = computed(() => (id) => {
//     const ticket = id2ticket.value[id]
//     if (ticket) return ticket
//     fetch(`/api/ticket/${id}`).then(response => response.json()).then(ticket => {
//        id2ticket.value[ticket.id] = ticket
//     })
//  })
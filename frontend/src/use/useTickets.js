import { useLocalStorage } from "@vueuse/core";
import { ref, computed } from "vue";

// Reactive reference to store ticket data based on ticket IDs
const id2ticket = useLocalStorage("id2ticket", {});

//Part 7
const ticketListComplete = ref(false);

// Reactive reference to indicate whether the ticket list data is ready

// Computed property to get all tickets
export const allTickets = computed(() => {
  console.log("ticketListComplete.value : ", ticketListComplete.value);

  // If the ticket list data is ready, return all tickets as an array
  if (ticketListComplete.value) {
    // console.log('test')
    return Object.values(id2ticket.value);
  }

  // If the ticket list data is not ready, fetch it from the API
  fetch("/api/ticket")
    .then((response) => response.json())
    .then((ticketlist) => {
      // Populate the id2ticket reference with fetched ticket data
      for (const ticket of ticketlist) {
        id2ticket.value[ticket.id] = ticket;
      }
      // Set ticketListComplete to true to indicate that the data is ready
      ticketListComplete.value = true;
    });

  // Return null while waiting for the data to be fetched
  return [];
});

// Function to asynchronously fetch ticket data by ticket ID
export async function asyncTicket(ticketid) {
  // If ticket data already exists in the reference, return it
  if (id2ticket.value[ticketid]) {
    console.log('le ticket est dans id2ticket')
    return id2ticket.value[ticketid];
  } else {
    console.log('le ticket PAS dans id2ticket')
    // Otherwise, fetch the ticket data from the API
    const response = await fetch(`/api/ticket/${ticketid}`);
    const ticket = await response.json();
    // Store the fetched ticket data in the reference for future use
    id2ticket.value[ticket.id] = ticket;
  } 
  return id2ticket.value[ticketid];
}

export async function addTicket(formData) {
  console.log("addTicket");
  // Send a POST request to the API to create a new ticket
  const response = await fetch("/api/ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData.value),
  });

  // Parse the response to get the created ticket data
  const createdTicket = await response.json();
  console.log("ticket", createdTicket);
  // Store the created ticket data in the id2ticket reference for future use
  id2ticket.value[createdTicket.id] = createdTicket;

  // Return the created ticket data
  return createdTicket;
}

export const ticketOfId = computed(() => (id) => {
  const ticket = id2ticket.value[id];
  if (ticket) return ticket;
  fetch(`/api/ticket/${id}`)
    .then((response) => response.json())
    .then((ticket) => {
      id2ticket.value[ticket.id] = ticket;
    });
});

// fonction de triage
export const allSortedTicket = computed(() => {
  return allTickets.value.sort((ticket1, ticket2) => {
    //voir la
    //return new Date (ticket1.created_at) - new Date (ticket2.created_at)
    if (ticket1.created_at < ticket2.created_at) return -1;
    if (ticket1.created_at > ticket2.created_at) return 1;
    return 0;
  });
});

export const deleteDb = async () => {
  const response = await fetch("/api/deleteDB", {
    method: "DELETE", // Spécifiez la méthode DELETE
  });

  if (response.status === 200) {
    console.log("DBéffacée");
    // Effacer localStorage
    localStorage.removeItem("id2ticket");
  } else {
    console.error("Effacement abordé"); // Afficher un message d'erreur
  }
};

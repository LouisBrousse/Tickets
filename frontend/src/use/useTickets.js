import { useLocalStorage } from "@vueuse/core";
import { ref, computed } from "vue";

// Référence réactive pour stocker les données des tickets en fonction de leurs IDs
const id2ticket = useLocalStorage("id2ticket", {});

// Indication réactive pour savoir si les données de la liste des tickets sont prêtes
const ticketListComplete = ref(false);

// Propriété calculée pour obtenir tous les tickets
export const allTickets = computed(() => {
  // Si les données de la liste des tickets sont prêtes, retourner tous les tickets sous forme de tableau
  if (ticketListComplete.value) {
    return Object.values(id2ticket.value);
  }

  // Si les données de la liste des tickets ne sont pas prêtes, les récupérer depuis l'API
  fetch("/api/ticket")
    .then((response) => response.json())
    .then((ticketlist) => {
      // Remplir la référence id2ticket avec les données des tickets récupérées
      for (const ticket of ticketlist) {
        id2ticket.value[ticket.id] = ticket;
      }
      // Définir ticketListComplete à true pour indiquer que les données sont prêtes
      ticketListComplete.value = true;
    });

  // Retourner null en attendant que les données soient récupérées
  return [];
});

// Fonction pour récupérer de manière asynchrone les données d'un ticket en fonction de son ID
export async function asyncTicket(ticketid) {
  // Si les données du ticket existent déjà dans la référence, les retourner
  if (id2ticket.value[ticketid]) {
    return id2ticket.value[ticketid];
  } else {
    // Sinon, récupérer les données du ticket depuis l'API
    const response = await fetch(`/api/ticket/${ticketid}`);
    const ticket = await response.json();
    // Stocker les données du ticket récupérées dans la référence pour une utilisation future
    id2ticket.value[ticket.id] = ticket;
  }
  return id2ticket.value[ticketid];
}

// Fonction pour ajouter un nouveau ticket
export async function addTicket(formData) {
  // Envoyer une requête POST à l'API pour créer un nouveau ticket
  const response = await fetch("/api/ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData.value),
  });

  // Parser la réponse pour obtenir les données du ticket créé
  const createdTicket = await response.json();
  // Stocker les données du ticket créé dans la référence id2ticket pour une utilisation future
  id2ticket.value[createdTicket.id] = createdTicket;

  // Retourner les données du ticket créé
  return createdTicket;
}

// Propriété calculée pour obtenir un ticket en fonction de son ID
export const ticketOfId = computed(() => (id) => {
  const ticket = id2ticket.value[id];
  if (ticket) return ticket;
  // Si le ticket n'est pas dans la référence, le récupérer depuis l'API
  fetch(`/api/ticket/${id}`)
    .then((response) => response.json())
    .then((ticket) => {
      id2ticket.value[ticket.id] = ticket;
    });
});

// Propriété calculée pour obtenir tous les tickets triés par date de création
export const allSortedTicket = computed(() => {
  return allTickets.value.sort((ticket1, ticket2) => {
    if (ticket1.created_at < ticket2.created_at) return -1;
    if (ticket1.created_at > ticket2.created_at) return 1;
    return 0;
  });
});

// Fonction pour effacer la base de données des tickets
export const deleteDb = async () => {
  const response = await fetch("/api/deleteDB", {
    method: "DELETE",
  });

  if (response.status === 200) {
    // Effacer le localStorage
    localStorage.removeItem("id2ticket");
  } else {
    console.error("Effacement annulé");
  }
};

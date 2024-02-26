import { prisma } from "./prisma/prisma.singleton.js";

// Fonction pour obtenir la liste des tickets
export async function getTicketsList(req, res) {
    try {
        const userPermissions = req.user.permissions;

        // Vérification des permissions de l'utilisateur
        if (userPermissions["read-list"] === "all") {
            // Si l'utilisateur a la permission de lire tous les tickets
            const tickets = await prisma.ticket.findMany();
            res.json(tickets);
        } else if (userPermissions["read-list"] === req.user.user) {
            // Si l'utilisateur a la permission de lire ses propres tickets seulement
            const tickets = await prisma.ticket.findMany({
                where: {
                    email: req.user.user,
                }, 
            });
            res.json(tickets); 
        } else {
            // Si l'utilisateur n'a pas les permissions nécessaires
            res.status(403).json({
                status: "error",
                message: "Forbidden: Insufficient permissions",
                permissions: userPermissions,
            });
        }
    } catch (error) {
        // En cas d'erreur lors de la récupération des tickets
        console.error("Erreur lors de la récupération des tickets:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}
  
// Fonction pour obtenir un ticket spécifique
export async function getTicket(req, res) {

    console.log("dans la fonction get ticket")

    const userPermissions = req.user.permissions;
     // Vérification des permissions de l'utilisateur pour lire un ticket spécifique
    if (userPermissions["read-ticket"] === "all") {
        // Si l'utilisateur a la permission de lire tous les tickets
        const objectId = parseInt(req.params.id); 

        const ticket = await prisma.ticket.findUnique({
            where: { id: objectId },
        });
        res.json(ticket);
    } else if (userPermissions["read-ticket"] === req.user.user) { 
        // Si l'utilisateur est autorisé à lire le ticketimport { prisma } from "./prisma/prisma.singleton.js";

// Fonction pour obtenir une liste de tickets en fonction des autorisations de l'utilisateur
export async function getTicketsList(req, res) {
    try {
        const userPermissions = req.user.permissions;

        // Vérifie les autorisations de l'utilisateur pour déterminer quels tickets récupérer
        if (userPermissions["read-list"] === "all") {
            // Récupère tous les tickets si l'utilisateur a la permission de tout lire
            const tickets = await prisma.ticket.findMany();
            res.json(tickets);
        } else if (userPermissions["read-list"] === req.user.user) {
            // Récupère les tickets appartenant à l'utilisateur connecté
            const tickets = await prisma.ticket.findMany({
                where: {
                    email: req.user.user,
                }, 
            });
            res.json(tickets); 
        } else {
            // Renvoie une erreur si l'utilisateur n'a pas les permissions suffisantes
            res.status(403).json({
                status: "error",
                message: "Interdit : Permissions insuffisantes",
                permissions: userPermissions,
            });
        }
    } catch (error) {
        // Gère les erreurs qui se produisent lors de la récupération des tickets
        console.error("Erreur lors de la récupération des tickets :", error);
        res.status(500).json({ status: "error", message: "Erreur interne du serveur" });
    }
}
  
// Fonction pour obtenir les détails d'un ticket spécifique
export async function getTicket(req, res) {
    const userPermissions = req.user.permissions;
    if (userPermissions["read-ticket"] === "all") {
        // Récupère le ticket si l'utilisateur a la permission de tout lire
        const objectId = parseInt(req.params.id); 
        const ticket = await prisma.ticket.findUnique({
            where: { id: objectId },
        });
        res.json(ticket);
    } else if (userPermissions["read-ticket"] === req.user.user) { 
        // Récupère le ticket si l'utilisateur a la permission de lire ses propres tickets
        const objectId = parseInt(req.params.id); 
        const ticket = await prisma.ticket.findUnique({
            where: { id: objectId },
        });
        res.json(ticket);
    } else {
        // Renvoie une erreur si l'utilisateur n'a pas les permissions suffisantes
        res.status(403).json({
            status: "error",
            message: "Interdit : Permissions insuffisantes",
        });
    } 
}

// Fonction pour créer un nouveau ticket
export async function createTicket(req, res) {
    const userPermissions = req.user.permissions;
    const requiredPermission = userPermissions.isAdmin ? "all" : "none";

    // Vérifie les autorisations de l'utilisateur pour déterminer s'il peut créer un ticket
    if (userPermissions["write-ticket"] === requiredPermission) {
        let data = req.body;
        // Crée le nouveau ticket
        const newTicket = await prisma.ticket.create({
            data: data,
        });
        res.send(newTicket);
    } else {
        // Renvoie une erreur si l'utilisateur n'a pas les permissions suffisantes
        res.status(403).json({
            status: "error",
            message: "Interdit : Permissions insuffisantes",
        });
    }
}

        const objectId = parseInt(req.params.id); 

        const ticket = await prisma.ticket.findUnique({
            where: { id: objectId },
        });
        res.json(ticket);
    } else {
        // Si l'utilisateur n'a pas les permissions nécessaires
        res.status(403).json({
            status: "error",
            message: "Forbidden: Insufficient permissions",
        });
    } 
}

// Fonction pour créer un nouveau ticket
export async function createTicket(req, res) {
    const userPermissions = req.user.permissions;
    const requiredPermission = userPermissions.isAdmin ? "all" : "none";

    // Vérification des autorisations pour créer un nouveau ticket
    if (userPermissions["write-ticket"] === requiredPermission) {
        // Si l'utilisateur a la permission d'écrire un nouveau ticket
        let data = req.body;
        const newTicket = await prisma.ticket.create({
            data: data,
        });
        res.send(newTicket);
    } else {
        // Si l'utilisateur n'a pas les permissions nécessaires
        res.status(403).json({
            status: "error",
            message: "Forbidden: Insufficient permissions",
        });
    }
}

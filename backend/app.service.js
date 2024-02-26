import { prisma } from "./prisma/prisma.singleton.js"

export async function getTicketsList(req, res) {
    try {
        const userPermissions = req.user.permissions;
        console.log("user de api/ticket", req.user.user);

        if (userPermissions["read-list"] === "all") {
            const tickets = await prisma.ticket.findMany();
            res.json(tickets);
        } else if (userPermissions["read-list"] === req.user.user) {
            const tickets = await prisma.ticket.findMany({
                where: {
                    email: req.user.user,
                },
            });
            res.json(tickets);
        } else {
            res.status(403).json({
                status: "error",
                message: "Forbidden: Insufficient permissions",
                permissions: userPermissions,
            });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des tickets:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}

export async function getTicket(req, res) {
    const userPermissions = req.user.permissions;

    const requiredPermission = userPermissions.isAdmin ? "all" : "(email)";

    if (userPermissions["read-ticket"] === requiredPermission) {
        // Autorisé, procéder avec la logique de la route
        console.log("authorisé à lire le ticket");
        const objetId = parseInt(req.params.id);

        const ticket = await prisma.ticket.findUnique({
            where: { id: objetId },
        });
        res.json(ticket);
    } else {
        // Non autorisé
        res.status(403).json({
            status: "error",
            message: "Forbidden: Insufficient permissions",
        });
    }
}

export async function createTicket(req, res) {
    const userPermissions = req.user.permissions;
    const requiredPermission = userPermissions.isAdmin ? "all" : "none";

    // Vérifier les autorisations
    if (userPermissions["write-ticket"] === requiredPermission) {
        // Autorisé, procéder avec la logique de la route
        let datas = req.body;
        // console.log("data récupérée");
        const newTicket = await prisma.ticket.create({
            data: datas,
        });
        res.send(newTicket);
        // console.log("ticket envoyé");
    } else {
        // Non autorisé
        res.status(403).json({
            status: "error",
            message: "Forbidden: Insufficient permissions",
        });
    }
}

import { prisma } from "./prisma/prisma.singleton.js";

// Fonction pour effacer la base de données de tickets
export async function deleteDb(req, res) {
    const userPermissions = req.user.permissions;
    const requiredPermission = userPermissions.isAdmin ? "all" : "none";

    // Vérification des autorisations pour effacer la base de données
    if (userPermissions["write-ticket"] === requiredPermission) {
        // Si l'utilisateur a la permission d'effacer la base de données
        const deleteTickets = await prisma.ticket.deleteMany({});
        res.json({ status: "success", message: "Base de données effacée" });
    } else {
        // Si l'utilisateur n'a pas les permissions nécessaires
        res.status(403).json({
            status: "error",
            message: "Forbidden: Insufficient permissions",
        });
    }
}

// Fonction pour effacer un utilisateur
export async function deleteUser(req, res) {
    const userEmail = req.body.email;
    try {
        // Recherche de l'utilisateur dans la base de données
        const isUser = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        });

        if (isUser) {
            // Si l'utilisateur existe, procéder à la suppression
            const deleteUser = await prisma.user.delete({
                where: {
                    email: isUser.email,
                },
            });
            res.json({ status: "success", message: "Utilisateur effacé" });
        } else {
            // Si l'utilisateur n'existe pas
            res.status(404).json({ status: "error", message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        // En cas d'erreur lors de la suppression de l'utilisateur
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        res.status(500).json({
            status: "error",
            message: "Erreur lors de la suppression de l'utilisateur",
        });
    }
}

import { prisma } from "./prisma/prisma.singleton.js"

export async function deleteDb(req, res) {
    const userPermissions = req.user.permissions;
    console.log("deleting");
    const requiredPermission = userPermissions.isAdmin ? "all" : "none";

    // Vérifier les autorisations
    if (userPermissions["write-ticket"] === requiredPermission) {
        // Autorisé, procéder avec la logique de la route
        const deletetickets = await prisma.ticket.deleteMany({});
        res.json({ status: "success", message: "DB effacée" });
    } else {
        // Non autorisé
        res.status(403).json({
            status: "error",
            message: "Forbidden: Insufficient permissions",
        });
    }
}

export async function deleteUser(req, res) {
    const userEmail = req.body.email;
    try {
        const isUser = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        });
        if (isUser) {
            const deleteUser = await prisma.user.delete({
                where: {
                    email: isUser.email,
                },
            });
            res.json({ status: "success", message: "User effacée" });
        } else {
            res
                .status(404)
                .json({ status: "error", message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        console.log("erreur : ", error);
        res.status(500).json({
            status: "error",
            message: "Erreur lors de la suppression de l'utilisateur",
        });
    }
}
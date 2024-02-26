import { prisma } from "./prisma/prisma.singleton.js";

// Fonction pour effacer la base de données de tickets

export async function deleteDb(req, res) {
  // Récupération des permissions de l'utilisateur depuis la requête
  const userPermissions = req.user.permissions;
  // Détermination de la permission requise en fonction du statut d'administrateur de l'utilisateur
  const requiredPermission = userPermissions.isAdmin ? "all" : "none";

  try {
    // Vérification des autorisations pour effacer la base de données
    if (userPermissions["write-ticket"] === requiredPermission) {
      // Effacement de tous les tickets dans la base de données
      const deleteTickets = await prisma.ticket.deleteMany({});
      // Réponse indiquant que la base de données a été effacée avec succès
      res.json({ status: "success", message: "Base de données effacée" });
    } else {
      // Si l'utilisateur n'a pas les permissions nécessaires
      res.status(403).json({
        status: "error",
        message: "Forbidden: Insufficient permissions",
      });
    }
  } catch (error) {
    // Gestion des erreurs lors de l'effacement de la base de données
    console.error("Error deleting database:", error);
    // Réponse d'erreur interne du serveur en cas d'erreur
    res.status(500).json({
      status: "error",
      message: "Internal server error while deleting database",
    });
  }
}

// Fonction pour effacer un utilisateur

export async function deleteUser(req, res) {
  // Récupération de l'email de l'utilisateur à supprimer depuis le corps de la requête
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
      // Réponse indiquant que l'utilisateur a été supprimé avec succès
      res.json({ status: "success", message: "Utilisateur effacé" });
    } else {
      // Si l'utilisateur n'existe pas
      res
        .status(404)
        .json({ status: "error", message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    // Gestion des erreurs lors de la suppression de l'utilisateur
    console.error("Error deleting user:", error);
    // Réponse d'erreur interne du serveur en cas d'erreur
    res.status(500).json({
      status: "error",
      message: "Internal server error while deleting user",
    });
  }
}

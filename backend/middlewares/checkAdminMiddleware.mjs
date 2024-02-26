// Middleware pour vérifier si l'utilisateur est un administrateur
export function checkAdminMiddleware(req, res, next) {
    // Vérification si l'utilisateur est administrateur
    if (!req.user.isAdmin) {
        // Si l'utilisateur n'est pas administrateur, renvoyer une erreur d'autorisation
        return res.status(403).json({ status: "error", message: "Unauthorized: must be admin" });
    }
    
    next(); // Si l'utilisateur est administrateur, passer au middleware suivant
}

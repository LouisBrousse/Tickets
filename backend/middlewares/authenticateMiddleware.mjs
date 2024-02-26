import jwt from "jsonwebtoken";
import { res401 } from "../res401.js";
import { prisma } from "../prisma/prisma.singleton.js";


export async function authenticateMiddleware(req, res, next) {
    // Récupération du jeton d'accès depuis les cookies de la requête
    const token = req.cookies.access_token;

    try {
        // Vérification de la présence du jeton d'accès
        if (!token) {
            throw new Error("Unauthorized: Missing access token");
        }

        // Récupération de la clé de signature depuis les variables d'environnement
        const key = process.env.SIGNING_KEY;
        if (!key) {
            throw new Error("No signing key defined");
        }

        // Vérification et décryptage du jeton d'accès
        const decoded = jwt.verify(token, key);

        // Vérification de la date d'expiration du jeton d'accès
        if (Date.now() > decoded.expire) {
            throw new Error("Unauthorized: Token expired");
        }

        // Vérification de l'utilisateur associé au jeton d'accès
        const dbUser = await prisma.user.findUnique({
            where: {
                email: decoded.user,
            },
        });

        if (!dbUser) {
            throw new Error("Unauthorized: Unknown user");
        }

        // Création du payload contenant les informations de l'utilisateur
        const payload = {
            user: dbUser.email,
            isAdmin: dbUser.isAdmin,
            permissions: {
                "read-list": dbUser.isAdmin ? "all" : dbUser.email,
                "read-ticket": dbUser.isAdmin ? "all" : dbUser.email,
                "write-ticket": dbUser.isAdmin ? "all" : "none",
            },
        };

        // Stockage des informations de l'utilisateur dans la requête pour une utilisation ultérieure
        req.user = payload;

        // Appel à la fonction next() pour passer au middleware suivant
        next();
    } catch (error) {
        // Gestion des erreurs de vérification du token
        console.error("Token verification error:", error);
        // Renvoi d'une réponse d'erreur 401 avec le message approprié
        return res401(res, error.message);
    }
}

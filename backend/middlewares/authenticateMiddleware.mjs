import jwt from "jsonwebtoken";
import { res401 } from "../res401.js";
import { prisma } from "../prisma/prisma.singleton.js";

// Middleware d'authentification
export async function authenticateMiddleware(req, res, next) {
    const token = req.cookies.access_token; // Récupération du jeton d'accès depuis les cookies de la requête

    try {
        if (!token) {
            // Si aucun jeton d'accès n'est fourni dans les cookies, renvoyer une erreur d'authentification
            throw new Error("Unauthorized: Missing access token");
        }

        const key = process.env.SIGNING_KEY;
        if (!key) {
            // Vérifiez si la clé de signature est définie dans les variables d'environnement
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
        // console.log('payload :',payload)
        // Stockage des informations de l'utilisateur dans la requête pour une utilisation ultérieure
        req.user = payload;  

        next(); // Appel à la fonction next() pour passer au middleware suivant
    } catch (error) { 
        console.error("Erreur de vérification du token:", error);
        return res401(res, error.message);
    } 
}  
 
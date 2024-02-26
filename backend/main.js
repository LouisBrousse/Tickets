import express from "express";
import cookieParser from "cookie-parser";
import { initAppController } from "./app.controller.js";
import { initAdminController } from "./admin.controller.js";
import { initPublicController } from "./public.controller.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Utilisation du middleware pour parser les cookies
app.use(cookieParser());

// Utilisation du middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Initialisation des contrôleurs pour les routes publiques, de l'application et d'administration
initPublicController(app);
initAppController(app);
initAdminController(app);

// Démarrage du serveur sur le port 3006
app.listen(3006, () => {
  console.log("Server is running on port 3006");
});

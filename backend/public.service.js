import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma/prisma.singleton.js";
import { res401 } from "./res401.js";

// Fonction pour gérer l'authentification d'un utilisateur
export async function signin(req, res) {
  let userLogin = req.body;

  // Vérification de l'utilisateur dans la base de données
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userLogin.email,
    },
  });

  if (existingUser) {
    // Vérification du mot de passe si l'utilisateur existe
    const isPasswordMatch = await bcrypt.compare(
      userLogin.password,
      existingUser.password
    );

    if (isPasswordMatch) {
      // Création d'un jeton JWT en cas de correspondance de mot de passe
      const payload = {
        user: existingUser.email,
        expire: Date.now() + 86400, // 1 jour
      };
      const secretKey = process.env.SIGNING_KEY;
      if (!secretKey) {
        return res
          .status(500)
          .json({
            status: "error",
            message: "Aucune clé de signature définie",
          });
      }

      const token = jwt.sign(payload, secretKey);

      // Configuration des cookies et envoi de la réponse
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
      res.cookie("logged", true);
      res.cookie("isAdmin", existingUser.isAdmin);
      res.json({
        status: "success",
        message: `Connexion réussie, bienvenue ${existingUser.email}`,
        user: existingUser.email,
      });
    } else {
      // En cas de mot de passe incorrect
      res401(res, "Mot de passe incorrect");
    }
  } else {
    // En cas d'utilisateur inexistant
    res401(res, "L'utilisateur n'existe pas!");
  }
}

// Fonction pour enregistrer un nouvel utilisateur
export async function register(req, res) {
  const userParams = req.body;

  // Vérification si l'utilisateur existe déjà
  const isUser = await prisma.user.findUnique({
    where: {
      email: userParams.email,
    },
  });

  if (!isUser) {
    try {
      // Hachage du mot de passe avant de l'enregistrer dans la base de données
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userParams.password, saltRounds);

      // Création du nouvel utilisateur dans la base de données
      const newUser = await prisma.user.create({
        data: {
          email: userParams.email,
          password: hashedPassword,
          isAdmin: userParams.isAdmin,
        },
      });

      // Réponse indiquant que l'utilisateur a été enregistré avec succès
      res.json({
        status: "success",
        message: `Utilisateur enregistré avec succès : ${newUser.email}`,
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      res.status(500).json({
        status: "error",
        message:
          "Une erreur est survenue lors de la création de l'utilisateur.",
      });
    }
  } else {
    // En cas d'utilisateur déjà existant
    res.status(409).json({
      status: "error",
      message: "Utilisateur déjà enregistré.",
    });
  }
}

// Fonction pour gérer la déconnexion de l'utilisateur
export async function logout(req, res) {
  res.clearCookie("access_token");

  // Réponse indiquant que le logout a été effectué avec succès
  res.json({ status: "success", message: "Déconnexion réussie" });
}

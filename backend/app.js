import express from "express";
import { PrismaClient, Status } from "@prisma/client";
import cookieParser from "cookie-parser";
import bearerToken from "express-bearer-token";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateMiddleware } from "./authenticateMiddleware.mjs";

const app = express();
const prisma = new PrismaClient();

app.use(cookieParser());

app.use(
  bearerToken({
    cookie: {
      signed: false,
    },
  })
);

app.use(express.json());

app.post("/api/signin", async (req, res) => {
  let userLogin = req.body;
  // console.log("login :", userLogin);

  //vérif user
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userLogin.email,
    },
  });

  // console.log("existingUser", existingUser);
  // console.log("login", userLogin.password, "list", existingUser.password);

  if (existingUser) {
    //Si User, vérif du mdp
    const isPasswordMatch = await bcrypt.compare(
      userLogin.password,
      existingUser.password
    );

    // console.log("password COMPARED", isPasswordMatch);

    if (isPasswordMatch) {
      //vérif si admin
      if (existingUser.isAdmin) {
        const payload = {
          user: existingUser.email,
          permissions: {
            isAdmin: true,
            "read-list": "all",
            "read-ticket": "all",
            "write-ticket": "all",
          },
        };
        const secretKey = "eureka";
        const token = jwt.sign(payload, secretKey);
        res.cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
        }); //en prod mettre secure et samesite sur true.
        res.cookie("logged", true)
      } else {
        //Token user
        const payload = {
          user: existingUser.email,
          permissions: {
            isAdmin: false,
            "read-list": `${existingUser.email}`,
            "read-ticket": `${existingUser.email}`,
            "write-ticket": "none",
          },
          
        };
        console.log('payload', payload)
        const secretKey = "eureka";
        const token = jwt.sign(payload, secretKey);
        res.cookie("access_token", token, {
          httpOnly: false,
          secure: false,
          sameSite: "lax",
        });

        res.cookie("logged", true) 
        //créer un cookie logged (booléen)
      }
      //Envoi de la reponse
      res.json({
        status: "success",
        message: `Login successful, bienvenue ${existingUser.email}`,
        user: existingUser.email,
      });
    } else {
      //Mot de passe inconu
      res.status(401).json({ status: "error", message: "Incorrect password" });
    }
  } else {
    //Utilisateur inconu
    res.status(401).json({
      status: "error",
      message: "L'utilisateur n'existe pas!",
    });
    console.log("L'utilisateur n'existe pas!");
  }
});

app.post("/api/register", async (req, res) => {
  const userParams = req.body;
  console.log("userParams : ", userParams);

  //vérifier si le user n'existe pas déjà.
  const isUser = await prisma.user.findUnique({
    where: {
      email: userParams.email,
    },
  });

  console.log('is user :', isUser)

  if (!isUser) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userParams.password, saltRounds);


      const newUser = await prisma.user.create({
        data: {
          email: userParams.email,
          password: hashedPassword, // Stocker le mot de passe haché
          isAdmin: userParams.isAdmin, // Vous devez vérifier comment vous récupérez isAdmin
        },
      });

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
    res.status(409).json({
      status: "error",
      message: "Utilisateur déjà enregistré.",
    });
  }
});

app.use(authenticateMiddleware);

app.get("/api/ticket", async (req, res) => {
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
});

app.get("/api/ticket/:id", async (req, res) => {
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
});

app.post("/api/ticket", async (req, res) => {
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
});

app.delete("/api/deleteDB", async (req, res) => {
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
});

app.delete("/api/deleteUser", async (req, res) => {
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
});

app.get("/api/randomuser", async (req, res) => {
  try {
    // Récupérer tous les utilisateurs de la base de données
    const allUsers = await prisma.user.findMany();

    // Vérifier s'il y a des utilisateurs
    if (allUsers.length === 0) {
      return res.status(404).send("Aucun utilisateur trouvé.");
    }

    // Choisir un utilisateur au hasard
    const randomIndex = Math.floor(Math.random() * allUsers.length);
    const randomUser = allUsers[randomIndex];

    // Renvoyer l'e-mail de l'utilisateur au hasard
    res.json({ email: randomUser.email });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération d'un utilisateur au hasard :",
      error
    );
    res
      .status(500)
      .send(
        "Une erreur est survenue lors de la récupération de l'utilisateur au hasard."
      );
  }
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
});

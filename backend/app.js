import express from "express";
import { PrismaClient, Status } from "@prisma/client";
import cookieParser from "cookie-parser";
import bearerToken from "express-bearer-token";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateMiddleware } from "./authenticateMiddleware.mjs";
import { users } from "./userList.js";

const app = express();
const prisma = new PrismaClient();
let userList = users
// console.log('userList', userList)

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
  let userlogin = req.body;
  console.log('login :', userlogin)
  
  //vérif user
  const existingUser = userList.find((user) => user.email === userlogin.email);
  
  console.log('login', userlogin.password, 'list', existingUser.password)

  if (existingUser) {
    //Si User, vérif du mdp
    const isPasswordMatch = await bcrypt.compare(
      userlogin.password,
      existingUser.password
    );

    console.log('password COMPARED', isPasswordMatch)

    if (isPasswordMatch) {
      
      //vérif si admin
      if (existingUser.admin) {
        console.log('password match')
        //Token admin
        const payload = {
          permissions: {
            isAdmin: true,
            "read-list": "all",
            "read-ticket": "all",
            "write-ticket": "all",
          },
        };
        const secretKey = "adopi";
        const token = jwt.sign(payload, secretKey);
        res.cookie("access_token", token);
      } else {
        //Token user
        const payload = {
          permissions: {
            isAdmin: false,
            "read-list": `${existingUser.email}`,
            "read-ticket": `${existingUser.email}`,
            "write-ticket": "none",
          },
        };
        const secretKey = "adopi";
        const token = jwt.sign(payload, secretKey);
        res.cookie("access_token", token);
      }
      //Envoi de la reponse
      res.json({
        status: "success",
        message: `Login successful, bienvenue ${existingUser.email}`,
      });
    } else {
      //Mot de passe inconu
      res.status(401).json({ status: "error", message: "Incorrect password" });
    }
  } else {
    //Utilisateur inconu
    console.log("L'utilisateur n'existe pas dans la liste.");
  }
});

app.use(authenticateMiddleware);

// let userList = [
//   {
//     email: "admin@mail.fr",
//     admin: true,
//     password: "$2y$10$dtuvufWMwyIl8IYxKWgB7OQLAGXgO8mstZXAWRQ98rmF//8L5urNG",
//   },
//   {
//     email: "jc@mail.fr",
//     admin: false,
//     password: "$2y$10$dtuvufWMwyIl8IYxKWgB7OQLAGXgO8mstZXAWRQ98rmF//8L5urNG",
//   },
//   {
//     email: "brousselouis@hotmail.com",
//     admin: false,
//     password: "$2y$10$dtuvufWMwyIl8IYxKWgB7OQLAGXgO8mstZXAWRQ98rmF//8L5urNG",
//   },
// ];

app.get("/api/ticket", async (req, res) => {
    try {
      const userPermissions = req.user.permissions;
      const requiredPermission = userPermissions.isAdmin ? "all" : "(email)";
  
      if (userPermissions["read-list"] === requiredPermission) {
        const tickets = await prisma.ticket.findMany();
        res.json(tickets);
      } else {
        res.status(403).json({
          status: "error",
          message: "Forbidden: Insufficient permissions",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des tickets:', error);
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
    res
      .status(403)
      .json({
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
    console.log('data récupérée')
    const newTicket = await prisma.ticket.create({
      data: datas,
    });
    res.send(newTicket);
    console.log("ticket envoyé");
  } else {
    // Non autorisé
    res
      .status(403)
      .json({
        status: "error",
        message: "Forbidden: Insufficient permissions",
      });
  }
}); 
 
app.delete("/api/ticketsup", async (req, res) => {

  const userPermissions = req.user.permissions;
    console.log('deleting')
  const requiredPermission = userPermissions.isAdmin ? "all" : "none";

  // Vérifier les autorisations 
  if (userPermissions["write-ticket"] === requiredPermission) {
    // Autorisé, procéder avec la logique de la route
    const deletetickets = await prisma.ticket.deleteMany({});
    res.json("DB éffacée");
 
} else {
    // Non autorisé
    res
      .status(403)
      .json({
        status: "error",
        message: "Forbidden: Insufficient permissions",
      });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


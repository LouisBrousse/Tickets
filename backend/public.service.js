import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma/prisma.singleton.js"

export async function signin(req, res) {
    let userLogin = req.body;
    // console.log("login :", userLogin);

    //vérif user
    const existingUser = await prisma.user.findUnique({
        where: {
            email: userLogin.email,
        },
    })

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
}

export async function register(req, res) {
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
}
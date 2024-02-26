import jwt from "jsonwebtoken";


export async function authenticateMiddleware(req, res, next) {
    // console.log('authentification')
    const token = req.cookies.access_token;
    // console.log('token authmiddle', token)

    if (!token) {
        // console.log("pas de token");
        return res
            .status(401)
            .json({ status: "error", message: "Unauthorized: Missing access token" });

        // return res.redirect("/api/signin");
    }

    try {
        const key = process.env.SIGNING_KEY
        if (!key) {
            return res
            .status(500)
            .json({ status: "error", message: "No signing key defined" }); 
        }
        const decoded = jwt.verify(token, key);
        // console.log("decoded: ", decoded);

        // vérif date d'expiration
        if (Date.now() > decoded.expire) {
            return res
                .status(401)
                .json({ status: "error", message: "Unauthorized: token expired" }); 
        }

        //vérif user
        const dbUser = await prisma.user.findUnique({
            where: {
                email: decoded.user
            },
        })
        if (!dbUser) {
            return res
                .status(401)
                .json({ status: "error", message: "Unauthorized: Unknwon user" });
        }
        const payload = {
            user: dbUser.email,
            isAdmin: dbUser.isAdmin,
            permissions: {
                "read-list": dbUser.isAdmin ? "all" : `${dbUser.email}`,
                "read-ticket": dbUser.isAdmin ? "all" : `${dbUser.email}`,
                "write-ticket": dbUser.isAdmin ? "all" : "none",
            }
        };

        req.user = payload;
        console.log("decoded token", req.user);

        next();
    } catch (error) {
        console.error("Erreur de vérification du token:", error);
        //effacer le cookie
        // Effacer le cookie d'accès
        document.cookie =
            "access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
        "logged=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";

        return next({ status: 401, message: "Unauthorized: Invalid access token" });
    }
}
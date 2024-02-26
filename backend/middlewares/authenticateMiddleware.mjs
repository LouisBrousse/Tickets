import jwt from "jsonwebtoken";

export function authenticateMiddleware(req, res, next) {
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
    const decoded = jwt.verify(token, "eureka");
    // console.log("decoded: ", decoded);

    req.user = decoded;
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
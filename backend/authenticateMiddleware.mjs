import jwt from "jsonwebtoken";

export function authenticateMiddleware(req, res, next) {
  // console.log('authentification')
  const token = req.cookies.access_token;
  // console.log('token authmiddle', token)

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized: Missing access token" });
    // console.log('pas de token')
    // return res.redirect("/api/signin");
  }

  try {
    const decoded = jwt.verify(token, "eureka");
    // console.log("decoded: ", decoded);
    req.user = decoded;
    // console.log("decoded token", req.user);
    next();
  } catch (error) {
    console.error("Erreur de vérification du token:", error);
    // return res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid access token' });
    return next({ status: 401, message: "Unauthorized: Invalid access token" });
  }
}

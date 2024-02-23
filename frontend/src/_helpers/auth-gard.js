
export function authGuard() {

  let token = document.cookie;

  if (token) {
    return true; // Utilisateur a été authentifié
  } else {
    // console.log("authGard no token");
    return false; // Utilisateur non authentifié
  }
}

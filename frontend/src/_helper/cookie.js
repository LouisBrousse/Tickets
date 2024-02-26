export function getLoggedCookie() {
  let token = document.cookie;
  console.log("token", token);

  // Séparer les cookies en tableau en utilisant le séparateur ;
  let cookieArray = token.split(";");

  // Initialiser la variable pour stocker la valeur du cookie logged
  let logged = false;

  // Parcourir le tableau des cookies
  cookieArray.forEach((cookie) => {
    // Diviser le nom et la valeur du cookie en utilisant le séparateur =
    let [name, value] = cookie.trim().split("=");

    // Si le nom du cookie est "logged" et sa valeur est "true", mettre logged à true
    if (name === "logged" && value === "true") {
      logged = true;
    }
  });

  // Retourner la valeur du cookie logged
  return logged;
}

export function getIsAdminCookie() {
  let token = document.cookie;
  console.log("token", token);

  // Séparer les cookies en tableau en utilisant le séparateur ;
  let cookieArray = token.split(";");

  // Initialiser la variable pour stocker la valeur du cookie isAdmin
  let isAdmin = false;

  // Parcourir le tableau des cookies
  cookieArray.forEach((cookie) => {
    // Diviser le nom et la valeur du cookie en utilisant le séparateur =
    let [name, value] = cookie.trim().split("=");

    // Si le nom du cookie est "isAdmin" et sa valeur est "true", mettre isAdmin à true
    if (name === "isAdmin" && value === "true") {
      isAdmin = true;
    }
  });

  // Retourner la valeur du cookie isAdmin
  return isAdmin;
}


export function authGuard(to, from, next){
    let token = document.cookie

    // console.log('auth guard : ', token);
    
    if (token){
        next(); // Continue la navigation
    } else {
        next('/'); // Redirige vers la page d'accueil si l'utilisateur n'est pas authentifié
    }
}
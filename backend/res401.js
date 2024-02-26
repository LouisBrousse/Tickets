export function res401(res, message) {
    res.status(401).json({ status: 401, message: `${message}` });
  
    // Effacer le cookie d'accès
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('logged', { path: '/' });
    res.clearCookie('isAdmin', { path: '/' });
    
  }
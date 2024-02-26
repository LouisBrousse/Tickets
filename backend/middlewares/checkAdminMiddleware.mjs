export function checkAdminMiddleware(req, res, next) {

    if (!req.user.isAdmin) {
        return res
            .status(403)
            .json({ status: "error", message: "Unauthorized: must be admin" });
    }
    next();
}
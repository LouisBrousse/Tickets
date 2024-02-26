import { deleteDb, deleteUser } from "./admin.service.js";
import { checkAdminMiddleware } from "./middlewares/checkAdminMiddleware.mjs";

export function initAdminController(app) {
    
    app.use(checkAdminMiddleware)

    app.delete("/api/admin/deleteDB", deleteDb);

    app.delete("/api/admin/deleteUser", deleteUser);
}
import { logout, register } from "./public.service.js";
import { signin } from "./public.service.js";

export function initPublicController(app) {

    app.post("/api/signin", signin);
    
    app.post("/api/register", register);

    app.post("/api/logout", logout);
}

import { authenticateMiddleware } from "./middlewares/authenticateMiddleware.mjs";
import { createTicket, getTicket, getTicketsList } from "./app.service.js";

export function initAppController(app) {

    // all public routes must be defined before this middleware
    app.use(authenticateMiddleware);
    
    app.get("/api/ticket", getTicketsList);
    
    app.get("/api/ticket/:id", getTicket);
    
    app.post("/api/ticket", createTicket);
}

import express from "express";
import cookieParser from "cookie-parser";
import { initAppController } from "./app.controller.js";
import { initAdminController } from "./admin.controller.js";
import { initPublicController } from "./public.controller.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(cookieParser());

app.use(express.json());

// authentication middleware is setup in app controller,
// thus it is also applied on the admin controller
initPublicController(app)
initAppController(app)
initAdminController(app)

app.listen(3006, () => {
    console.log("Server is running on port 3006");
});

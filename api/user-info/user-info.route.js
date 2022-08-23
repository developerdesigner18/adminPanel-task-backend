import express from "express";
import { updateAdminPanelUser } from "./user-info.controller.js";
import { checkJWT } from "../../middleware/check-jwt.js";

export const apiRouter = express.Router();

apiRouter.put("/updateAdminPanelUser/:id", checkJWT, updateAdminPanelUser);
// app.use("/auth", authRouter);
//UPDATE

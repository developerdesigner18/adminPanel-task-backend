import express from "express";
import {
  signup,
  signin,
  AddUser,
  // resetPassword
} from "./auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/signin", signin);
authRouter.post("/signup", signup);
authRouter.post("/AddUser", AddUser);
// authRouter.post("/resetpassword", resetPassword);

import express from "express";
import {
  signup,
  signin,
  AddUser,
  getuser,
  getAllUsers
  // resetPassword
} from "./auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/signin", signin);
authRouter.post("/signup", signup);
authRouter.post("/AddUser", AddUser);
authRouter.get("/getuser/:id", getuser);
authRouter.get("/getAllUsers", getAllUsers);
// authRouter.post("/resetpassword", resetPassword);

import express from "express";
import {
  addCategory,
  ShowAllCategory,
  updateCategory,
  deleteCategory,
} from "./category-info.controller.js";

export const categoryRouter = express.Router();

categoryRouter.post("/addCategory", addCategory);
categoryRouter.get("/ShowAllCategory", ShowAllCategory);
categoryRouter.put("/updateCategory/:id", updateCategory);
categoryRouter.delete("/deleteCategory/:id", deleteCategory);

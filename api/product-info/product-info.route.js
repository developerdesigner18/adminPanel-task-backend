import express from "express";
import {
  addProduct,
  ShowAllProduct,
  updateProduct,
  deleteProduct,
} from "./Product-info.controller.js";

export const productRouter = express.Router();

productRouter.post("/addProduct", addProduct);
productRouter.get("/ShowAllProduct", ShowAllProduct);
productRouter.put("/updateProduct/:id", updateProduct);
productRouter.delete("/deleteProduct/:id", deleteProduct);

import mongoose from "mongoose";
// import pkg from 'mongoose';
const { Schema } = mongoose;
const collectionName = "product";
const productInfoSchema = Schema(
  {
    name: String,
    price: String,
    category: String,
    quality: String,
  },
  {
    timestamps: true,
  }
);

export const ProductInfo = mongoose.model(
  "ProductInfo",
  productInfoSchema,
  collectionName
);

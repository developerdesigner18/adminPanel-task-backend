import mongoose from "mongoose";
// import pkg from 'mongoose';
const { Schema } = mongoose;
const collectionName = "category";
const categoryInfoSchema = Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

export const CategoryInfo = mongoose.model(
  "CategoryInfo",
  categoryInfoSchema,
  collectionName
);

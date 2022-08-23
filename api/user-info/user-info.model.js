import mongoose from "mongoose";
// import pkg from 'mongoose';
const { Schema } = mongoose;
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
const collectionName = "users";
const userInfoSchema = Schema(
  {
    fullName: String,
    username: String,
    email: String,
    password: String,
    mobileNo: Number,
    adminRole: {
      type: Boolean,
      default: false,
    },
    token: String,
    country: String,
    state: String,
    city: String,
    theme: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);
userInfoSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userInfoSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userInfoSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  console.log(this._id, "=> checking");
  let payload = {
    userId: this._id,
  };
  console.log(payload, "=> checkingdgfdg");

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

userInfoSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

export const UserInfo = mongoose.model(
  "UserInfo",
  userInfoSchema,
  collectionName
);

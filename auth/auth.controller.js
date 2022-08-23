import { UserInfo } from "../api/user-info/user-info.model.js";
import bcrypt from "bcrypt-nodejs";
import validator from "validator";
import jwt from "jsonwebtoken";

// FOR NON-HEROKU SERVER
// import { appConfig } from "./config/index.js"
// var config = appConfig()

// FOR HEROKU SERVER
var config = {
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  PORT: process.env.PORT,
};

// signUp api
export const signup = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body, "ljlkj");
    const user = await UserInfo.findOne({ email });

    if (user)
      return res.status(401).json({
        message:
          "The email address you have entered is already associated with another account.",
      });

    const newUser = new UserInfo({ ...req.body, adminRole: true });

    await newUser.save();

    res.status(200).json({ massage: "Successfully Register" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const AddUser = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body, "ljlkj");
    const user = await UserInfo.findOne({ email });

    if (user)
      return res.status(401).json({
        message:
          "The email address you have entered is already associated with another account.",
      });

    const newUser = new UserInfo({ ...req.body });

    await newUser.save();

    res.status(200).json({ massage: "Successfully Added User" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    // const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    if (validateEmail(email)) {
      const userExistence = await UserInfo.findOne({ email });
      console.log(userExistence);
      if (userExistence) {
        if (!userExistence.comparePassword(password))
          return res.status(401).json({ message: "Invalid password" });

        const token = userExistence.generateJWT();
        console.log(token, "token=>>..");
        userExistence.token = token;
        await userExistence.save();
        const username_id = userExistence._id;
        res
          .status(200)
          .json({ massage: "Successfully Login", token, username_id });
      } else {
        return res.status(401).json({
          message:
            "The email address you have entered is not associated with any account.",
        });
      }
    } else {
      res.status(422).send({
        error: "Not proper email Address (regular expressions)",
      });
    }
  } catch (err) {
    res.status(422).send({
      success: false,
      error: `Unable to Login using email - ${email}`,
    });
  }
};

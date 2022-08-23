//Middle ware file using JSON Web Token for authentication
import jwt, { decode } from "jsonwebtoken";

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

export const checkJWT = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        console.log("err", err, process.env.JWT_SECRET, token);
        res.json({
          success: false,
          message: "Failed to authenticate token",
        });
      } else {
        console.log("hellllllllll", decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: "No token provided",
    });
  }
};

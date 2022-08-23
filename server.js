import express from "express";
import http from "http";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import helmet from "helmet";
import colors from "colors";
import path from "path";
import { apiRouter } from "./api/user-info/user-info.route.js";
import { categoryRouter } from "./api/category-info/category-info.route.js";
import { productRouter } from "./api/product-info/product-info.route.js";

import { authRouter } from "./auth/authRouter.js";

// FOR NON-HEROKU SERVER
// import { appConfig } from "./config/index.js"
// var config = appConfig()

// FOR HEROKU SERVER
var config = {
  DB_URL:
    process.env.NODE_ENV == "development"
      ? "mongodb://localhost:27017/task-database"
      : process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  PORT: process.env.PORT,
};

const app = express();
let server = null;
const __dirname = path.resolve(path.dirname(""));

mongoose
  .connect(config.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected Successfully!".green);
  })
  .catch((err) => {
    console.log(`Error: ${err}`.red.inverse);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
// app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));

app.get("/api/ddsadmin", (req, res) => {
  res.send("8000 server is alive!");
});

app.use("/api", apiRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);

app.use("/auth", authRouter);

app.use(express.static(__dirname + "/public"));

if (process.env.NODE_ENV === "development") {
  console.log("This is the development environment".inverse.yellow);
  server = http.createServer(app);
} else {
  console.log("This is the production environment".inverse.yellow);
  server = http.createServer(app);
}

let PORT = config.PORT || 9000;
server.listen(PORT, async () => {
  try {
    console.log(`Server listening on port ${PORT}`.green);
  } catch (err) {
    console.log("Server init error".red, err);
  }
});

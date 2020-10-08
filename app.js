const express = require("express");
const dotenv = require("dotenv");
const foods = require("./foods/routes/foodRoutes");
const connect = require("./config/db");
const path = require("path");
const cors = require("cors");
const users = require("./users/routes/userRoute");

const app = express();
dotenv.config({ path: "./config/config.env" });

connect();

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/foods", foods);
app.use("/api/auth", users);

const PORT = 5000 || process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`)
);

import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectDB from "./connectDB";
import User from "../../models/user";
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const PORT = process.env.PORT || 8081;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.listen(PORT, () => {
  console.log(">>>>Server running on port: " + PORT);
});
connectDB();

/// Registry from React-App
app.post("/registry", (req, res) => {
  const { name, phone, email, password } = req.body;
  const newUser = new User({ name, phone, email, password });
  newUser.save().then(() => {
    res.status(200).json({ message: "User registered successfully ! " });
  });
});
